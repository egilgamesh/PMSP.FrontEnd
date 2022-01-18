(function ()
{
    'use strict';

    angular
        .module('app.dashboards.server')
        .controller('DashboardServerController', DashboardServerController);

    /** @ngInject */
    function DashboardServerController($scope, $interval, DashboardData, api)
    {
        var vm = this;

        // Data
        vm.thisWeek = {};
      vm.lastWeek = {};
      vm.twoWeekAgo = {};
      vm.oneMonthAgo = {};

      api.SRForm.analysis.get({},

        // Success
        function (response)
        {

          vm.thisWeek.title =  response['changing']['this week']['title'];
          vm.thisWeek.table =  response['changing']['this week']['table'];

          vm.lastWeek.title =  response['changing']['last week']['title'];
          vm.lastWeek.table =  response['changing']['last week']['table'];

          vm.twoWeekAgo.title =  response['changing']['two week ago']['title'];
          vm.twoWeekAgo.table =  response['changing']['two week ago']['table'];

          vm.oneMonthAgo.title =  response['changing']['one month ago']['title'];
          vm.oneMonthAgo.table =  response['changing']['one month ago']['table'];

        },

        // Error
        function (response)
        {
          console.error(response);
        }
      );

    }
})();
