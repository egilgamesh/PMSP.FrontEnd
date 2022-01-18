(function ()
{
    'use strict';


  angular.module('app.components.tables.cash')
        .controller('CashController', MainController);

    /** @ngInject */
    function MainController($scope, $CashFormAPI, $mdDialog, appConfig, $state, $stateParams)
    {
      var folderPath = 'app/main/components/tables/cash-table/';
      var vm = this;

      vm.url = appConfig.url;

      var bookmark;
      vm.selected = [];

      vm.filter = {
        options: {
          debounce: 500
        }
      };

      vm.query = {
        filter: '',
        limit: '5',
        order: 'id',
        page: 1
      };

      function success(items) {
        vm.selected = [];
        vm.items = items;
      }

      vm.addItem = function (event) {
        console.log(event);
        $state.go('app.ui_forms-cash');
      };

      vm.delete = function (event) {
        $mdDialog.show({
          clickOutsideToClose: true,
          controller: 'DelCashAPIController',
          controllerAs: 'ctrl',
          focusOnOpen: false,
          targetEvent: event,
          locals: { items: vm.selected },
          templateUrl: folderPath + 'delete-dialog.html',
        }).then(vm.getItems);
      };


      vm.getItems= function () {
        vm.query.informationType = $stateParams.type;
        vm.promise = $CashFormAPI.items.get(vm.query, success).$promise;
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

    };
})();
