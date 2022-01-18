(function ()
{
    'use strict';

    angular
        .module('app.components.new_ffs_maps',
            [
                'uiGmapgoogle-maps'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider
            .state('app.new_ffs_maps', {
                url  : '/components/map/NewFFS',
                views: {
                    'content@app'                   : {
                        templateUrl: 'app/main/components/new_ffs_map/maps.html',
                        controller : 'NewFFSMapsController as vm'
                    },
                    'tabContent@app.components_maps': {
                        templateUrl: 'app/main/components/new_ffs_map/tabs/small_grants.html'
                    }
                }
            })


            .state('app.new_ffs_maps.ffs-health', {
                url  : '/ffs-health',
                views: {
                    'tabContent': {
                        templateUrl: 'app/main/components/new_ffs_map/tabs/health.html'
                    }
                }
            })

            .state('app.new_ffs_maps.ffs-small', {
                url  : '/small_grants',
                views: {
                    'tabContent': {
                        templateUrl: 'app/main/components/new_ffs_map/tabs/small_grants.html'
                    }
                }
            })
          .state('app.new_ffs_maps.ffs-house_repair', {
            url  : '/house_repair',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/new_ffs_map/tabs/house_repair.html'
              }
            }
          })
          .state('app.new_ffs_maps.ffs-water', {
            url  : '/ffs-water',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/new_ffs_map/tabs/water.html'
              }
            }
          })
          .state('app.new_ffs_maps.ffs-education', {
            url  : '/ffs-education',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/new_ffs_map/tabs/education.html'
              }
            }
          })
          .state('app.new_ffs_maps.ffs-municipality', {
            url  : '/ffs-municipality',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/new_ffs_map/tabs/municipality.html'
              }
            }
          })
          .state('app.new_ffs_maps.ffs-electricity', {
            url  : '/ffs-electricity',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/new_ffs_map/tabs/electricity.html'
              }
            }
          })
          .state('app.new_ffs_maps.ffs-cash', {
            url  : '/ffs-cash',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/new_ffs_map/tabs/cash.html'
              }
            }
          })
          .state('app.new_ffs_maps.ffs-all', {
            url  : '/ffs-all',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/new_ffs_map/tabs/all.html'
              }
            }
          });
    }

  angular
    .module('app.components.new_ffs_maps').config([
    'uiGmapGoogleMapApiProvider',
    function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        key      : 'AIzaSyDKeU9wdQLWFx8rob6ONQzY8swugt8Bfls',
        v        : '3.18',
        libraries: 'places,geometry'
      });
    }
  ]);

})();
