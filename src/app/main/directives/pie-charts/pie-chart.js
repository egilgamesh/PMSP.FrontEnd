(function ()
{
  'use strict';
  angular.module('fuse').directive('amohammedPieChart', [function() {
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
      templateUrl: 'app/main/directives/pie-charts/pie-chart.html',
      controller: function($scope, api, $interval, $mdSidenav){

        var vm = this;
        vm.isLoading = true;

        vm.dashboardData = {
          "widget6": {},
          "widget7": {},
        };

        api.chart.ffsPie.get({type: $scope.type},
          // Success
          function (response) {
            vm.dashboardData.widget6 = response.pie;
            vm.dashboardData.widget7 = response.text;
            vm.isLoading = false;
            initChart();
          },
          // Error
          function (response) {
            vm.isLoading = false;
            // console.error(response);
          }
        );
        // Data
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
            config = {type: $scope.type, selectActivity: $scope.selectActivity, selectProvince: $scope.selectProvince};
          } else {
            var fromDate = moment($scope.fromDate).format('Y-MM-DD');
            var toDate = moment($scope.toDate).format('Y-MM-DD');
            config = {type: $scope.type, fromDate: fromDate, toDate: toDate, selectActivity: $scope.selectActivity, selectProvince: $scope.selectProvince};
          }

          $scope.loadingForUpdate = true;



          $scope.infoGraphic = {};

          api.chart.ffsPie.get(config,
            // Success
            function (response) {
              vm.dashboardData.widget6 = response.pie;
              vm.dashboardData.widget7 = response.text;
              vm.isLoading = false;
              initChart();
            },
            // Error
            function (response) {
              vm.isLoading = false;
              // console.error(response);
            }
          );
        };


        function initChart() {

          // Widget 6
          vm.widget6 = {
            title       : vm.dashboardData.widget6.title,
            mainChart   : {
              config : {
                refreshDataOnly: true,
                deepWatchData  : true
              },
              options: {
                chart: {
                  type        : 'pieChart',
                  color       : ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#BA1F30', '#1B68B3', '#A8C5E7'],
                  height      : 400,
                  margin      : {
                    top   : 0,
                    right : 0,
                    bottom: 0,
                    left  : 0
                  },
                  donut       : true,
                  clipEdge    : true,
                  cornerRadius: 0,
                  labelType   : 'percent',
                  padAngle    : 0.02,
                  x           : function (d)
                  {
                    return d.label;
                  },
                  y           : function (d)
                  {
                    return d.value;
                  },
                  tooltip     : {
                    gravity: 's',
                    classes: 'gravity-s'
                  }
                }
              },
              data   : []
            },
            footerLeft  : vm.dashboardData.widget6.footerLeft,
            footerRight : vm.dashboardData.widget6.footerRight,
            ranges      : vm.dashboardData.widget6.ranges,
            currentRange: '',
            changeRange : function (range)
            {
              vm.widget6.currentRange = range;

              /**
               * Update main chart data by iterating through the
               * chart dataset and separately adding every single
               * dataset by hand.
               *
               * You MUST NOT swap the entire data object by doing
               * something similar to this:
               * vm.widget.mainChart.data = chartData
               *
               * It would be easier but it won't work with the
               * live updating / animated charts due to how d3
               * works.
               *
               * If you don't need animated / live updating charts,
               * you can simplify these greatly.
               */
              angular.forEach(vm.dashboardData.widget6.mainChart, function (data, index)
              {
                vm.widget6.mainChart.data[index] = {
                  label: data.label,
                  value: data.values[range]
                };
              });
            },
            init        : function ()
            {
              // Run this function once to initialize widget

              /**
               * Update the range for the first time
               */
              vm.widget6.changeRange(vm.dashboardData.widget6.default);
            }
          };

          // Widget 7
          vm.widget7 = {
            title       : vm.dashboardData.widget7.title,
            ranges      : vm.dashboardData.widget7.ranges,
            schedule    : vm.dashboardData.widget7.schedule,
            currentRange: vm.dashboardData.widget7.default
          };


          // Initialize Widget 6
          vm.widget6.init();

        }


      },
    }
  }]);

})();

