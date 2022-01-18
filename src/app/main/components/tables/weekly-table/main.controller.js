(function ()
{
    'use strict';


  angular.module('app.components.tables.weekly')
        .controller('WeeklyController', UserController);

    /** @ngInject */
    function UserController($scope, $WeeklyAPI, $mdDialog, $http, appConfig)
    {
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
        limit: '5',
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
        vm.promise = $WeeklyAPI.items.get(vm.query, success).$promise;
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
        console.log(vm.ifms);
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

    };
})();
