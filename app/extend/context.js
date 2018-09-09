// app/extend/context.js
const fs = require('fs');
const basename = require('path').basename;
const is = require('is-type-of');
const assert = require('assert');
const mime = require('mime-types');

module.exports = {
  download(file, name, header) {
    assert(file, 'this parameter: file is required');
    assert(is.string(file), `file must be string, but got ${file}`);

    let reader = fs.createReadStream(file);

    let filename = basename(file);

    if (name) {
        assert(is.string(name), `name must be string, but got ${name}`);
        filename = name;
    }

    this.attachment(filename);

    // // mine-type
    // const mineType = mime.lookup(file);
    // assert(mineType !== false, `mine-type error, got ${filename}`);
    // this.set('Content-Type', mineType);

    // header
    if (header) {
        assert(is.object(header), `header must be header, but got ${header}`);

        for (let key in header) {
            // 首字母大写
            key = key.split('-').map(ucfirst).join('-');
            this.set(key, header[key]);
        }
    }

    this.body = reader;

    return true;
  },
};

function ucfirst(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}
