(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.MENA', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-MENA', {
            url      : '/ui/MENA-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/MENATool/forms.html',
                    controller : 'MENAFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-MENA.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/MENATool/forms.html',
              controller : 'MENAFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
    }

})();
