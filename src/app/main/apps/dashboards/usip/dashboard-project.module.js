(function ()
{
    'use strict';

    angular
        .module('app.dashboards.USIP',
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
        $stateProvider.state('app.dashboards_USIP', {
            url      : '/dashboard-USIP',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/usip/dashboard-project.html',
                    controller : 'DashboardUSIPController as vm'
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
          .state('app.dashboards_USIP.USIP', {
          url  : '/USIP',
          views: {
            'tabContent': {
              templateUrl: 'app/main/apps/dashboards/usip/main-notification.html'
            }
          }
        });

    }

})();
