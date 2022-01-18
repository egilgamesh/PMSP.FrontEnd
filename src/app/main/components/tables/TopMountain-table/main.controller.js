(function ()
{
    'use strict';


  angular.module('app.components.tables.TopMountain')
        .controller('TopMountainController', MainController);

    /** @ngInject */
    function MainController($http, $scope, $TopMountainFormAPI, $TopMountainSearchFormAPI, $mdDialog, appConfig, $state, $stateParams, $timeout, $q, $log)
    {
      var folderPath = 'app/main/components/tables/TopMountain-table/';
      var vm = this;


      vm.url = appConfig.url;

      var bookmark;
      vm.selected = [];

      $http.get(appConfig.apiUrl + 'TopMountainFiltersItems').then(function (response) {
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
        $state.go('app.ui_forms-TopMountainTool');
      };

      vm.delete = function (event) {
        $mdDialog.show({
          clickOutsideToClose: true,
          controller: 'DelTopMountainAPIController',
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
        //NEW
        vm.query.newSearch = {data: $scope.dataSearch};
        vm.query.informationType = $stateParams.type;
        vm.promise = $TopMountainFormAPI.items.get(vm.query, success).$promise;
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
        $http.get(appConfig.apiUrl + 'SearchTopMountainForm/' + finalQuery)
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



      //START THE Advanced search
      $scope.adLoading = false;
      $scope.dataSearch = [];
      $scope.searchItems = [];

      $scope.changeItem = function (data, id, index) {
        $scope.dataSearch[index].type = data;
      };
      $scope.loadGroups = function () {
        $scope.adLoading = true;
        return $scope.searchItems.length ? null : $http.get(appConfig.apiUrl + 'getItemsForAdvanceSearchTopMountain').then(function (data) {
          $scope.searchItems = data.data;
          $scope.adLoading = false;
        }, function(error){$scope.adLoading = false;});
      };
      $scope.showStatus = function (dataSearch) {
        var selected = [];
        if (dataSearch.status) {
          selected = $filter('filter')($scope.statuses, {value: dataSearch.status});
        }
        return selected.length ? selected[0].text : 'Not set';
      };
      $scope.saveUser = function (data, id) {


        vm.getItems();

        //$scope.user not updated yet
        angular.extend(data, {id: id});
        // return $http.post('/saveUser', data);
        return true;
      };
      // remove user
      $scope.removeUser = function (index) {
        $scope.dataSearch.splice(index, 1);
        vm.getItems();
      };
      // add user
      $scope.addUser = function () {
        $scope.inserted = {
          id: $scope.dataSearch.length + 1,
          name: '',
          status: null,
          type: {type: "text"},
          group: null
        };
        $scope.dataSearch.push($scope.inserted);
      };


    }
})();
