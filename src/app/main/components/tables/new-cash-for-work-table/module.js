(function ()
{
  'use strict';
  angular
    .module('app.components.tables.NewCashForWork', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.NewCashForWork', {
      url  : '/components/table/NewCashForWork',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/new-cash-for-work-table/table.html',
          controller : 'MewCashForWorkController as vm'
        }
      }
    }).state('app.NewCashForWork.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/new-cash-for-work-table/table.html',
          controller : 'MewCashForWorkController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
