import intersect from 'intersect';
import React from 'react';
import SearchFacetClearer from '../search-facet-clearer';
import SearchFacetGroup from '../search-facet-group';
import FACET_GROUPS from '../../facetGroups';
import styles from './SearchFacetList.scss';
import googleLogo from '../../images/logo_google_classroom.png';
import genericLogo from '../../images/logo_generic.png';

export default class SearchFacetList extends React.Component {
  availableGroups() {
    return intersect(
      Object.keys(FACET_GROUPS),
      Object.keys(this.props.groups)
    );
  }

  render() {
    let logo;
    
    switch(BUILD) {
      case 'google':
        logo = googleLogo;
        break;
      case 'generic':
      default:
        logo = genericLogo;
    }

    return (
      <div>
        <div className={styles['logo']}>
          <img src={logo} />
        </div>
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
      </div>
    );
  }
}
