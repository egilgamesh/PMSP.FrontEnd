(function () {
  'use strict';

  angular.module('app.components.tables.weekly').controller('ReviewWeeklyController', deleteController);

  /** @ngInject */
  function deleteController(items, $mdDialog, $WeeklyAPI, $scope, $q, appConfig, $http) {

    this.cancel = $mdDialog.cancel;


    $scope.reviewTypes = [
      {value: "approved", name: 'Approve'},
      {value: "rejected", name: 'Reject'},
      {value: "postponed", name: 'Postpone'},
    ];

    function del(user, index) {
      var deferred =

        $http.post(appConfig.apiUrl + 'setReviewWeeklySummary', {data: $scope.objectItem, id: user.id}).then(function (response) {
        if(response.data.status === 'error'){
          error(response.data.msg);
        }else{

          onComplete();
        }

      }, function(response){
        error(response);
      });



    }

    function onComplete() {
      $mdDialog.hide();
    }

    function error(error) {
      $scope.error = error;
    }

    function success() {
      $q.all(items.forEach(del));
    }

    this.authorizeUser = function () {
      success();
    };

  }

})();
