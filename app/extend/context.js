// app/extend/context.js
const fs = require('fs');
const path=require('path');

module.exports = {
  download(file, name, header, disposition) {
    // todo check file
    let reader = fs.createReadStream(file);
    let extname=path.extname(file);    //获取文件的后缀名
    // todo get filename
    let filename = '' + extname;
    // header
    // this.set('Content-Type', 'text/js');

    const disposition = disposition || 'attachment';

    this.set('Content-disposition', `attachment;filename=${filename}`); // 设置你的文件名

    this.body = reader;

    return true;
  },
};
