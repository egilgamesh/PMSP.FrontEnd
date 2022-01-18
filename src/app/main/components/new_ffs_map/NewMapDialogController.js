
(function ()
{
  'use strict';

  angular
    .module('app.components.new_ffs_maps')
    .controller('NewMapDialogController', MapsController);

  /** @ngInject */
  function MapsController($state, $scope, api, $mdDialog, mapData)
  {

    $scope.data = mapData;

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

  }

})();




