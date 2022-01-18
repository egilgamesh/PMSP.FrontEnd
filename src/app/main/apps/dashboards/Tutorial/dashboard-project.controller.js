(function () {
  'use strict';

  angular
    .module('app.dashboards.tut')
    .controller('DashboardTutController', DashboardProjectController);

  /** @ngInject */
  function DashboardProjectController($scope) {
    var vm = this;
    vm.userName = localStorage.getItem('UserName');
    vm.homeData = {};



  }

})();
