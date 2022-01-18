(function ()
{
  'use strict';
  angular
    .module('app.components.tables.education', ['md.data.table', 'ngMaterial'])
    .config(config);
  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.education', {
      url  : '/components/table/education',
      views: {
        'content@app': {
          templateUrl: 'app/main/components/tables/education-table/table.html',
          controller : 'EducationController as vm'
        }
      }
    }).state('app.education.type', {
      url      : '/:type',
      views    : {
        'content@app': {
          templateUrl: 'app/main/components/tables/education-table/table.html',
          controller : 'EducationController as vm'
        }
      },
      bodyClass: 'forms'
    });
  }
})();
