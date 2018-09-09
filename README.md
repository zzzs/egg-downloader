# egg-download

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-download.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-download
[travis-image]: https://img.shields.io/travis/zzzs/egg-download.svg?style=flat-square
[travis-url]: https://travis-ci.org/zzzs/egg-download
[codecov-image]: https://img.shields.io/codecov/c/github/zzzs/egg-download.svg?style=flat-square
[codecov-url]: https://codecov.io/github/zzzs/egg-download?branch=master
[david-image]: https://img.shields.io/david/zzzs/egg-download.svg?style=flat-square
[david-url]: https://david-dm.org/zzzs/egg-download
[snyk-image]: https://snyk.io/test/npm/egg-download/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-download
[download-image]: https://img.shields.io/npm/dm/egg-download.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-download

extend a method `context.download` to download file

## Install

```bash
$ npm i egg-download --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.download = {
  enable: true,
  package: 'egg-download',
};
```

## Features
`context.download`用于提供文件下载的功能，支持三个参数，context.download(file, [name], [header]) 
  
  * file: 必选，文件路径
  * name: 可选，下载文件名（包含后缀）
  * header: 可选，附加头信息

## Example
```js
// {app_root}/controller/home.js
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    // 下载为 package.json
    this.ctx.download('./package.json');
    
    // 下载为 new-name.json
    // this.ctx.download('package.json', 'new-name.json');
    
    // 下载为 new-name.json header: X-Token: 123
    // this.ctx.download('package.json', 'new-name.json', { 'x-token': '123' });
  }
}
module.exports = HomeController;
```

## Questions & Suggestions

Please open an issue [here](https://github.com/zzzs/egg-download/issues).

## License

[MIT](LICENSE)
