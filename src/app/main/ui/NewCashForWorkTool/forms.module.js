(function ()
{
  'use strict';

  angular
    .module('app.ui.forms.NewCashForWork', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider)
  {
    $stateProvider.state('app.ui_forms-NewCashOfWork', {
      url      : '/ui/NewCashForWork-form',
      views    : {
        'content@app': {
          templateUrl: 'app/main/ui/NewCashForWorkTool/forms.html',
          controller : 'NewCashForWorkFormsController as vm'
        }
      },
      bodyClass: 'forms'
    })

      .state('app.ui_forms-NewCashOfWork.details', {
        url      : '/details/:id',
        views    : {
          'content@app': {
            templateUrl: 'app/main/ui/NewCashForWorkTool/forms.html',
            controller : 'NewCashForWorkFormsController as vm'
          }
        },
        bodyClass: 'forms'
      })
      .state('app.ui_forms-NewCashOfWork.bs', {
        url      : '/BS/:id/:type/:formId',
        views    : {
          'content@app': {
            templateUrl: 'app/main/ui/NewCashForWorkTool/NewCashForWork.bs.html',
            controller : 'NewCashForWorkBSFormsController as vm'
          }
        },
        bodyClass: 'forms'
      });
  }

})();
