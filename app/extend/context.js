// app/extend/context.js
const fs = require('fs');
const basename = require('path').basename;
const is = require('is-type-of');
const assert = require('assert');

module.exports = {
  download(file, name, header) {
    assert(file, 'this parameter: file is required');
    assert(is.string(file), `file must be string, but got ${file}`);
    fs.access(file, fs.constants.F_OK | fs.constants.R_OK, (err) => {
      if (err) {
        throw new Error(`${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is not readable'}`);
      } else {
        let reader = fs.createReadStream(file);
        let filename = basename(file);

        // name
        if (name) {
          assert(is.string(name), `name must be string, but got ${name}`);
          filename = name;
        }

        this.attachment(filename);

        // header
        if (header) {
          assert(is.object(header), `header must be header, but got ${header}`);

          let item;
          for (let key in header) {
            item = header[key];
            // 首字母大写
            key = key.split('-').map(ucfirst).join('-');
            this.set(key, item);
          }
        }

        this.body = reader;
      }
    });
  },
};

function ucfirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
