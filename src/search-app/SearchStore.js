import remove from 'unordered-array-remove';
import bus from './bus';
import facetGroups from './facetGroups';
import SearchSource from './SearchSource.js';

class SearchStore {
  constructor() {
    this.state = {
      query: {
        page: 1,
        limit: 20,
        facets: {},
        q: null
      },
      results: {
        total: 0,
        documents: [],
        facetGroups: {}
      }
    };

    this._clearFacets(false);

    bus.on('refresh', this._refresh, this);
    bus.on('clearFacets', this._clearFacets, this);
    bus.on('updateFacet', this._updateFacet, this);
    bus.on('updatePage', this._updatePage, this);
    bus.on('updateQ', this._updateQ, this);
  }

  getState() {
    return this.state;
  }

  release() {
    bus.off('refresh', this._refresh, this);
    bus.off('clearFacets', this._clearFacets, this);
    bus.off('updateFacet', this._updateFacet, this);
    bus.off('updatePage', this._updatePage, this);
    bus.off('updateQ', this._updateQ, this);
  }

  _clearFacets(refresh = true) {
    Object.keys(facetGroups).forEach(group => {
      this.state.query.facets[group] = new Set(); 

      if (refresh) {
        this._refresh();
      }
    });
  }

  _computeQuery() {
    let state = this.getState();

    let query = {
      num_facets: 20,
      page: state.query.page,
      limit: state.query.limit,
      q: state.query.q
    };

    Object.entries(facetGroups).forEach(([group, groupDef]) => {
      let sel = state.query.facets[group];
      if (sel.size > 0) query[groupDef.param] = Array.from(sel);
    });

    return query; 
  }

  _refresh() {
    this._performSearch();
  }

  _updateFacet(group, id, isSelected) {
    let sel = this.state.query.facets[group];
    isSelected ? sel.add(id) : sel.delete(id);
    this.state.query.page = 1;
    this._refresh();
  }

  _updatePage(page) {
    this.state.query.page = page;
    this._refresh();
  }

  _updateQ(q) {
    if (q === '') q = null;
    this.state.query.q = q;
    this.state.query.page = 1;
    this._refresh();
  }

  _performSearch() {
    SearchSource.fetch(this._computeQuery())
      .then(results => {
        Object.assign(this.state, { results })
        bus.emit('searchCompleted');
      })
      .catch(error => {
        Object.assign(this.state, { error })
        bus.emit('searchFailed');
      });
  }
}

export default SearchStore;
