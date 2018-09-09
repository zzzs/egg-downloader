'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('test/download.test.js', () => {
  let app;
  // let ctx;
  before(() => {
    app = mock.app({
      baseDir: 'apps/download-test',
    });
    return app.ready();
  });

  // ctx = app.mockContext();

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, download')
      .expect(200);
  });

  describe('case: exception', () => {
    it('file must be required', () => {
      try {
        app.mockContext().download();
        throw new Error('another exception');
      } catch (err) {
        assert(err.message.includes('file must be required'));
      }
    });

    it('file must be string', () => {
      try {
        app.mockContext().download(123);
        throw new Error('another exception');
      } catch (err) {
        assert(err.message.includes('file must be string, but got'));
      }
    });

    it('file must be exist', () => {
      try {
        app.mockContext().download('./package2.json');
        throw new Error('another exception');
      } catch (err) {
        assert(err.message.includes('does not exist'));
      }
    });

    it('name must be string', () => {
      try {
        app.mockContext().download('./package.json', 123);
        throw new Error('another exception');
      } catch (err) {
        assert(err.message.includes('name must be string, but got'));
      }
    });

    it('header must be object', () => {
      try {
        app.mockContext().download('./package.json', 'newname.json', 123);
        throw new Error('another exception');
      } catch (err) {
        assert(err.message.includes('header must be object, but got'));
      }
    });

    it('header item must be string', () => {
      try {
        app.mockContext().download('./package.json', 'newname.json', { 'x-token': 123 });
        throw new Error('another exception');
      } catch (err) {
        assert(err.message.includes('header item must be string, but got'));
      }
    });
  });

  describe('case: fetures', () => {
    it('download with Content-Disposition', () => {
      return app.httpRequest()
        .get('/d1')
        .expect('Content-Disposition', 'attachment; filename="package.json"')
        .expect(200);
    });

    it('download with new-name.json', () => {
      return app.httpRequest()
        .get('/d2')
        .expect('Content-Disposition', 'attachment; filename="new-name.json"')
        .expect(200);
    });

    it('download with header setting', () => {
      return app.httpRequest()
        .get('/d3')
        .expect('Content-Disposition', 'attachment; filename="new-name.json"')
        .expect('X-Token', '123')
        .expect(200);
    });
  });


});
