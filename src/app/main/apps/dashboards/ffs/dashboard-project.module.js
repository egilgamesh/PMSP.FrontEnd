(function ()
{
    'use strict';

    angular
        .module('app.dashboards.FFS',
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
        $stateProvider.state('app.dashboards_FFS', {
            url      : '/dashboard-FFS',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/ffs/dashboard-project.html',
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
          .state('app.dashboards_FFS.NewGeneralFFSTool', {
            url  : '/NewGeneralFFSTool',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/ffs/newGeneralFFSTool.html'
              }
            }
          })
          .state('app.dashboards_FFS.NewCashForWork', {
          url  : '/NewCashForWork',
          views: {
            'tabContent': {
              templateUrl: 'app/main/apps/dashboards/ffs/NewCashForWork.html'
            }
          }
        })
    }



})();
