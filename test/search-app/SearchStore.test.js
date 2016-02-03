import '../helper';

import { assert } from 'chai';
import nock from 'nock';
import sinon from 'sinon';
import bus from 'search-app/bus';
import SearchSource from 'search-app/SearchSource';
import SearchStore from 'search-app/SearchStore';

describe('SearchStore', function() {

  before(function() {
    sinon.stub(SearchSource, 'fetch', query => {
      return new Promise((resolve, reject) => {
        resolve({
          documents: [{title: 'Apple Pie'}],
          facets: {'apple_pies': 1},
          total: 1
        });
      });
    });
  });

  after(function() {
    SearchSource.fetch.restore();
  });

  beforeEach(function() {
    this.store = new SearchStore();
  });

  afterEach(function() {
    this.store.release();
  });

  describe('#getState()', function() {
    it('always returns a state object', function() {
      let state = this.store.getState();
      assert.property(state, 'query');
      assert.property(state, 'results');
    });
  });

  describe('#onClearFacets()', function() {
    it('clears selected filters', function() {
      bus.emit('updateFacet', 'grades', 123, true);
      bus.emit('updateFacet', 'grades', 456, true);
      bus.emit('updateFacet', 'grades', 789, true);
      bus.emit('clearFacets');
      assert.equal(0, this.store.getState().query.facets.grades.size);
    });
  });

  describe('#onUpdateFacet()', function() {
    beforeEach(function() {
      bus.emit('clearFacets');
    });

    it('updates the filters with a new one if it is selected', function() {
      bus.emit('updateFacet', 'grades', 123, true);
      assert.include(Array.from(this.store.getState().query.facets.grades), 123);
    });

    it('updates the filters removing one if it is deselected', function() {
      bus.emit('updateFacet', 'grades', 123, true);
      bus.emit('updateFacet', 'grades', 123, false);
      assert.notInclude(Array.from(this.store.getState().query.facets.grades), 123);
    });
  });

  describe('#onUpdateQ()', function() {
    it('updates the query', function() {
      bus.emit('updateQ', 'test');
      assert.equal('test', this.store.getState().query.q);
    });
  });

  describe('#onUpdatePage()', function() {
    it('updates the page', function() {
      bus.emit('updatePage', 2);
      assert.equal(2, this.store.getState().query.page);
    });
  });

  describe('#onRefresh()', function() {
    it('fetches data from its data source', function() {
      bus.emit('refresh');
      assert(SearchSource.fetch.calledWith({ 
        num_facets: 20, page: 1, limit: 20, q: null
      }));
    });
  });
});
