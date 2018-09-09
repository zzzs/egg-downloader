'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.download.name;
  }

  async d1() {
    this.ctx.downloader('./package.json');
  }

  async d2() {
    this.ctx.downloader('package.json', 'new-name.json');
  }

  async d3() {
    this.ctx.downloader('package.json', 'new-name.json', { 'x-token': '123' });
  }

}

module.exports = HomeController;
