(function () {
  'use strict';

  angular
    .module('app.dashboards.home')
    .controller('DashboardProjectController', DashboardProjectController);

  /** @ngInject */
  function DashboardProjectController($scope, $interval, $mdSidenav, DashboardData, api, $state, $location, $SiteVisitAPI, $mdDialog, $http, appConfig) {
    var vm = this;
    vm.userName = localStorage.getItem('UserName');
    vm.homeData = {};

    vm.tabSelect = 0;

    if ($location.path() === '/dashboard-project/intro') {
      vm.tabSelect = 1;
    }

    if ($location.path() === '/dashboard-project/NewCashForWork') {
      vm.tabSelect = 2;
    }

    if ($location.path() === '/dashboard-project/IGPA') {
      vm.tabSelect = 3;
    }


    vm.init = function (type) {
      if (type === 'IGPA') {
        vm.tabSelect = 3;
      }
      if (type === 'FFS') {
        vm.tabSelect = 1;
      }
      if (type === 'HOME') {
        vm.tabSelect = 0;
      }
    };


    var currentState = $state.current.name;

    switch (currentState) {

      case 'app.dashboards_project':
        vm.selectedNavItem = 'Home';
        break;

      case 'app.dashboards_project.SitRep':
        vm.selectedNavItem = 'SitRep';
        break;

      default:
        vm.selectedNavItem = 'Home';
    }

    vm.isLoading = true;
    api.home.list.get({},

      // Success
      function (response) {


        vm.isLoading = false;
        vm.homeData = response;
        vm.healthChart = response.notifications.HealthChart;

        vm.widget6 = {
          title: vm.healthChart.title,
          mainChart: {
            config: {
              refreshDataOnly: true,
              deepWatchData: true
            },
            options: {
              chart: {
                type: 'pieChart',
                color: ['#1ABC2B', '#DE1633', '#FF4500', '#D3D3D3'],
                height: 400,
                margin: {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
                },
                donut: true,
                clipEdge: true,
                cornerRadius: 0,
                labelType: 'percent',
                padAngle: 0.02,
                x: function (d) {
                  return d.label;
                },
                y: function (d) {
                  return d.value;
                },
                tooltip: {
                  gravity: 's',
                  classes: 'gravity-s'
                }
              }
            },
            data: []
          },
          footerLeft: vm.healthChart.footerLeft,
          footerRight: vm.healthChart.footerRight,
          ranges: vm.healthChart.ranges,
          currentRange: '',
          changeRange: function (range) {
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
            angular.forEach(vm.healthChart.mainChart, function (data, index) {
              vm.widget6.mainChart.data[index] = {
                label: data.label,
                value: data.values[range]
              };
            });
          },
          init: function () {
            // Run this function once to initialize widget

            /**
             * Update the range for the first time
             */
            vm.widget6.changeRange('TW');
          }
        };
        vm.widget6.init();

        vm.widget7 = {
          title: response.notifications.HealthInfo.title,
          ranges: response.notifications.HealthInfo.ranges,
          schedule: response.notifications.HealthInfo.schedule,
          currentRange: 'Green Flag'
        };


        //cash chart
        vm.cashChart = response.notifications.CashChart;

        vm.CashwidgetChart = {
          title: vm.cashChart.title,
          mainChart: {
            config: {
              refreshDataOnly: true,
              deepWatchData: true
            },
            options: {
              chart: {
                type: 'pieChart',
                color: ['#1ABC2B', '#DE1633', '#FF4500', '#D3D3D3'],
                height: 400,
                margin: {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
                },
                donut: true,
                clipEdge: true,
                cornerRadius: 0,
                labelType: 'percent',
                padAngle: 0.02,
                x: function (d) {
                  return d.label;
                },
                y: function (d) {
                  return d.value;
                },
                tooltip: {
                  gravity: 's',
                  classes: 'gravity-s'
                }
              }
            },
            data: []
          },
          footerLeft: vm.cashChart.footerLeft,
          footerRight: vm.cashChart.footerRight,
          ranges: vm.cashChart.ranges,
          currentRange: '',
          changeRange: function (range) {
            vm.CashwidgetChart.currentRange = range;

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
            angular.forEach(vm.cashChart.mainChart, function (data, index) {
              vm.CashwidgetChart.mainChart.data[index] = {
                label: data.label,
                value: data.values[range]
              };
            });
          },
          init: function () {
            // Run this function once to initialize widget

            /**
             * Update the range for the first time
             */
            vm.CashwidgetChart.changeRange('TW');
          }
        };
        vm.CashwidgetChart.init();

        vm.CashwidgetInfo = {
          title: response.notifications.CashInfo.title,
          ranges: response.notifications.CashInfo.ranges,
          schedule: response.notifications.CashInfo.schedule,
          currentRange: 'Green Flag'
        };
      },

      // Error
      function (response) {
        // console.error(response);
      }
    );

    // Data
    vm.dashboardData = DashboardData;
    vm.projects = vm.dashboardData.projects;

    // Widget 1
    vm.widget1 = vm.dashboardData.widget1;

    // Widget 2
    vm.widget2 = vm.dashboardData.widget2;

    // Widget 3
    vm.widget3 = vm.dashboardData.widget3;

    // Widget 4
    vm.widget4 = vm.dashboardData.widget4;

    // Widget 5


    // Widget 6


    // Widget 7


    // Widget 8
    vm.widget8 = {
      title: vm.dashboardData.widget8.title,
      mainChart: {
        options: {
          chart: {
            type: 'pieChart',
            color: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107'],
            height: 400,
            margin: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            labelType: 'percent',
            x: function (d) {
              return d.label;
            },
            y: function (d) {
              return d.value;
            },
            tooltip: {
              gravity: 's',
              classes: 'gravity-s'
            }
          }
        },
        data: vm.dashboardData.widget8.mainChart
      }
    };

    // Widget 9
    vm.widget9 = {
      title: vm.dashboardData.widget9.title,
      weeklySpent: {
        title: vm.dashboardData.widget9.weeklySpent.title,
        count: vm.dashboardData.widget9.weeklySpent.count,
        chartData: []
      },
      totalSpent: {
        title: vm.dashboardData.widget9.totalSpent.title,
        count: vm.dashboardData.widget9.totalSpent.count,
        chartData: []
      },
      remaining: {
        title: vm.dashboardData.widget9.remaining.title,
        count: vm.dashboardData.widget9.remaining.count,
        chartData: []
      },
      totalBudget: vm.dashboardData.widget9.totalBudget,
      chart: {
        config: {
          refreshDataOnly: true,
          deepWatchData: true
        },
        options: {
          chart: {
            type: 'lineChart',
            color: ['#00BCD4'],
            height: 50,
            margin: {
              top: 8,
              right: 0,
              bottom: 0,
              left: 0
            },
            isArea: true,
            interpolate: 'cardinal',
            clipEdge: true,
            duration: 500,
            showXAxis: false,
            showYAxis: false,
            showLegend: false,
            useInteractiveGuideline: true,
            x: function (d) {
              return d.x;
            },
            y: function (d) {
              return d.y;
            },
            yDomain: [0, 9],
            xAxis: {
              tickFormat: function (d) {
                return vm.widget9.days[d];
              }
            },
            interactiveLayer: {
              tooltip: {
                gravity: 'e',
                classes: 'gravity-e'
              }
            }
          }
        }
      },
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      ranges: vm.dashboardData.widget9.ranges,
      currentRange: '',
      changeRange: function (range) {
        vm.widget9.currentRange = range;

        /**
         * Update mini charts. They only have 1 dataset
         * so we can do [0] without needing to iterate
         * through in their data arrays
         */
        vm.widget9.weeklySpent.chartData[0] = {
          key: vm.dashboardData.widget9.weeklySpent.chart.label,
          values: vm.dashboardData.widget9.weeklySpent.chart.values[range]
        };

        vm.widget9.totalSpent.chartData[0] = {
          key: vm.dashboardData.widget9.totalSpent.chart.label,
          values: vm.dashboardData.widget9.totalSpent.chart.values[range]
        };

        vm.widget9.remaining.chartData[0] = {
          key: vm.dashboardData.widget9.remaining.chart.label,
          values: vm.dashboardData.widget9.remaining.chart.values[range]
        };
      },
      init: function () {
        // Run this function once to initialize widget

        /**
         * Update the range for the first time
         */
        vm.widget9.changeRange('TW');
      }
    };

    // Widget 10
    vm.widget10 = vm.dashboardData.widget10;

    // Widget 11
    vm.widget11 = {
      title: vm.dashboardData.widget11.title,
      table: vm.dashboardData.widget11.table,
      dtOptions: {
        dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
        pagingType: 'simple',
        autoWidth: false,
        responsive: true,
        order: [1, 'asc'],
        columnDefs: [
          {
            width: '40',
            orderable: false,
            targets: [0]
          },
          {
            width: '20%',
            targets: [1, 2, 3, 4, 5]
          }
        ]
      }
    };

    // Now widget
    vm.nowWidget = {
      now: {
        second: '',
        minute: '',
        hour: '',
        day: '',
        month: '',
        year: ''
      },
      ticker: function () {
        var now = moment();
        vm.nowWidget.now = {
          second: now.format('ss'),
          minute: now.format('mm'),
          hour: now.format('HH'),
          day: now.format('D'),
          weekDay: now.format('dddd'),
          month: now.format('MMMM'),
          year: now.format('YYYY')
        };
      }
    };

    // Weather widget
    vm.weatherWidget = vm.dashboardData.weatherWidget;

    // Methods
    vm.toggleSidenav = toggleSidenav;
    vm.selectProject = selectProject;

    //////////
    vm.selectedProject = vm.projects[0];

    // Initialize Widget 5


    // Initialize Widget 6


    // Initialize Widget 9
    vm.widget9.init();

    // Now widget ticker
    vm.nowWidget.ticker();

    var nowWidgetTicker = $interval(vm.nowWidget.ticker, 1000);

    $scope.$on('$destroy', function () {
      $interval.cancel(nowWidgetTicker);
    });

    /**
     * Toggle sidenav
     *
     * @param sidenavId
     */
    function toggleSidenav(sidenavId) {
      $mdSidenav(sidenavId).toggle();
    }

    /**
     * Select project
     */
    function selectProject(project) {
      vm.selectedProject = project;
    }


    //SitRep analysis

    vm.sitRepIndicator = {
      "CSS_CN_CellServiceAvailabilityChange": "Cell phone service (Zain, AsiaCell, Korek) - Availability, Impact on Citizens - Change",
      "CSS_CN_CellServiceCostChange": "Cell phone service (Zain, AsiaCell, Korek) - Cost, Impact on Citizens - Change",
      "CSS_CN_InternetAvailabilityChange": "Internet Service Providers - Availability, Impact on Citizens - Change",
      "CSS_CN_InternetCostChange": "Internet Service Providers - Cost, Impact on Citizens - Change",
      "CSS_FE_PetrolAvailabilityChange": "Petrol - Availability, Impact on Citizens - Change",
      "CSS_FE_PetrolCostChange": "Petrol - Cost, Impact on Citizens - Change",
      "CSS_FE_CookingGasCostChange": "Cooking Gas - Cost, Impact on Citizens - Change",
      "CSS_FE_CookingGasAvailabilityChange": "Cooking Gas - Availability, Impact on Citizens - Change",
      "CSS_HA_HousingRentalCostChange": "Housing Rental (100-120 square meter size \u2013 2 rooms) - Cost, Impact on Citizens - Change",
      "CSS_HA_HousingRentalAvailabilityChange": "Housing Rental (100-120 square meter size \u2013 2 rooms) - Availability, Impact on Citizens - Change",
      "ES_HS_EmergencyCostChange": "Emergency Acute Care - Cost, Impact on Citizens - Change",
      "ES_HS_EmergencyAvailabilityChange": "Emergency Acute Care - Availability, Impact on Citizens - Change",
      "ES_HS_MaternalEmergencyCostChange": "Maternal Emergency Delivery - Cost, Impact on Citizens - Change",
      "ES_HS_MaternalEmergencyAvailabilityChange": "Maternal Emergency Delivery - Availability, Impact on Citizens - Change",
      "ES_HS_PrimaryHealthAvailabilityChange": "Primary Health Care Services - Availability, Impact on Citizens - Change",
      "ES_HS_PrivateHospitalsCostChange": "Private Hospitals - Cost, Impact on Citizens - Change",
      "ES_E_PrivatePrimarySchoolCostChange": "Private Primary School - Cost, Impact on Citizens - Change",
      "ES_E_PrivateSecondarySchoolCostChange": "Private Secondary School - Cost, Impact on Citizens - Change",
      "ES_E_PrivatePostSecondaryCostChange": "Private Post-Secondary - Cost, Impact on Citizens - Change",
      "ES_GS_MunicipalElectricityCostChange": "Municipal Electricity - Cost, Impact on Citizens - Change",
      "ES_GS_PrivateElectricityCostChange": "Private Electricity (by generators) - Cost, Impact on Citizens - Change",
      "ES_GS_MunicipalDrinkingCostChange": "Municipal Drinking Water - Cost, Impact on Citizen - Changes",
      "ES_GS_GarbageCollectionAvailabilityChange": "Garbage Collection - Availability, Impact on Citizens - Change",
      "ES_SSN_SocialSecurityPaymentsChange": "Social Security Payments (widows, disabled, elderly, retirees) - Availability, Impact on Citizens - Change",
      "ES_SSN_RationCardChange": "Ration Card - List items available during the reporting period, Impact on Citizens (when less than the standard) - Change",
      "ES_SSN_CharitablePaymentsChange": "Charitable Payments\/Food\/Non Food Items Distributed to the Poor or IDPs (by Mosques, churches, or religious organizations) - Availability, Impact on Citizens - Change",
      "ES_SSN_SupportForIDPsChange": "Support for IDPs, returnees or residents by international organizations (UN and NGOs) - Availability, Impact on Citizens - Change",
      "I_COPI_RoadsChange": "Roads, Highways, Bridges, Dams, Overpasses\/ Tunnels, Airports, Petroleum Sector (exploration, extraction, refinement) - Specify damage from the conflict and its overall condition - Change",
      "I_DTPSI_ElectricityChange": "Electricity Plant(s) Serving the area - Specify damage from the conflict and its overall condition - Change",
      "I_DTPSI_WaterTreatmentChange": "Water Treatment Facility(ies) Serving the area - Specify damage from the conflict and its overall condition - Change",
      "I_DTPSI_WaterNetworkChange": "Water Network Serving the area - Specify damage from the conflict and its overall condition - Change",
      "I_DTPSI_GovernmentChange": "Government Offices - Specify damage from the conflict and its overall condition - Change",
      "I_DTPSI_SchoolsChange": "Schools - Specify damage from the conflict and its overall condition - Change",
      "I_DTPSI_HealthChange": "Health Clinics\/Hospitals - Specify damage from the conflict and its overall conditio - Changen",
      "I_DTCI_PublicMarketChange": "Public Markets - Specify damage from the conflict and the impact of the damage on citizens - Change",
      "I_DTCI_ShopsChange": "Shops - Specify damage from the conflict and the impact of the damage on citizens - Change",
      "I_DTCI_BanksChange": "Banks - Specify damage from the conflict and the impact of the damage on citizens - Change",
      "I_DTCI_GovernmentStoresChange": "Government Stores (for redeeming ration cards) - Specify damage from the conflict and the impact of the damage on citizens - Change",
      "I_DTCI_FactoriesChange": "Factories - Specify damage from the conflict and the impact of the damage on citizens - Change",
      "I_DTCI_OfficeBuildingsChange": "Office Buildings - Specify damage from the conflict and the impact of the damage on citizens - Change",
      "I_DTAI_GreenhousesChange": "Greenhouses - Specify damage from the conflict and the impact of the damage on farmers, agricultural cooperatives or citizens - Change",
      "I_DTHI_ApartmentBuildingsChange": "Apartment Buildings - Specify damage from the conflict and the impact of the damage on citizen housing - Change",
      "I_DTHI_SmallVillasChange": "Small Villas - Specify damage from the conflict and the impact of the damage on citizen housing - Change",
      "ESS_BankServiceChange": "Bank Services - Specify damage from the conflict and the impact of the damage to the economy (including citizen confidence in the banking sector) - Change",
      "SI_YE_SportsEventsChange": "Sports Events for Young People - Specify changes (if any) in the frequency and type of events during the reporting period - Change",
      "SI_YE_YouthLedChange": "Youth-Led Arts or Media Activities for Young People - Specify changes (if any) in the frequency and type of events during the reporting period - Change"
    };
    vm.sitrep = {};
    vm.widget5 = {};
    vm.chartSuccess = false;
    vm.sitRepAnalysisSubmit = function (ev) {
      vm.chartSuccess = false;
      vm.isLoading = true;
      var submitData = angular.copy(vm.sitrep);
      submitData.fromDate = moment(vm.sitrep.fromDate).format('Y-MM-DD');
      submitData.toDate = moment(vm.sitrep.toDate).format('Y-MM-DD');


      api.SRForm.analysisChart.save(submitData,

        // Success
        function (response) {
          vm.isLoading = false;
          vm.message = "Loading...";
          vm.isLoading = false;


          if (response.status === 'success') {

            vm.chartSuccess = true;


            vm.widget5 = {
              title: response.data.title,
              mainChart: {
                config: {
                  refreshDataOnly: true,
                  showValues: true,
                  deepWatchData: true
                },
                options: {
                  chart: {
                    type: 'multiBarChart',
                    color: ['#03a9f4', '#86FFB6', '#7F7F7F', '#CE1126'],
                    height: 420,
                    margin: {
                      top: 8,
                      right: 16,
                      bottom: 32,
                      left: 32
                    },
                    clipEdge: true,
                    groupSpacing: 0.3,
                    deepWatchDataDepth: 10,
                    reduceXTicks: false,
                    stacked: true,
                    duration: 250,
                    x: function (d) {
                      return d.x;
                    },
                    y: function (d) {
                      return d.y;
                    },
                    yAxis: {
                      tickFormat: function (d) {
                        return d;
                      }
                    },
                    legend: {
                      margin: {
                        top: 8,
                        bottom: 32
                      }
                    },
                    controls: {
                      margin: {
                        top: 8,
                        bottom: 32
                      }
                    },
                    tooltip: {
                      gravity: 's',
                      classes: 'gravity-s'
                    }
                  }
                },
                data: []
              },

              days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              ranges: response.data.ranges,
              currentRange: '',
              changeRange: function (range) {
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
                angular.forEach(response.data.mainChart, function (chartData, index) {
                  vm.widget5.mainChart.data[index] = {
                    key: chartData.key,
                    values: chartData.values[range]
                  };
                });

                /**
                 * Do the same thing for the supporting widgets but they
                 * only have 1 dataset so we can do [0] without needing to
                 * iterate through in their data arrays
                 */
                angular.forEach(response.data.supporting, function (widget, name) {
                  vm.widget5.supporting.widgets[name].chart.data[0] = {
                    key: widget.chart.key,
                    values: widget.chart.values[range]
                  };
                });
              },
              init: function () {
                // Run this function once to initialize widget

                /**
                 * Update the range for the first time
                 */
                vm.widget5.changeRange('Anbar');
              }
            };


            vm.widget5.init();



            vm.message = "Analysis successfully!";


          } else {
            vm.chartSuccess = false;
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('body')))
                .clickOutsideToClose(true)
                .title('Message')
                .textContent(response.msg)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );

            // console.error(response);
            vm.message = "Error";

          }

        },

        // Error
        function (response) {
          vm.isLoading = false;
          vm.isLoading = false;
          vm.message = "Error!";
          vm.chartSuccess = false;
          // console.error(response.message);
        }
      );


    }


    var folderPath = 'app/main/components/tables/weekly-table/';
    var vm = this;

    $http.get(appConfig.apiUrl + 'myInfo').then(function (response) {
      vm.user = response.data;
    });


    var bookmark;
    vm.selected = [];

    vm.filter = {
      options: {
        debounce: 500
      }
    };

    vm.query = {
      filter: '',
      limit: '20',
      order: 'id',
      page: 1
    };

    function success(items) {
      vm.selected = [];
      vm.items = items;
    }

    vm.addItem = function (event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'AddWeeklyItemController',
        controllerAs: 'ctrl',
        focusOnOpen: false,
        targetEvent: event,
        locals: { items: vm.selected },
        templateUrl: folderPath + 'add-item-dialog.html',
      }).then(vm.getItems);
    };

    vm.delete = function (event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'DelWeeklyController',
        controllerAs: 'ctrl',
        focusOnOpen: false,
        targetEvent: event,
        locals: { items: vm.selected },
        templateUrl: folderPath + 'delete-dialog.html',
      }).then(vm.getItems);
    };

    vm.approve = function (event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'ReviewWeeklyController',
        controllerAs: 'ctrl',
        focusOnOpen: false,
        targetEvent: event,
        locals: { items: vm.selected },
        templateUrl: folderPath + 'review-dialog.html',
      }).then(vm.getItems);
    };


    vm.getItems= function () {
      vm.query.ifm = vm.ifm;
      vm.query.project = vm.project;
      vm.query.province = vm.province;
      vm.query.status = vm.status;
      vm.promise = $SiteVisitAPI.items.get(vm.query, success).$promise;
    };

    vm.removeFilter = function () {
      vm.filter.show = false;
      vm.query.filter = '';

      if(vm.filter.form.$dirty) {
        vm.filter.form.$setPristine();
      }
    };

    $scope.$watch(function() { return vm.query.filter}, function(newValue,     oldValue) {

      if(!oldValue) {
        bookmark = vm.query.page;
      }

      if(newValue !== oldValue) {
        vm.query.page = 1;
      }
      if(!newValue) {
        vm.query.page = bookmark;
      }
      vm.getItems();
    }, true);


    vm.ifms = [];
    vm.ifm = '';
    vm.project = '';
    vm.province = '';
    vm.status = '';

    $http.get(appConfig.apiUrl + 'ifms').then(function (response) {
      vm.ifms = response.data;
      // console.log(vm.ifms);
    }, function(response){
      error(response);
    });

    vm.changeValue = function() {
      vm.getItems();
    };

    vm.projects = [
      {name: 'GSP', value: 'GSP'},
      {name: 'FFS', value: 'FFS'},
      {name: 'SitRep', value: 'SitRep'},
      {name: 'Writing Report', value: 'WritingReport'},
    ];

    vm.provinces  = [
      'Anbar',
      'Babil',
      'Baghdad', 'Basrah',
      'Dhi Qar',
      'Diwaniyah',
      'Diyala',
      'Karbala',
      'Kirkuk',
      'Maysan',
      'Muthanna',
      'Najaf',
      'Ninawa',
      'Salah Ad Din',
      'Wasit',
      'Erbil'

    ];

    vm.statuses = [
      {value: "approved", name: 'Approve'},
      {value: "rejected", name: 'Reject'},
      {value: "postponed", name: 'Postpone'}
    ];

    vm.clear = function() {
      vm.ifm = '';
      vm.project = '';
      vm.province = '';
      vm.status = '';
      vm.getItems();
    }
  }


})();
