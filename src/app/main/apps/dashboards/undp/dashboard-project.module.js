(function ()
{
    'use strict';

    angular
        .module('app.dashboards.undp',
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
        $stateProvider.state('app.dashboards_undp', {
            url      : '/dashboard-undp',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/undp/dashboard-project.html',
                    controller : 'DashboardUNDPController as vm'
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
          .state('app.dashboards_undp.health', {
            url  : '/health',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/undp/health.html'
              }
            }
          })
          .state('app.dashboards_undp.SitRep', {
          url  : '/SitRep',
          views: {
            'tabContent': {
              templateUrl: 'app/main/apps/dashboards/undp/main-notification.html'
            }
          }
        })
          .state('app.dashboards_undp.water', {
            url  : '/water',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/undp/water.html'
              }
            }
          })
          .state('app.dashboards_undp.education', {
            url  : '/education',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/undp/education.html'
              }
            }
          })
          .state('app.dashboards_undp.electricity', {
            url  : '/electricity',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/undp/electricity.html'
              }
            }
          })
          .state('app.dashboards_undp.municipality', {
            url  : '/municipality',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/undp/municipality.html'
              }
            }
          })
          .state('app.dashboards_undp.cash', {
            url  : '/cash',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/undp/cash.html'
              }
            }
          })
          .state('app.dashboards_undp.small_grants', {
            url  : '/small_grants',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/undp/small_grants.html'
              }
            }
          })
          .state('app.dashboards_undp.house_repair', {
            url  : '/house_repair',
            views: {
              'tabContent': {
                templateUrl: 'app/main/apps/dashboards/undp/house_repair.html'
              }
            }
          });


      // Api
        msApiProvider.register('dashboard.undp', ['app/data/dashboard/project/data.json']);
    }

})();
