(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.health', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-health', {
            url      : '/ui/health-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/health-form/forms.html',
                    controller : 'HealthFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-health.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/health-form/forms.html',
              controller : 'HealthFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
          .state('app.ui_forms-health.bs', {
            url      : '/BS/:id/:type/:healthId',
            views    : {
              'content@app': {
                templateUrl: 'app/main/ui/health-form/health.bs.html',
                controller : 'HealthBSFormsController as vm'
              }
            },
            bodyClass: 'forms'
          });
    }

})();
