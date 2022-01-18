(function ()
{
  'use strict';
  angular
    .module('app.components.tables.TopMountain', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.TopMountain', {
      url  : '/components/table/TopMountain',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/TopMountain-table/table.html',
          controller : 'TopMountainController as vm'
        }
      }
    }).state('app.TopMountain.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/TopMountain-table/table.html',
          controller : 'TopMountainController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
