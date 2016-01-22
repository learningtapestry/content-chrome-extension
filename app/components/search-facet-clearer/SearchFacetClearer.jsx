import React from 'react';
import bus from '../../bus';
import styles from './SearchFacetClearer.scss';

export default class SearchFacetClearer extends React.Component {
  onClick(event) {
    console.log('clicked');
    bus.emit('clearFacets');
  }

  render() {
    return <span
      className={styles['search-facet-clearer']}
      onClick={this.onClick}
    >Clear filters</span>;
  }
}
