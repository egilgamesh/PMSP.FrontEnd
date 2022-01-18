(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.education', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-education', {
            url      : '/ui/education-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/education-form/forms.html',
                    controller : 'EducationFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-education.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/education-form/forms.html',
              controller : 'EducationFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
          .state('app.ui_forms-education.bs', {
            url      : '/BS/:id/:type/:educationId',
            views    : {
              'content@app': {
                templateUrl: 'app/main/ui/education-form/education.bs.html',
                controller : 'EducationBSFormsController as vm'
              }
            },
            bodyClass: 'forms'
          });
    }

})();
