(function () {
  'use strict';

  angular
    .module('app.dashboards.IGPA')
    .controller('DashboardProjectController', DashboardProjectController);

  /** @ngInject */
  function DashboardProjectController($scope, $interval, $mdSidenav, DashboardData, api, $state, $location, $SiteVisitAPI, $mdDialog, $http, appConfig) {
    var vm = this;
    vm.userName = localStorage.getItem('UserName');
    vm.homeData = {};

    vm.tabSelect = 0;

    vm.isLoading = true;
    api.home.list.get({},

      // Success
      function (response) {


        vm.isLoading = false;
        vm.homeData = response;
      },

      // Error
      function (response) {
        // console.error(response);
      }
    );

  }


})();
