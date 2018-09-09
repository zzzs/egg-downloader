# egg-downloader

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]


[npm-image]: https://img.shields.io/npm/v/egg-downloader.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-downloader
[travis-image]: https://img.shields.io/travis/zzzs/egg-downloader.svg?style=flat-square
[travis-url]: https://travis-ci.org/zzzs/egg-downloader
[codecov-image]: https://img.shields.io/codecov/c/github/zzzs/egg-downloader.svg?style=flat-square
[codecov-url]: https://codecov.io/github/zzzs/egg-downloader?branch=master
[david-image]: https://img.shields.io/david/zzzs/egg-downloader.svg?style=flat-square
[david-url]: https://david-dm.org/zzzs/egg-downloader
[snyk-image]: https://snyk.io/test/github/zzzs/egg-downloader/badge.svg?targetFile=package.json
[snyk-url]: https://snyk.io/test/github/zzzs/egg-downloader?targetFile=package.json
[download-image]: https://img.shields.io/npm/dm/egg-downloader.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-downloader

extend a method `context.downloader` to download file

## Install

```bash
$ npm i egg-downloader --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.downloader = {
  enable: true,
  package: 'egg-downloader',
};
```

## Features
`context.downloader`用于提供文件下载的功能，支持三个参数，context.download(file, [name], [header]) 
  
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
    this.ctx.downloader('./package.json');
    
    // 下载为 new-name.json
    // this.ctx.downloader('package.json', 'new-name.json');
    
    // 下载为 new-name.json header: X-Token: 123
    // this.ctx.downloader('package.json', 'new-name.json', { 'x-token': '123' });
  }
}
module.exports = HomeController;
```

## Questions & Suggestions

Please open an issue [here](https://github.com/zzzs/egg-downloader/issues).

## License

[MIT](LICENSE)
