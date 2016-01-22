import intersect from 'intersect';
import remove from 'unordered-array-remove';
import React from 'react';
import bus from '../../bus.js';
import FACET_GROUPS from '../../facetGroups.js';
import SearchFacet from '../search-facet';
import styles from './SearchFacetGroup.scss';

export default class SearchFacetGroup extends React.Component {

  constructor(props) {
    super(props);
    this.selectedFacets = {};
  }

  // If the user selects a facet and then types out a query, it might
  // happen that there are no results for this query + facet combination
  // and thus the selected facet would disappear from the UI (as it is not
  // being returned in the aggregations object by the API).
  //
  // A solution to this is making facets sticky.
  //
  // When the user selects a facet, it becomes 'sticky', showing up in the
  // facet list even if there are no results for it and it's no longer
  // being returned in the aggregations object from the API.
  //
  // We're listening to facet selections and storing the selected ones
  // so we can display them if they are no longer part of the global application
  // state.
  componentDidMount() {
    bus.on('updateFacet', this.storeSelectedFacet, this);
    bus.on('clearFacets', this.clearSelectedFacets, this);
  }

  componentWillUnmount() {
    bus.off('updateFacet', this.storeSelectedFacet, this);
    bus.off('clearFacets', this.clearSelectedFacets, this);
  }

  clearSelectedFacets() {
    this.selectedFacets = {};
  }

  isSelected(facet) {
    return this.selectedFacets[facet.id] !== undefined;
  }

  // Combine facets returned by the API aggregations object with previously
  // selected facets.
  selectedAndNewFacets() {
    let seenIds = {};
    let selectedAndNewFacets = [];

    this.props.facets.forEach(f => {
      seenIds[f.id] = true;
      selectedAndNewFacets.push(f);
    });

    Object.values(this.selectedFacets).forEach(f => {
      if (!(f.id in seenIds)) {
        selectedAndNewFacets.push(f);
      }
    });

    return selectedAndNewFacets;
  }

  // Facet sorting, by priority:
  // 1. Selected ones stick to the top
  // 2. Alphabetically
  // 3. Total count per facet
  sortedFacets() {
    return this.selectedAndNewFacets().sort((b, a) => {
      let aSelected = a.id in this.selectedFacets;
      let bSelected = b.id in this.selectedFacets;

      if (aSelected && !bSelected) {
        return 1;
      } else if (bSelected && !aSelected) {
        return -1;
      }

      if (a.name < b.name) {
        return 1;
      } else if (a.name > b.name) {
        return -1;
      }

      if (a.total > b.total) {
        return 1;
      } else if (b.total > a.total) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  storeSelectedFacet(group, id, isSelected) {
    if (group !== this.props.group) {
      return;
    }

    if (isSelected) {
      let theSelectedOne = this.props.facets.find(f => f.id === id);
      let theCopy = Object.assign({}, theSelectedOne);
      theCopy.total = 0;
      this.selectedFacets[theCopy.id] = theCopy;
    } else {
      delete this.selectedFacets[id];
    }
  }

  displayName() {
    return FACET_GROUPS[this.props.group].displayName;
  }

  render() {
    return (
      <li className={styles['search-facet-group']}>
        <ul>
          <span className={styles.heading}>{this.displayName()}</span>
          {this.sortedFacets().map(facet => {
            return <SearchFacet key={facet.id} group={this.props.group} facet={facet} isSelected={this.isSelected(facet)} />;
          })}
        </ul>
      </li>
    );
  }
}
