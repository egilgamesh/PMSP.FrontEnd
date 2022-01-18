(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.IOM', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-IOM', {
            url      : '/ui/IOM-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/IOMTool/forms.html',
                    controller : 'IOMFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-IOM.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/IOMTool/forms.html',
              controller : 'IOMFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
    }

})();
