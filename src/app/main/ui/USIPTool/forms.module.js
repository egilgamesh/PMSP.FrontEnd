(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.USIP', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-USIP', {
            url      : '/ui/USIP-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/USIPTool/forms.html',
                    controller : 'USIPFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-USIP.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/USIPTool/forms.html',
              controller : 'USIPFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
    }

})();
