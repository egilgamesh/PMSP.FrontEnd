(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.municipality', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.ui_forms-municipality', {
            url      : '/ui/municipality-form',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/municipality-form/forms.html',
                    controller : 'MunicipalityFormsController as vm'
                }
            },
            bodyClass: 'forms'
        })

          .state('app.ui_forms-municipality.details', {
          url      : '/details/:id',
          views    : {
            'content@app': {
              templateUrl: 'app/main/ui/municipality-form/forms.html',
              controller : 'MunicipalityFormsController as vm'
            }
          },
          bodyClass: 'forms'
        })
          .state('app.ui_forms-municipality.bs', {
            url      : '/BS/:id/:type/:municipalityId',
            views    : {
              'content@app': {
                templateUrl: 'app/main/ui/municipality-form/municipality.bs.html',
                controller : 'MunicipalityBSFormsController as vm'
              }
            },
            bodyClass: 'forms'
          })
          .state('app.ui_forms-municipality.bsr', {
            url      : '/BSR/:id/:type/:municipalityId',
            views    : {
              'content@app': {
                templateUrl: 'app/main/ui/municipality-form/municipality.bsr.html',
                controller : 'MunicipalityBSRFormsController as vm'
              }
            },
            bodyClass: 'forms'
          });
    }

})();
