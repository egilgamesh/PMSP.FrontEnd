(function () {
  'use strict';

  angular.module('app.components.tables.USIP').controller('DelUSIPAPIController', deleteController);

  /** @ngInject */
  function deleteController(items, $mdDialog, $USIPFormAPI, $scope, $q) {

    this.cancel = $mdDialog.cancel;
    function del(user, index) {
      var deferred = $USIPFormAPI.items.remove({id: user.id});

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
      if ($scope.authorize.secret == 'yes') {
        success();
      } else {
        error();
      }

    };

  }

})();
