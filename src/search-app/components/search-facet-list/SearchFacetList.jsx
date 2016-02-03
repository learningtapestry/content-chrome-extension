import intersect from 'intersect';
import React from 'react';
import SearchFacetClearer from '../search-facet-clearer';
import SearchFacetGroup from '../search-facet-group';
import FACET_GROUPS from '../../facetGroups';
import styles from './SearchFacetList.scss';

export default class SearchFacetList extends React.Component {
  availableGroups() {
    return intersect(
      Object.keys(FACET_GROUPS),
      Object.keys(this.props.groups)
    );
  }

  render() {
    return (
      <div className={styles['search-facet-list']}>
        <div className={styles['search-facet-clearer']}>
          <SearchFacetClearer />
        </div>
        <ul>
          {this.availableGroups().map(group => {
            return <SearchFacetGroup
              key={group}
              group={group}
              facets={this.props.groups[group]}
            />;
          })}
        </ul>
      </div>
    );
  }
}
