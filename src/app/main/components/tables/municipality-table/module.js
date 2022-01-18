(function ()
{
  'use strict';
  angular
    .module('app.components.tables.municipality', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.municipality', {
      url  : '/components/table/municipality',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/municipality-table/table.html',
          controller : 'MunicipalityController as vm'
        }
      }
    }).state('app.municipality.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/municipality-table/table.html',
          controller : 'MunicipalityController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
