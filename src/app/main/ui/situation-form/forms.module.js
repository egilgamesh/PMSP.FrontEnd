(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.situation', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-situation', {
            url      : '/ui/situation-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/situation-form/forms.html',
                    controller : 'SituationFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-situation.details', {
          url      : '/situation/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/situation-form/forms.html',
              controller : 'SituationFormsController as vm'
            }
          },
          bodyClass: 'forms'
        });
    }

})();
