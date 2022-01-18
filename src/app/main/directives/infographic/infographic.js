(function ()
{
  'use strict';
  angular.module('fuse').filter("trust", ['$sce', function($sce) {
    return function(htmlCode){
      return $sce.trustAsHtml(htmlCode);
    }
  }]);
  angular.module('fuse').directive('infographic', [function() {
    return {
      restrict: 'EA',
      scope: {
        type: '=',
        fromDate: '=',
        toDate: '=',
        selectActivity: '=',
        selectProvince: '=',
      },
      controllerAs: 'vm',
      templateUrl: 'app/main/directives/infographic/infographic.html',
      controller: function($scope, api, $interval, $mdSidenav){

        var vm = this;
        $scope.show = false;
        $scope.isLoading = true;
        console.log($scope.type);
        $scope.infoGraphic = {};



        api.chart.infoGraphic.get({type: $scope.type},
          // Success
          function (response) {

            $scope.isLoading = false;
            $scope.infoGraphic = response;

            if (response.show) {
              $scope.show = true;
            }

          },
          // Error
          function (response) {
            $scope.isLoading = false;
            // console.error(response);
          }
        );
        // Data

        $scope.loadingForUpdate = false;

        $scope.$watchGroup(['toDate', 'fromDate', 'selectActivity', 'selectProvince'], function(newValues, oldValues, scope) {
          $scope.changeDate();
        });
        // $scope.$watch('toDate', function (v) {
        //   $scope.changeDate();
        // }, true);
        // $scope.$watch('fromDate', function (v) {
        //   $scope.changeDate();
        // }, true);
        //
        // $scope.$watch('selectActivity', function (v) {
        //   $scope.changeDate();
        // }, true);
        // $scope.$watch('selectProvince', function (v) {
        //   $scope.changeDate();
        // }, true);
        $scope.changeDate = function() {

          var config = {};

         if ($scope.toDate === undefined || $scope.fromDate === undefined) {
           config = {type: 'ffs', selectActivity: $scope.selectActivity, selectProvince: $scope.selectProvince};
         } else {
           var fromDate = moment($scope.fromDate).format('Y-MM-DD');
           var toDate = moment($scope.toDate).format('Y-MM-DD');
           config = {type: 'ffs', fromDate: fromDate, toDate: toDate, selectActivity: $scope.selectActivity, selectProvince: $scope.selectProvince};
         }

          $scope.loadingForUpdate = true;

          $scope.infoGraphic = {};

          api.chart.infoGraphic.get(config,
            // Success
            function (response) {

              $scope.loadingForUpdate = false;
              $scope.infoGraphic = response;

            },
            // Error
            function (response) {
              $scope.loadingForUpdate = false;
              // console.error(response);
            }
          );

        }



      },
    }
  }]);

})();

