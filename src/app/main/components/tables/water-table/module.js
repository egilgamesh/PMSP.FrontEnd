(function ()
{
  'use strict';
  angular
    .module('app.components.tables.water', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.water', {
      url  : '/components/table/water',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/water-table/table.html',
          controller : 'WaterController as vm'
        }
      }
    }).state('app.water.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/water-table/table.html',
          controller : 'WaterController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
