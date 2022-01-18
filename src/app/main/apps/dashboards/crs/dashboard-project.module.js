(function ()
{
    'use strict';

    angular
        .module('app.dashboards.CRS',
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
        $stateProvider.state('app.dashboards_CRS', {
            url      : '/dashboard-CRS',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/crs/dashboard-project.html',
                    controller : 'DashboardCRSController as vm'
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
          .state('app.dashboards_CRS.CRS', {
          url  : '/CRS',
          views: {
            'tabContent': {
              templateUrl: 'app/main/apps/dashboards/crs/main-notification.html'
            }
          }
        });


      // Api
        msApiProvider.register('dashboard.undp', ['app/data/dashboard/sitrep/data.json']);
    }

})();
