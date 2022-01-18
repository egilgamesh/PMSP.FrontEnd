(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.IMC', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-IMC', {
            url      : '/ui/IMC-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/IMCTool/forms.html',
                    controller : 'IMCFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-IMC.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/IMCTool/forms.html',
              controller : 'IMCFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
    }

})();
