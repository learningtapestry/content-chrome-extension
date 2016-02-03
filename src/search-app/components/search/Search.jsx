import Ps from 'perfect-scrollbar';
import React from 'react';
import bus from '../../bus.js';
import SearchStore from '../../SearchStore.js';
import DocumentList from '../document-list';
import ErrorDialog from '../error-dialog';
import Paginator from '../paginator';
import SearchBox from '../search-box';
import SearchFacetList from '../search-facet-list';
import styles from './Search.scss';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.store = new SearchStore();
    this.state = store.getState();
  }

  componentWillMount() {
    // Listen to new searches.
    bus.on('searchCompleted', this.onSearchCompleted, this);
    bus.on('searchFailed', this.onSearchFailed, this);
    bus.emit('refresh');
  }

  componentDidMount() {
    // Initialize the perfect-scrollbar plug-in.
    Ps.initialize(this.refs.searchFacets);
  }

  componentWillUnmount() {
    bus.off('searchCompleted', this.onSearchCompleted, this);
    bus.off('searchFailed', this.onSearchFailed, this);
    this.store.release();
    Ps.destroy(this.refs.searchFacets);
  }

  componentWillUpdate() {
    // Scroll to top, both in the facets window and in the documents list.
    window.scrollTo(0, 0);
    this.refs.searchFacets.scrollTop = 0;
  }

  errorMessage() {
    if (this.state.error) {
      return <ErrorDialog error={this.state.error} />;
    } else {
      return null;
    }
  }

  onSearchCompleted() {
    this.setState(this.store.getState());
  }

  onSearchFailed() {
    this.setState(this.store.getState()); 
  }

  render() {
    return (
      <div className={styles.search}>
        {this.errorMessage()}
        <div className={styles['facets-wrapper']}>
          <div className={styles.facets} ref='searchFacets'>
            <SearchFacetList groups={this.state.results.facetGroups} selected={this.state.query.facets} />
          </div>
        </div>
        <div className={styles.documents} ref='documents'>
          <SearchBox />
          <Paginator total={this.state.results.total} limit={this.state.query.limit} page={this.state.query.page} count={this.state.results.documents.length} />
          <DocumentList documents={this.state.results.documents} ref='documentList' />
          <Paginator total={this.state.results.total} limit={this.state.query.limit} page={this.state.query.page} count={this.state.results.documents.length} />
        </div>
      </div>
    );
  }
}
