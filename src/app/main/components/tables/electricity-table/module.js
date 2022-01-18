(function ()
{
  'use strict';
  angular
    .module('app.components.tables.electricity', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.electricity', {
      url  : '/components/table/electricity',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/electricity-table/table.html',
          controller : 'ElectricityController as vm'
        }
      }
    }).state('app.electricity.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/electricity-table/table.html',
          controller : 'ElectricityController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
