
(function ()
{
  'use strict';

  angular
    .module('app.ui.forms.IGPATool')
    .controller('CheckReportOnMapDialogController', MapsController);

  /** @ngInject */
  function MapsController($scope, $mdDialog, mapData, uiGmapIsReady)
  {

    $scope.data = mapData;


    $scope.cancel = function() {
      $mdDialog.cancel();
      $mdDialog.hide();
    };





    $scope.randomMarkers = [ {id: 1, latitude: $scope.data.split(",")[0], longitude: $scope.data.split(",")[1]} ];



    $scope.map = {
      show: false,
      //USA
      center : {
        latitude: 33.396906,
        longitude: 44.360842
      },
      zoom : 6,
      control : {}
    };

    $scope.refreshMap = function(){
      $scope.map.show = true;

      //France
      uiGmapIsReady.promise()
        .then(function (map_instances) {
          $scope.map.control.refresh({
            latitude: 48,
            longitude: 2.3
          });
        });
      //refresh success
    };

    $scope.refreshMap();

  }


})();




