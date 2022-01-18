(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.IGPATool', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-IGPATool', {
            url      : '/ui/IGPATool-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/IGPATool/forms.html',
                    controller : 'IGPAToolFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-IGPATool.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/IGPATool/forms.html',
              controller : 'IGPAToolFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
          .state('app.ui_forms-IGPATool.c2', {
            url      : '/C2/:id/:type/:formId',
            views    : {
              'content@app': {
                templateUrl: 'app/main/ui/IGPATool/c2.html',
                controller : 'C2IGPAToolFormsController as vm'
              }
            },
            bodyClass: 'forms'
          })
          .state('app.ui_forms-IGPATool.c3', {
            url      : '/C3/:id/:type/:formId',
            views    : {
              'content@app': {
                templateUrl: 'app/main/ui/IGPATool/c3.html',
                controller : 'C3IGPAToolFormsController as vm'
              }
            },
            bodyClass: 'forms'
          });
    }

})();
