(function ()
{
    'use strict';

    angular
        .module('app.dashboards.MENA',
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
        $stateProvider.state('app.dashboards_MENA', {
            url      : '/dashboard-MENA',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/mena/dashboard-project.html',
                    controller : 'DashboardMENAController as vm'
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
          .state('app.dashboards_MENA.MENA', {
          url  : '/MENA',
          views: {
            'tabContent': {
              templateUrl: 'app/main/apps/dashboards/mena/main-notification.html'
            }
          }
        });

    }

})();
