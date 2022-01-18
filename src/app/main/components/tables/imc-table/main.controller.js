(function ()
{
    'use strict';


  angular.module('app.components.tables.IMC')
        .controller('IMCController', MainController);

    /** @ngInject */
    function MainController($http, $scope, $IMCFormAPI, $IMCSearchFormAPI, $mdDialog, appConfig, $state, $stateParams, $timeout, $q, $log)
    {
      var folderPath = 'app/main/components/tables/imc-table/';
      var vm = this;


      vm.url = appConfig.url;

      var bookmark;
      vm.selected = [];

      $http.get(appConfig.apiUrl + 'IMCFiltersItems').then(function (response) {
        vm.ifms = response.data.ifm;
        vm.province = response.data.province;
        vm.activity = response.data.activity;
      }, function(response){
        error(response);
      });

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
        $state.go('app.ui_forms-IMCTool');
      };

      vm.delete = function (event) {
        $mdDialog.show({
          clickOutsideToClose: true,
          controller: 'DelIMCAPIController',
          controllerAs: 'ctrl',
          focusOnOpen: false,
          targetEvent: event,
          locals: { items: vm.selected },
          templateUrl: folderPath + 'delete-dialog.html',
        }).then(vm.getItems);
      };


      vm.getItems= function () {

        vm.query.ifmFilter = vm.ifmFilter;
        vm.query.provinceFilter = vm.provinceFilter;
        vm.query.activityFilter = vm.activityFilter;
        vm.query.startDateFilter = vm.startDateFilter;
        vm.query.endDateFilter = vm.endDateFilter;


        vm.query.informationType = $stateParams.type;
        vm.promise = $IMCFormAPI.items.get(vm.query, success).$promise;
      };

      vm.changeValue = function() {
        vm.getItems();
      };

      vm.clear = function() {
        vm.ifmFilter = '';
        vm.provinceFilter = '';
        vm.activityFilter = '';
        vm.startDateFilter = '';
        vm.endDateFilter = '';
        vm.getItems();
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





      vm.simulateQuery = false;
      vm.isDisabled    = false;
      // list of `state` value/display objects
      vm.states        = loadAll();
      vm.querySearch   = querySearch;
      vm.selectedItemChange = selectedItemChange;
      vm.searchTextChange   = searchTextChange;
      vm.newState = newState;
      function newState(state) {
        alert("Sorry! You'll need to create a Constitution for " + state + " first!");
      }
      // ******************************
      // Internal methods
      // ******************************
      /**
       * Search for states... use $timeout to simulate
       * remote dataservice call.
       */

      function successSearch(items) {
        console.log(items);
      }
      var posts = undefined;
      function querySearch (query) {


        var finalQuery = query;

        if (finalQuery === '') {
          finalQuery = "none";
        }


        // create deferred object using $q
        var deferred = $q.defer();

        // get posts form backend
        $http.get(appConfig.apiUrl + 'SearchIMCForm/' + finalQuery)
          .then(function(result) {
            // save fetched posts to the local variable
            posts = result.data;
            console.log(posts);
            // resolve the deferred
            deferred.resolve(posts);
          }, function(error) {
            posts = error;
            deferred.reject(error);
          });

        // set the posts object to be a promise until result comeback
        posts = deferred.promise;

        return $q.when(posts);


      }
      function searchTextChange(text) {
        $log.info('Text changed to ' + text);
      }
      function selectedItemChange(item) {


        try {
          vm.query.title = item.display;
        } catch(err) {
          vm.query.title = "";
        }
        vm.getItems();
      }
      /**
       * Build `states` list of key/value pairs
       */


      function loadAll() {


        // create deferred object using $q
        var deferred = $q.defer();

        // get posts form backend
        $http.get(appConfig.apiUrl + 'newFFSFiltersItems')
          .then(function(result) {
            // save fetched posts to the local variable
            posts = result.data;
            // resolve the deferred
            deferred.resolve(posts);
          }, function(error) {
            posts = error;
            deferred.reject(error);
          });

        // set the posts object to be a promise until result comeback
        posts = deferred.promise;

        return $q.when(posts);
      }
      /**
       * Create filter function for a query string
       */  function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
          return (state.value.indexOf(lowercaseQuery) === 0);
        };
      }




    }
})();
