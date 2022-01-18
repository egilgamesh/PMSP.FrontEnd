(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.NewFFSGeneral', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-NewFFSGeneral', {
            url      : '/ui/NewFFSGeneral-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/NewFFSGeneralTool/forms.html',
                    controller : 'NewFFSGeneralFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-NewFFSGeneral.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/NewFFSGeneralTool/forms.html',
              controller : 'NewFFSGeneralFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
          .state('app.ui_forms-NewFFSGeneral.bs', {
            url      : '/BS/:id/:type/:formId',
            views    : {
              'content@app': {
                templateUrl: 'app/main/ui/NewFFSGeneralTool/NewFFSGeneral.bs.html',
                controller : 'NewFFSGeneralBSFormsController as vm'
              }
            },
            bodyClass: 'forms'
          });
    }

})();
