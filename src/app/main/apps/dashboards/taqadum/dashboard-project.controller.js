(function () {
  'use strict';

  angular
    .module('app.dashboards.taqadum')
    .controller('DashboardTaqadumController', DashboardProjectController);

  /** @ngInject */
  function DashboardProjectController($scope, $interval, $mdSidenav, DashboardData, api, $state, $mdDialog) {
    var vm = this;
    vm.userName = localStorage.getItem('UserName');
    vm.homeData = {};

    vm.employees =[];

    vm.selectedNavItem = 'Taqadum Interviews';
    vm.UserType = localStorage.getItem('UserType');
    if (vm.UserType !== "View Approved Report Only") {
      vm.employees = DashboardData.data;
    }



    vm.dtOptions = {
      dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
      pagingType: 'simple',
      autoWidth : false,
      responsive: true
    };

  }


})();
