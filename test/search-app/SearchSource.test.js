import { assert } from 'chai';
import nock from 'nock';
import SearchSource from 'search-app/SearchSource';

function mockRequest() {
  return nock(API_BASE_URL, { 'x-total': 1 }).get('/search');
}

describe('SearchSource', () => {
  describe('#fetch()', () => {
    it('returns a Promise', () => {
      mockRequest().reply(200);
      assert.typeOf(SearchSource.fetch(), 'Promise');
    });

    it('resolves the promise with a results object', () => {
      mockRequest().reply(200, {
        documents: [{title: 'Apple Pie'}], facets: {'apple_pies': 1}
      });

      SearchSource.fetch()
        .then(res => {
          assert.equal({
            documents: [{title: 'Apple Pie'}],
            facets: {'apple_pies': 1},
            total: 1
          }, res);
        })
        .catch(error => {
          throw new Error('Should not have been rejected!');
        });
    });

    it('rejects the promise with an error', () => {
      mockRequest().reply(500);

      SearchSource.fetch()
        .then(res => {
          throw new Error('Should not have been resolved!');
        })
        .catch(error => {
          assert.equal(500, error.status);
        });
    });
  });
});
