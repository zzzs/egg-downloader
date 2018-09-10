'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.download.name;
  }

  async d1() {
    await this.ctx.downloader('./package.json');
  }

  async d2() {
    await this.ctx.downloader('test.txt');
  }

  async d3() {
    await this.ctx.downloader('./package.json', 'new-name.json');
  }

  async d4() {
    await this.ctx.downloader('./package.json', 'new-name.json', { 'x-token': '123' });
  }

}

module.exports = HomeController;
