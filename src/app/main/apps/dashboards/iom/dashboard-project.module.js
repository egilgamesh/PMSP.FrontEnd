(function ()
{
    'use strict';

    angular
        .module('app.dashboards.IOM',
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
        $stateProvider.state('app.dashboards_IOM', {
            url      : '/dashboard-IOM',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/iom/dashboard-project.html',
                    controller : 'DashboardIOMController as vm'
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
          .state('app.dashboards_IOM.IOM', {
          url  : '/IOM',
          views: {
            'tabContent': {
              templateUrl: 'app/main/apps/dashboards/iom/main-notification.html'
            }
          }
        });

    }

})();
