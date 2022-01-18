(function ()
{
  'use strict';
  angular
    .module('app.components.tables.IGPA', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.IGPA', {
      url  : '/components/table/IGPA',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/igpa-table/table.html',
          controller : 'IGPAController as vm'
        }
      }
    }).state('app.IGPA.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/igpa-table/table.html',
          controller : 'IGPAController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
