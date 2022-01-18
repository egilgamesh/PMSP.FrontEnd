(function ()
{
  'use strict';
  angular
    .module('app.components.tables.NEWSR', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.NEWSR', {
      url  : '/components/table/NEWSR',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/newsr-table/table.html',
          controller : 'NEWSRController as vm'
        }
      }
    }).state('app.NEWSR.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/newsr-table/table.html',
          controller : 'NEWSRController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
