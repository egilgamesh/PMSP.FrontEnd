(function ()
{
    'use strict';

    angular
        .module('app.dashboards.sitrep',
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
        $stateProvider.state('app.dashboards_sitrep', {
            url      : '/dashboard-sitrep',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/sitrep/dashboard-project.html',
                    controller : 'DashboardSitRepController as vm'
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
          .state('app.dashboards_sitrep.SitRep', {
          url  : '/SitRep',
          views: {
            'tabContent': {
              templateUrl: 'app/main/apps/dashboards/sitrep/main-notification.html'
            }
          }
        });


      // Api
        msApiProvider.register('dashboard.undp', ['app/data/dashboard/sitrep/data.json']);
    }

})();
