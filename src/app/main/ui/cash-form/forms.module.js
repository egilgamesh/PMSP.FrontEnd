(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.cash', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-cash', {
            url      : '/ui/cash-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/cash-form/forms.html',
                    controller : 'CashFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-cash.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/cash-form/forms.html',
              controller : 'CashFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
          .state('app.ui_forms-cash.bs', {
            url      : '/BS/:id/:type/:cashId',
            views    : {
              'content@app': {
                templateUrl: 'app/main/ui/cash-form/cash.bs.html',
                controller : 'CashBSFormsController as vm'
              }
            },
            bodyClass: 'forms'
          });
    }

})();
