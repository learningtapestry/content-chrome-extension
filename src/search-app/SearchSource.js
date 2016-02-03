import superagent from 'superagent';

class SearchSource {
  fetch(query = {}) {
    return new Promise((resolve, reject) => {
      if (this._req) {
        this._req.abort();
      }

      try {
        this._req = superagent
          .get(`${API_BASE_URL}/search`)
          .set('X-Api-Key', API_KEY)
          .query(query)
          .end((error, res) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                documents: res.body.documents,
                facetGroups: res.body.facets,
                total: res.headers['x-total']
              });
            }
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new SearchSource();
