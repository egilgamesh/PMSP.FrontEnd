(function ()
{
  'use strict';
  angular
    .module('app.components.tables.health', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.health', {
      url  : '/components/table/health',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/health-table/table.html',
          controller : 'HealthController as vm'
        }
      }
    }).state('app.health.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/health-table/table.html',
          controller : 'HealthController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
