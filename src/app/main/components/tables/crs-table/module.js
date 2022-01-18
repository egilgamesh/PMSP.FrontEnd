(function ()
{
  'use strict';
  angular
    .module('app.components.tables.CRS', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.CRS', {
      url  : '/components/table/CRS',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/crs-table/table.html',
          controller : 'CRSController as vm'
        }
      }
    }).state('app.CRS.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/crs-table/table.html',
          controller : 'CRSController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
