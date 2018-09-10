'use strict';

// app/extend/context.js
const path = require('path');
const is = require('is-type-of');
const assert = require('assert');
const fs = require('mz/fs');

module.exports = {
  /**
   * downloader file
   * @param  {string} file   文件路径
   * @param  {string} name   下载文件名（包含后缀）
   * @param  {object} header 头信息
   * @return {undefined} undefined
   */
  async downloader(file, name, header) {
    assert(file, 'the file must be required');
    assert(is.string(file), `the file must be string, but got ${file}`);

    let filename = path.basename(file);

    // default dir: app/public
    if (filename === file) {
      file = path.resolve(this.app.config.static.dir, file);
    }

    if (!await fs.exists(file)) {
      throw new Error(`${file} does not exist`);
    }

    // maybe is dir
    const fsStat = await fs.stat(file);
    if (fsStat.isDirectory()) {
      throw new Error(`the file must be a file, but ${file} is a dir`);
    }

    const reader = fs.createReadStream(file);

    // name
    if (name) {
      assert(is.string(name), `the name must be string, but got ${name}`);
      filename = name;
    }

    this.set('content-type', this.app.config.downloader.content_type);
    this.attachment(filename);

    // header
    if (header) {
      assert(is.object(header), `the header must be object, but got ${header}`);

      let item;
      for (let key in header) {
        assert(is.string(header[key]), `the header item must be string, but got ${header[key]}`);
        item = header[key];

        // 改为小写
        key = key.split('-').map(toLower).join('-');
        this.set(key, item);
      }
    }

    this.body = reader;
  },
};

/**
 * 改为小写：egg 推荐 header 全部小写
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function toLower(str) {
  return str.toLowerCase();
}
