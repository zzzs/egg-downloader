'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/d1', controller.home.d1);
  router.get('/d2', controller.home.d2);
  router.get('/d2', controller.home.d2);
  router.get('/d3', controller.home.d3);
};
