(function ()
{
  'use strict';
  angular
    .module('app.components.tables.USIP', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.USIP', {
      url  : '/components/table/USIP',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/usip-table/table.html',
          controller : 'USIPController as vm'
        }
      }
    }).state('app.USIP.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/usip-table/table.html',
          controller : 'USIPController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
