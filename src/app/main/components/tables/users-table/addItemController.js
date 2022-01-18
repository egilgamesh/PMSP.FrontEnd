(function () {
  'use strict';

  angular.module('app.components.tables.users')
    .controller('AddUserItemController', addItemController);

  /** @ngInject */
  function addItemController($q, items, $mdDialog, $UserAPI, $scope) {

    this.cancel = $mdDialog.cancel;
    $scope.error = '';


    $scope.userTypes = [
      {value: 'IFM', name: 'IFM'},
      {value: 'admin', name: 'admin'},
      {value: 'M&E', name: 'M&E'},
      {value: 'review', name: 'Reviewer'},
      {value: 'Full Access', name: 'Full Access'},
      {value: 'COR', name: 'A/COR'},
      {value: 'FFS View', name: 'FFS View'},
      {value: 'FFS Comment', name: 'FFS Comment'},
      {value: 'FFS Full Access', name: 'FFS Full Access'},

      {value: 'IGPA Review', name: 'IGPA Review'},
      {value: 'IGPA Full Access', name: 'IGPA Full Access'},
      {value: 'IGPA COR', name: 'IGPA COR'},
      {value: 'IGPA View', name: 'IGPA View'},
      {value: 'IGPA Comment', name: 'IGPA Comment'},
      {value: 'IGPA Full Access', name: 'IGPA Full Access'},

      {value: 'View Approved Report Only', name: 'View Approved Report Only'},

    ];

    function success(status) {
      if (status.status == 'error') {
        $scope.error = status.msg;
        return null;
      }
      $mdDialog.hide(status);
    }

    this.addItem = function () {
      $scope.item.form.$setSubmitted();

      if ($scope.item.form.$valid) {
        $scope.error = '';
        $UserAPI.items.save({objectItem: $scope.objectItem}, success, error);
      }

      function error(error) {
        console.log(error);
      }

    };

    function onComplete() {

    }

    function getSuccess(objectItem) {
      $scope.objectItem = objectItem;
      $scope.objectItem.password = '**********';
      $scope.objectItem.password2 = '**********';
    }


    function getData(objectItem, index) {
      $scope.promise = $UserAPI.items.get({id: objectItem.id}, getSuccess).$promise;
    }

    if (items.length) {
      $q.all(items.forEach(getData)).then(onComplete);
    }
  }

})();

