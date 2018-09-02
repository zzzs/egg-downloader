'use strict';

const mock = require('egg-mock');

describe('test/download.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/download-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, download')
      .expect(200);
  });
});
