(function ()
{
    'use strict';

    angular
        .module('app.dashboards.IGPA',
            [
                // 3rd Party Dependencies
                'nvd3',
                'datatables'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        // State
        $stateProvider.state('app.dashboards_IGPA', {
            url      : '/dashboard-IGPA',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/IGPA/dashboard-project.html',
                    controller : 'DashboardProjectController as vm'
                }
            },
            resolve  : {
                DashboardData: function (msApi)
                {
                    return msApi.resolve('dashboard.project@get');
                }
            },
            bodyClass: 'dashboard-project'
        })

          .state('app.dashboards_IGPA.IGPA', {
            url  : '/IGPA',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/IGPA/IGPA.html'
              }
            }
          });
    }



})();
