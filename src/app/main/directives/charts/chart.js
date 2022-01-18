(function ()
{
  'use strict';
  angular.module('fuse').directive('amohammedChart', [function() {
    return {
      restrict: 'EA',
      scope: {
        type: '=',
        filterBy: '=',
        extra: '=',
        fromDate: '=',
        toDate: '=',
        selectActivity: '=',
        selectProvince: '=',
      },
      controllerAs: 'vm',
      templateUrl: 'app/main/directives/charts/chart.html',
      controller: function($scope, api, $interval, $mdSidenav){

        var vm = this;
        vm.isLoading = true;

        // Data
        vm.dashboardData = {
          "widget5": {}
        };

        api.chart.ffs.get({type: $scope.type},
          // Success
          function (response) {
            vm.dashboardData = {
              "widget5": response
            };
            vm.isLoading = false;
            initChart();
          },
          // Error
          function (response) {
            vm.isLoading = false;
            // console.error(response);
          }
        );
        $scope.$watchGroup(['toDate', 'fromDate', 'selectActivity', 'selectProvince'], function(newValues, oldValues, scope) {
          $scope.changeDate();
        });
        // $scope.$watch('toDate', function (v) {
        //   $scope.changeDate();
        // }, true);
        // $scope.$watch('fromDate', function (v) {
        //   $scope.changeDate();
        // }, true);
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



          vm.isLoading = true;

          api.chart.ffs.get(config,


            // Success
            function (response) {

              vm.dashboardData = {
                "widget5": response
              };
              vm.isLoading = false;
              initChart();
            },
            // Error
            function (response) {
              $scope.isLoading = false;
              // console.error(response);
            }
          );

        }

        function initChart() {
          vm.widget5 = {
            title       : vm.dashboardData.widget5.title,
            mainChart   : {
              config : {
                refreshDataOnly: true,
                deepWatchData  : true
              },
              options: {
                chart: {
                  type        : 'multiBarChart',
                  color       : ['#03a9f4', '#b3e5fc', '#CECCC8', '#247BA0', '#FF1654', '#70C1B3', '#B2DBBF', '#F3FFBD'],
                  height      : 320,
                  margin      : {
                    top   : 8,
                    right : 16,
                    bottom: 32,
                    left  : 32
                  },
                  clipEdge    : true,
                  groupSpacing: 0.3,
                  reduceXTicks: false,
                  stacked     : false,
                  duration    : 250,
                  x           : function (d)
                  {
                    return d.x;
                  },
                  y           : function (d)
                  {
                    return d.y;
                  },
                  yAxis       : {
                    tickFormat: function (d)
                    {
                      return d;
                    }
                  },
                  legend      : {
                    margin: {
                      top   : 8,
                      bottom: 32
                    }
                  },
                  controls    : {
                    margin: {
                      top   : 8,
                      bottom: 32
                    }
                  },
                  tooltip     : {
                    gravity: 's',
                    classes: 'gravity-s'
                  }
                }
              },
              data   : []
            },
            supporting  : {
              widgets: vm.dashboardData.widget5.widgets,
              chart  : {
                config : {
                  refreshDataOnly: true,
                  deepWatchData  : true
                },
                options: {
                  chart: {
                    type                   : 'lineChart',
                    color                  : ['#03A9F4'],
                    height                 : 50,
                    margin                 : {
                      top   : 8,
                      right : 0,
                      bottom: 0,
                      left  : 0
                    },
                    isArea                 : true,
                    interpolate            : 'cardinal',
                    clipEdge               : true,
                    duration               : 500,
                    showXAxis              : false,
                    showYAxis              : false,
                    showLegend             : false,
                    useInteractiveGuideline: true,
                    x                      : function (d)
                    {
                      return d.x;
                    },
                    y                      : function (d)
                    {
                      return d.y;
                    },
                    yDomain                : [0, 80],
                    xAxis                  : {
                      tickFormat: function (d)
                      {
                        return vm.widget5.days[d];
                      }
                    },
                    interactiveLayer       : {
                      tooltip: {
                        gravity: 'e',
                        classes: 'gravity-e'
                      }
                    }
                  }
                },
                data   : []
              }
            },
            days        : vm.dashboardData.widget5.days,
            ranges      : vm.dashboardData.widget5.ranges,
            currentRange: '',
            changeRange : function (range)
            {
              vm.widget5.currentRange = range;

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
              angular.forEach(vm.dashboardData.widget5.mainChart, function (chartData, index)
              {
                vm.widget5.mainChart.data[index] = {
                  key   : chartData.key,
                  values: chartData.values[range]
                };
              });

              /**
               * Do the same thing for the supporting widgets but they
               * only have 1 dataset so we can do [0] without needing to
               * iterate through in their data arrays
               */
              angular.forEach(vm.dashboardData.widget5.supporting, function (widget, name)
              {
                vm.widget5.supporting.widgets[name].chart.data[0] = {
                  key   : widget.chart.key,
                  values: widget.chart.values[range]
                };
              });
            },
            init        : function ()
            {
              // Run this function once to initialize widget

              /**
               * Update the range for the first time
               */
              vm.widget5.changeRange(vm.dashboardData.widget5.default);
            }
          };

          vm.widget5.init();

        }

      },
    }
  }]);

})();

