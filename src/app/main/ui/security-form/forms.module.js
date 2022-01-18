(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.security', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-security', {
            url      : '/ui/security-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/security-form/forms.html',
                    controller : 'SecurityFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-security.details', {
          url      : '/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/security-form/forms.html',
              controller : 'SecurityFormsController as vm'
            }
          },
          bodyClass: 'forms'
        });
    }

})();
