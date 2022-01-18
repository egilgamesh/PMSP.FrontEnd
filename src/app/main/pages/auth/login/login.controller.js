(function () {
  'use strict';

  angular
    .module('app.pages.auth.login')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($auth, $state, $location, $window) {


    var vm = this;
    vm.MSGText = 'LOG IN';
    vm.isLoading = false;
    vm.login = login;
    vm.errorMsg = '';
    function login() {
      vm.isLoading = true;
      vm.errorMsg = '';
      vm.MSGText = 'Loading...';
      $auth.login(vm.form).then(function (response) {
        vm.isLoading = false;
        vm.MSGText = 'LOG IN';
        if (response.data.status === 'success') {
          localStorage.setItem('UserName', response.data.name);
          localStorage.setItem('UserType', response.data.type);



          if ($location.search().url) {
            $window.location.href = $location.search().url;
          } else {

          }
          $state.go('app.dashboards_home.home');

          return null;
        } else {
          if (response.data.msg) {
            vm.errorMsg = response.data.msg;
          } else {
            vm.errorMsg = response.data;
            vm.isLoading = false;
            vm.MSGText = 'LOG IN';
            vm.errorMsg = 'lockout';
            return null;
          }
        }
      }, function (error) {
        vm.errorMsg = error.data;
        vm.isLoading = false;
        vm.MSGText = 'LOG IN';
      });
    }
  }
})();
(function () {
  'use strict';

})();
