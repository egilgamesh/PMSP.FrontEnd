(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.electricity', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-electricity', {
            url      : '/ui/electricity-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/electricity-form/forms.html',
                    controller : 'ElectricityFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-electricity.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/electricity-form/forms.html',
              controller : 'ElectricityFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
          .state('app.ui_forms-electricity.bs', {
            url      : '/BS/:id/:type/:electricityId',
            views    : {
              'content@app': {
                templateUrl: 'app/main/ui/electricity-form/electricity.bs.html',
                controller : 'ElectricityBSFormsController as vm'
              }
            },
            bodyClass: 'forms'
          });
    }

})();
