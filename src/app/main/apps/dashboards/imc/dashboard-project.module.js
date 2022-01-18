(function ()
{
    'use strict';

    angular
        .module('app.dashboards.IMC',
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
        $stateProvider.state('app.dashboards_IMC', {
            url      : '/dashboard-IMC',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/imc/dashboard-project.html',
                    controller : 'DashboardIMCController as vm'
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
          .state('app.dashboards_IMC.IMC', {
          url  : '/IMC',
          views: {
            'tabContent': {
              templateUrl: 'app/main/apps/dashboards/imc/main-notification.html'
            }
          }
        });


      // Api
        msApiProvider.register('dashboard.undp', ['app/data/dashboard/sitrep/data.json']);
    }

})();
