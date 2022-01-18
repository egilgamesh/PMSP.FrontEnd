(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.HAI', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-HAI', {
            url      : '/ui/HAI-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/HAITool/forms.html',
                    controller : 'HAIFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-HAI.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/HAITool/forms.html',
              controller : 'HAIFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
    }

})();
