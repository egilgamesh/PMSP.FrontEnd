(function ()
{
    'use strict';

    angular
        .module('app.dashboards.tut',
            [
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        // State
        $stateProvider.state('app.dashboards_tut', {
            url      : '/dashboard-tut',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/Tutorial/dashboard-project.html',
                    controller : 'DashboardTutController as vm'
                }
            },
            bodyClass: 'dashboard-project'
        })

          .state('app.dashboards_tut.introTut', {
            url  : '/intro',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/Tutorial/tut.html'
              }
            }
          });

    }



})();
