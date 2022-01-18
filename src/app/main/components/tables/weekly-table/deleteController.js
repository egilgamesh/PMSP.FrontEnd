(function () {
  'use strict';

  angular.module('app.components.tables.weekly').controller('DelWeeklyController', deleteController);

  /** @ngInject */
  function deleteController(items, $mdDialog, $WeeklyAPI, $scope, $q) {

    this.cancel = $mdDialog.cancel;
    function del(user, index) {
      var deferred = $WeeklyAPI.items.remove({id: user.id});

      deferred.$promise.then(function () {
        items.splice(index, 1);
      });

      return deferred.$promise;
    }

    function onComplete() {
      $mdDialog.hide();
    }

    function error() {
      $scope.error = 'The secret is not correct!';
    }

    function success() {
      $q.all(items.forEach(del)).then(onComplete);
    }

    this.authorizeUser = function () {
      if ($scope.authorize.secret == 'business') {
        success();
      } else {
        error();
      }

    };

  }

})();
