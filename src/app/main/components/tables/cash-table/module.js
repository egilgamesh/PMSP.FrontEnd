(function ()
{
  'use strict';
  angular
    .module('app.components.tables.cash', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.cash', {
      url  : '/components/table/cash',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/cash-table/table.html',
          controller : 'CashController as vm'
        }
      }
    }).state('app.cash.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/cash-table/table.html',
          controller : 'CashController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
