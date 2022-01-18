(function () {
  'use strict';

  angular
    .module('app.dashboards.CRS')
    .controller('DashboardCRSController', DashboardProjectController);

  /** @ngInject */
  function DashboardProjectController($scope, $interval, $mdSidenav, DashboardData, api, $state, $mdDialog) {
    var vm = this;
    vm.userName = localStorage.getItem('UserName');
    vm.homeData = {};
    vm.pageInitLoading = true;


    var currentState = $state.current.name;

    switch (currentState) {
      default:
        vm.selectedNavItem = 'Home';
    }


    api.home.CRS.get({},
      // Success
      function (response) {
        vm.homeData = response;
        vm.pageInitLoading = false;
      },

      // Error
      function (response) {
        console.error(response);
        vm.pageInitLoading = false;
      }
    );

  }

})();
