(function ()
{
  'use strict';

  angular.module('app.components.tables.weekly')
    .controller('AddWeeklyItemController', addItemController);

  /** @ngInject */
  function addItemController($q, items, $mdDialog, $WeeklyAPI, $scope) {

    this.cancel = $mdDialog.cancel;
    $scope.error = '';


    $scope.projects = [
      {name: 'GSP', value: 'GSP'},
      {name: 'FFS', value: 'FFS'},
      {name: 'SitRep', value: 'SitRep'},
      {name: 'Writing Report', value: 'WritingReport'},
    ];

    $scope.states  = [


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
      'Erbil',
      'NA'

    ];

    $scope.statuses = [
      {value: 'waiting', name: 'Waiting'},
      {value: 'canceled', name: 'Canceled'},
      {value: 'done', name: 'Done'}
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
        var submitData  = angular.copy($scope.objectItem);
        console.log($scope.objectItem.start_date);
        submitData.start_date = moment($scope.objectItem.start_date).format('Y-MM-DD');
        $WeeklyAPI.items.save({objectItem: submitData}, success, error);
      }

      function error(error) {
        console.log(error);
      }

    };

    function onComplete() {

    }

    function getSuccess(objectItem) {
      $scope.objectItem = objectItem;
      $scope.objectItem.start_date = new Date(objectItem.start_date);
    }


    function getData(objectItem, index) {
      $scope.promise = $WeeklyAPI.items.get({id: objectItem.id}, getSuccess).$promise;
    }

    if (items.length) {
      $q.all(items.forEach(getData)).then(onComplete);
    }
  }

})();

