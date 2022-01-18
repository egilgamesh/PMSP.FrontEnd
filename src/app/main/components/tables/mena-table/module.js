(function ()
{
  'use strict';
  angular
    .module('app.components.tables.MENA', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.MENA', {
      url  : '/components/table/MENA',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/mena-table/table.html',
          controller : 'MENAController as vm'
        }
      }
    }).state('app.MENA.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/mena-table/table.html',
          controller : 'MENAController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
