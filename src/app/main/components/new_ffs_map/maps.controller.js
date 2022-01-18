
(function ()
{
  'use strict';

  angular
    .module('app.components.new_ffs_maps')
    .controller('NewFFSMapsController', MapsController);

  /** @ngInject */
  function MapsController($state, $scope, api, $mdDialog, uiGmapGoogleMapApi)
  {
    var vm = this;
    vm.models = [];


    vm.isLoading = true;

    // Data
    var currentState = $state.current.name;


    $scope.getMap = "all";

    $scope.saveMap = function(map) {
      $scope.getMap = map;
    };


    $scope.events = {
      click: function(marker){




          $mdDialog.show({
            controller: 'NewMapDialogController',
            templateUrl: 'app/main/components/new_ffs_map/dialog1.tmpl.html',
            parent: angular.element(document.body),
            locals: { mapData: marker.model },
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
            .then(function(answer) {
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });


      }
    };

    switch ( currentState )
    {

      case 'app.components_maps.info-window':
        vm.selectedNavItem = 'infoWindowMap';
        break;

      case 'app.components_maps.ffs-health':
        vm.selectedNavItem = 'healthWindowMap';
        break;

      default:
        vm.selectedNavItem = 'infoWindowMap';
    }

    $scope.randomMarkers = [];

    $scope.randomMarkerssmall = [];
    $scope.randomMarkershouse = [];
    $scope.randomMarkershealth = [];
    $scope.randomMarkerscash = [];
    $scope.randomMarkerseducation = [];
    $scope.randomMarkersmunicipality = [];
    $scope.randomMarkerselectricity =[];
    $scope.randomMarkerswater = [];
    $scope.randomMarkersAll = [];

    var styleArray = [
      {
        featureType: "all",
        stylers: [
          { saturation: -80 }
        ]
      }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          { hue: "#00ffee" },
          { saturation: 50 }
        ]
      }, {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];

    console.log("YAAAA");
    $scope.map = { center: { latitude: 33.396906, longitude: 44.360842 }, zoom: 6 ,bounds: {},    styles: styleArray, disableDefaultUI: false};


    $scope.options2 =  {
      icon: {
          url   : '//google-developers.appspot.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      }
    };

    $scope.options = {scrollwheel: false, icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'};

    api.newFFSmap.MapData.get({},

      function (response)
      {
        $scope.randomMarkerssmall = response.data.small;
        $scope.randomMarkershouse = response.data.house;
        $scope.randomMarkershealth = response.data.health;
        $scope.randomMarkerscash = response.data.cash;
        $scope.randomMarkerseducation = response.data.education;
        $scope.randomMarkersmunicipality = response.data.municipality;
        $scope.randomMarkerselectricity = response.data.electricity;
        $scope.randomMarkerswater = response.data.water;
        $scope.randomMarkersAll = response.data.all;

        vm.isLoading = false;

      },

      function (response)
      {


      }
    );


    // Methods

    //////////

    uiGmapGoogleMapApi.then(function (maps) {
      vm.simpleMap = {
        center: {
          latitude: -34.397,
          longitude: 150.644
        },
        zoom: 8
      };

      vm.satelliteMap = {
        center: {
          latitude: -34.397,
          longitude: 150.644
        },
        zoom: 8,
        options: {
          mapTypeId: maps.MapTypeId.SATELLITE
        }
      };

      vm.terrainMap = {
        center: {
          latitude: -34.397,
          longitude: 150.644
        },
        zoom: 8,
        options: {
          mapTypeId: maps.MapTypeId.TERRAIN
        }
      };

      vm.simpleMarkerMap = {
        center: {
          latitude: -25.363882,
          longitude: 131.044922
        },
        zoom: 8,
        marker: {
          id: 0,
          coords: {
            latitude: -25.363882,
            longitude: 131.044922
          }
        }
      };

      vm.customMarkerMap = {
        center: {
          latitude: -25.363882,
          longitude: 131.044922
        },
        zoom: 8,
        marker: {
          id: 0,
          coords: {
            latitude: -25.363882,
            longitude: 131.044922
          },
          options: {
            icon: {
              anchor: new maps.Point(36, 36),
              origin: new maps.Point(0, 0),
              url: '//google-developers.appspot.com/maps/documentation/javascript/examples/full/images/beachflag.png'
            }
          }
        }
      }
    });

  }


})();




