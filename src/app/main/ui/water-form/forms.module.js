(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.water', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-water', {
            url      : '/ui/water-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/water-form/forms.html',
                    controller : 'WaterFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-water.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/water-form/forms.html',
              controller : 'WaterFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
          .state('app.ui_forms-water.bs', {
            url      : '/BS/:id/:type/:waterId',
            views    : {
              'content@app': {
                templateUrl: 'app/main/ui/water-form/water.bs.html',
                controller : 'WaterBSFormsController as vm'
              }
            },
            bodyClass: 'forms'
          });
    }

})();
