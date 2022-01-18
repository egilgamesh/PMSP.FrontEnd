(function ()
{
    'use strict';

    angular
        .module('app.dashboards.TopMountain',
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
        $stateProvider.state('app.dashboards_TopMountain', {
            url      : '/dashboard-TopMountain',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/TopMountain/dashboard-project.html',
                    controller : 'DashboardTopMountainController as vm'
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
          .state('app.dashboards_TopMountain.TopMountain', {
          url  : '/TopMountain',
          views: {
            'tabContent': {
              templateUrl: 'app/main/apps/dashboards/TopMountain/main-notification.html'
            }
          }
        });

    }

})();
