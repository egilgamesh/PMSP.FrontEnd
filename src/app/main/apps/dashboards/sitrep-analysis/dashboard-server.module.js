(function ()
{
    'use strict';

    angular
        .module('app.dashboards.server',
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
        $stateProvider.state('app.dashboards_sitrepAnalysis', {
            url      : '/dashboard-sitRepAnalysis',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/sitrep-analysis/dashboard-server.html',
                    controller : 'DashboardServerController as vm'
                }
            },
            resolve  : {
                DashboardData: function (msApi)
                {
                    return msApi.resolve('dashboard.server@get');
                }
            },
            bodyClass: 'dashboard-server'
        })
          .state('app.dashboards_sitrepAnalysis.thisWeek', {
            url  : '/thisWeek',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/sitrep-analysis/thisWeek.html'
              }
            }
          })
          .state('app.dashboards_sitrepAnalysis.lastWeek', {
            url  : '/lastWeek',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/sitrep-analysis/lastWeek.html'
              }
            }
          })
          .state('app.dashboards_sitrepAnalysis.twoWeekAgo', {
            url  : '/twoWeekAgo',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/sitrep-analysis/twoWeekAgo.html'
              }
            }
          })
          .state('app.dashboards_sitrepAnalysis.oneMonthAgo', {
            url  : '/oneMonthAgo',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/sitrep-analysis/oneMonthAgo.html'
              }
            }
          });

        // Api
        msApiProvider.register('dashboard.server', ['app/data/dashboard/server/data.json']);
    }

})();
