(function () {
  'use strict';

  // angular.module('app.components.tables.newFFSToolsGeneral').run(['editableOptions', 'editableThemes', function(editableOptions, editableThemes) {
  //   editableThemes.bs3.inputClass = 'input-sm';
  //   editableThemes.bs3.buttonsClass = 'btn-sm';
  //   editableOptions.theme = 'bs3';
  // }]);

  angular
    .module('app.components.tables.newFFSToolsGeneral').factory('NewFFSGeneralTable', function () {
    var STORAGE_ID = 'NewFFSGeneralTable';

    return {
      get: function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');
      },

      put: function (todos) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
      }
    };
  });

  angular.module('app.components.tables.newFFSToolsGeneral').run(function (editableOptions, editableThemes) {
    editableThemes['angular-material'] = {
      formTpl: '<form class="editable-wrap"></form>',
      noformTpl: '<span class="editable-wrap"></span>',
      controlsTpl: '<md-input-container class="editable-controls" ng-class="{\'md-input-invalid\': $error}"></md-input-container>',
      inputTpl: '',
      errorTpl: '<div ng-messages="{message: $error}"><div class="editable-error" ng-message="message">{{$error}}</div></div>',
      buttonsTpl: '<span class="editable-buttons"></span>',
      submitTpl: '<md-button type="submit" class="md-primary">save</md-button>',
      cancelTpl: '<md-button type="button" class="md-warn" ng-click="$form.$cancel()">cancel</md-button>'
    };

    editableOptions.theme = 'angular-material';
  });


  angular.module('app.components.tables.newFFSToolsGeneral')
    .controller('newFFSToolsGeneralController', MainController);

  /** @ngInject */
  function MainController($http, $scope, $WaterFormAPI, $NewFFSSearchFormAPI, $mdDialog, appConfig, $state, $stateParams, $timeout, $q, $log, $filter, NewFFSGeneralTable) {
    var folderPath = 'app/main/components/tables/new-ffs-tools-general-table/';
    var vm = this;


    vm.url = appConfig.url;

    $scope.dataSearch = [];

    var bookmark;
    vm.selected = [];

    $http.get(appConfig.apiUrl + 'newFFSFiltersItems').then(function (response) {
      vm.ifms = response.data.ifm;
      vm.province = response.data.province;
      vm.activity = response.data.activity;
    }, function (response) {
      error(response);
    });


    vm.query = {
      filter: '',
      limit: '10',
      order: 'id',
      page: 2
    };

    vm.filter = {
      options: {
        debounce: 500
      },
    };



    if (NewFFSGeneralTable.get().query) {
      vm.query = NewFFSGeneralTable.get().query;
    }

    function success(items) {
      vm.selected = [];
      vm.items = items;
    }

    vm.addItem = function (event) {
      // console.log(event);
      // $state.go('app.ui_forms-water');
    };

    vm.delete = function (event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'DelWaterAPIController',
        controllerAs: 'ctrl',
        focusOnOpen: false,
        targetEvent: event,
        locals: {items: vm.selected},
        templateUrl: folderPath + 'delete-dialog.html',
      }).then(vm.getItems);
    };


    vm.getItems = function () {

      vm.query.ifmFilter = vm.ifmFilter;
      vm.query.provinceFilter = vm.provinceFilter;
      vm.query.activityFilter = vm.activityFilter;
      vm.query.startDateFilter = vm.startDateFilter;
      vm.query.endDateFilter = vm.endDateFilter;
      vm.query.newSearch = {data: $scope.dataSearch};
      vm.query.informationType = $stateParams.type;
      NewFFSGeneralTable.put({query: vm.query});
      vm.promise = $WaterFormAPI.items.get(vm.query, success).$promise;
    };

    vm.changeValue = function () {
      vm.getItems();
    };


    if (NewFFSGeneralTable.get().query) {

      var query = NewFFSGeneralTable.get().query;

      vm.ifmFilter       = query.ifmFilter;
      vm.provinceFilter  = query.provinceFilter;
      vm.activityFilter  = query.activityFilter;
      vm.startDateFilter = query.startDateFilter;
      vm.endDateFilter   = query.endDateFilter;

    }

    // console.log(NewFFSGeneralTable.get().show);

    if (NewFFSGeneralTable.get().show) {
      vm.filter.show = true;
    }


    if (NewFFSGeneralTable.get().title) {
      vm.selectedItem = NewFFSGeneralTable.get().title;
    }


    vm.clear = function () {
      vm.ifmFilter       = '';
      vm.provinceFilter  = '';
      vm.activityFilter  = '';
      vm.startDateFilter = '';
      vm.endDateFilter   = '';
      vm.selectedItem = '';
      vm.query.titleLocation = '';
      vm.query.title = '';
      vm.getItems();
      NewFFSGeneralTable.put({});
    };

    vm.removeFilter = function () {

      vm.filter.show = false;
      vm.query.filter = '';
      vm.clear();

      if (vm.filter.form.$dirty) {
        vm.filter.form.$setPristine();
      }
    };

    $scope.$watch(function () {


      NewFFSGeneralTable.put({query: vm.query, show: vm.filter.show, title: vm.selectedItem});
      return vm.query.filter

    }, function (newValue, oldValue) {


      if (!oldValue) {
        bookmark = vm.query.page;
      }

      if (newValue !== oldValue) {
        vm.query.page = 1;
      }
      if (!newValue) {
        vm.query.page = bookmark;
      }
      vm.getItems();
    }, true);


    vm.simulateQuery = false;
    vm.isDisabled = false;
    // list of `state` value/display objects
    vm.states = loadAll();
    vm.querySearch = querySearch;
    vm.selectedItemChange = selectedItemChange;
    vm.searchTextChange = searchTextChange;
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

    }

    var posts = undefined;

    function querySearch(query) {


      var finalQuery = query;

      if (finalQuery === '') {
        finalQuery = "none";
      }


      // create deferred object using $q
      var deferred = $q.defer();

      // get posts form backend
      $http.get(appConfig.apiUrl + 'SearchNewFFSGeneralForm/' + finalQuery)
        .then(function (result) {
          // save fetched posts to the local variable
          posts = result.data;
          // resolve the deferred
          deferred.resolve(posts);
        }, function (error) {
          posts = error;
          deferred.reject(error);
        });

      // set the posts object to be a promise until result comeback
      posts = deferred.promise;

      return $q.when(posts);


    }

    vm.querySearchLocation = function querySearch(query) {


      var finalQuery = query;

      if (finalQuery === '') {
        finalQuery = "none";
      }


      // create deferred object using $q
      var deferred = $q.defer();

      // get posts form backend
      $http.get(appConfig.apiUrl + 'SearchNewFFSGeneralFormLocation/' + finalQuery)
        .then(function (result) {
          // save fetched posts to the local variable
          posts = result.data;
          // resolve the deferred
          deferred.resolve(posts);
        }, function (error) {
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

    vm.searchTextChangeLocation = function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    };

    function selectedItemChange(item) {

      try {
        vm.query.title = item.display;
      } catch (err) {
        vm.query.title = "";
      }
      vm.getItems();
    }

    vm.selectedItemChangeLocation = function selectedItemChange(item) {

      try {
        vm.query.titleLocation = item.display;
      } catch (err) {
        vm.query.titleLocation = "";
      }
      vm.getItems();
    };

    /**
     * Build `states` list of key/value pairs
     */


    function loadAll() {


      // create deferred object using $q
      var deferred = $q.defer();

      // get posts form backend
      $http.get(appConfig.apiUrl + 'newFFSFiltersItems')
        .then(function (result) {
          // save fetched posts to the local variable
          posts = result.data;
          // resolve the deferred
          deferred.resolve(posts);
        }, function (error) {
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


    //new search


    $scope.statuses = [
      {value: 1, text: 'status1'},
      {value: 2, text: 'status2'},
      {value: 3, text: 'status3'},
      {value: 4, text: 'status4'}
    ];


    $scope.searchItems = [];

    $scope.changeItem = function (data, id, index) {
      $scope.dataSearch[index].type = data;
    };

    $scope.loadGroups = function () {
      return $scope.searchItems.length ? null : $http.get(appConfig.apiUrl + 'getItemsForAdvanceSearch').then(function (data) {
        $scope.searchItems = data.data;
      }, function(error){});
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
