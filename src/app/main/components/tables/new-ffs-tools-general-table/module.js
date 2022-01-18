(function ()
{
  'use strict';
  angular
    .module('app.components.tables.newFFSToolsGeneral', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.newFFSToolsGeneral', {
      url  : '/components/table/newFFSToolsGeneral',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/new-ffs-tools-general-table/table.html',
          controller : 'newFFSToolsGeneralController as vm'
        }
      }
    }).state('app.newFFSToolsGeneral.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/new-ffs-tools-general-table/table.html',
          controller : 'newFFSToolsGeneralController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
