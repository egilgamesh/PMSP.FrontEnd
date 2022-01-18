(function ()
{
    'use strict';

    angular
        .module('app.dashboards.taqadum',
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
        $stateProvider.state('app.dashboards_taqadum', {
            url      : '/dashboard-taqadum',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/taqadum/dashboard-project.html',
                    controller : 'DashboardTaqadumController as vm'
                }
            },
            resolve  : {
                DashboardData: function (msApi)
                {
                    return msApi.resolve('dashboard.taqadum@get');
                }
            },
            bodyClass: 'dashboard-project'
        })
          .state('app.dashboards_taqadum.report', {
          url  : '/Reports',
          views: {
            'tabContent': {
              templateUrl: 'app/main/apps/dashboards/taqadum/main-notification.html'
            }
          }
        });


      // Api
        msApiProvider.register('dashboard.taqadum', ['app/data/tables/taqadum.json']);
    }

})();
