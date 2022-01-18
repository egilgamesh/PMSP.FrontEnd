(function ()
{
    'use strict';

    angular
        .module('app.dashboards.HAI',
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
        $stateProvider.state('app.dashboards_HAI', {
            url      : '/dashboard-HAI',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/hai/dashboard-project.html',
                    controller : 'DashboardHAIController as vm'
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
          .state('app.dashboards_HAI.HAI', {
          url  : '/HAI',
          views: {
            'tabContent': {
              templateUrl: 'app/main/apps/dashboards/hai/main-notification.html'
            }
          }
        });


      // Api
        msApiProvider.register('dashboard.undp', ['app/data/dashboard/sitrep/data.json']);
    }

})();
