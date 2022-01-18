(function ()
{
  'use strict';
  angular
    .module('app.components.tables.HAI', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.HAI', {
      url  : '/components/table/HAI',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/hai-table/table.html',
          controller : 'HAIController as vm'
        }
      }
    }).state('app.HAI.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/hai-table/table.html',
          controller : 'HAIController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
