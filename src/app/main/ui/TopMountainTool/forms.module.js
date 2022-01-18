(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.TopMountain', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-TopMountain', {
            url      : '/ui/TopMountain-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/TopMountainTool/forms.html',
                    controller : 'TopMountainFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-TopMountain.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/TopMountainTool/forms.html',
              controller : 'TopMountainFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
    }

})();
