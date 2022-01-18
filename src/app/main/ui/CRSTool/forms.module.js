(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.CRS', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-CRS', {
            url      : '/ui/CRS-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/CRSTool/forms.html',
                    controller : 'CRSFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-CRS.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/CRSTool/forms.html',
              controller : 'CRSFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
    }

})();
