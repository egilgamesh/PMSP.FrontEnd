(function () {
  'use strict';

  angular
    .module('app.dashboards.Metabase')
    .controller('MetabaseController', DashboardProjectController);

  /** @ngInject */
  function DashboardProjectController($scope, $interval, $mdSidenav, api, $state, $location, $SiteVisitAPI, $mdDialog, $http, appConfig) {
    var vm = this;
    vm.userName = localStorage.getItem('UserName');
    vm.homeData = {};

    vm.tabSelect = 0;
  }


})();
