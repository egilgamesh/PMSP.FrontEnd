
(function ()
{
  'use strict';

  angular
    .module('app.components.maps')
    .controller('MapsController', MapsController);

  /** @ngInject */
  function MapsController($state, $scope, api)
  {
    var vm = this;

    // Data
    var currentState = $state.current.name;

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

    $scope.map = { center: { latitude: 33.396906, longitude: 44.360842 }, zoom: 6 ,bounds: {},    styles: styleArray,
      disableDefaultUI: true};
    $scope.options = {scrollwheel: false};

    api.map.MapData.get({},

      function (response)
      {
        $scope.randomMarkerssitrep = response.data.sitrep;
        $scope.randomMarkershealth = response.data.health;
        $scope.randomMarkerscash = response.data.cash;
        $scope.randomMarkerseducation = response.data.education;
        $scope.randomMarkersmunicipality = response.data.municipality;
        $scope.randomMarkerselectricity = response.data.electricity;
        $scope.randomMarkerswater = response.data.water;

      },

      function (response)
      {


      }
    );


  }

})();




