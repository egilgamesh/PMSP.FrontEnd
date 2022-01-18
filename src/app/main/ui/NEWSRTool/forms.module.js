(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.NEWSR', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-NEWSR', {
            url      : '/ui/NEWSR-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/NEWSRTool/forms.html',
                    controller : 'NEWSRFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-NEWSR.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/NEWSRTool/forms.html',
              controller : 'NEWSRFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
    }

})();
