(function ()
{
  'use strict';
  angular
    .module('app.components.tables.IMC', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.IMC', {
      url  : '/components/table/IMC',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/imc-table/table.html',
          controller : 'IMCController as vm'
        }
      }
    }).state('app.IMC.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/imc-table/table.html',
          controller : 'IMCController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
