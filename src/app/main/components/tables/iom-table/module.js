(function ()
{
  'use strict';
  angular
    .module('app.components.tables.IOM', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.IOM', {
      url  : '/components/table/IOM',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/iom-table/table.html',
          controller : 'IOMController as vm'
        }
      }
    }).state('app.IOM.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/iom-table/table.html',
          controller : 'IOMController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
