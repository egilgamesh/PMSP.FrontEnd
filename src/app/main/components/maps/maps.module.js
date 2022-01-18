(function ()
{
    'use strict';

    angular
        .module('app.components.maps',
            [
                // 3rd Party Dependencies
                'uiGmapgoogle-maps'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider
            .state('app.components_maps', {
                url  : '/components/maps',
                views: {
                    'content@app'                   : {
                        templateUrl: 'app/main/components/maps/maps.html',
                        controller : 'MapsController as vm'
                    },
                    'tabContent@app.components_maps': {
                        templateUrl: 'app/main/components/maps/tabs/sitrep.html'
                    }
                }
            })


            .state('app.components_maps.ffs-health', {
                url  : '/ffs-health',
                views: {
                    'tabContent': {
                        templateUrl: 'app/main/components/maps/tabs/health.html'
                    }
                }
            })

            .state('app.components_maps.sitrep', {
                url  : '/sitrep',
                views: {
                    'tabContent': {
                        templateUrl: 'app/main/components/maps/tabs/sitrep.html'
                    }
                }
            })
          .state('app.components_maps.ffs-water', {
            url  : '/ffs-water',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/maps/tabs/water.html'
              }
            }
          })
          .state('app.components_maps.ffs-education', {
            url  : '/ffs-education',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/maps/tabs/education.html'
              }
            }
          })
          .state('app.components_maps.ffs-municipality', {
            url  : '/ffs-municipality',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/maps/tabs/municipality.html'
              }
            }
          })
          .state('app.components_maps.ffs-electricity', {
            url  : '/ffs-electricity',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/maps/tabs/electricity.html'
              }
            }
          })
          .state('app.components_maps.ffs-cash', {
            url  : '/ffs-cash',
            views: {
              'tabContent': {
                templateUrl: 'app/main/components/maps/tabs/cash.html'
              }
            }
          });
    }

  angular
    .module('app.components.maps').config([
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
