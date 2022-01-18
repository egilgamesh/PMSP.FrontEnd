(function ()
{
    'use strict';

    angular
        .module('app.dashboards.home',
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
        $stateProvider.state('app.dashboards_home', {
            url      : '/dashboard-home',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/home/dashboard-project.html',
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

          .state('app.dashboards_home.home', {
            url  : '/home',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/home/home.html'
              }
            }
          });
      // Api
        msApiProvider.register('dashboard.project', ['app/data/dashboard/project/data.json']);
    }



})();
