(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.reset-password')
        .controller('ResetPasswordController', ResetPasswordController);

    /** @ngInject */
    function ResetPasswordController($mdDialog, api, $state)
    {

      var vm = this;
      vm.form = {};
      vm.isLoading = false;

      vm.submit = function (ev) {
        if(vm.form.passwordConfirm !== vm.form.password){

          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('body')))
              .clickOutsideToClose(true)
              .title('Message')
              .textContent('The password not matches!')
              .ariaLabel('Alert Dialog Demo')
              .ok('Ok')
              .targetEvent(ev)
          );

          return null;
        }

        vm.isLoading = true;

        api.password.reset.save(vm.form,

          // Success
          function (response)
          {
            vm.isLoading = false;
            vm.message = "Your data has been saved successfully!";
            vm.isLoading = false;


            if(response.status === 'success'){
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('body')))
                  .clickOutsideToClose(true)
                  .title('Message')
                  .textContent(response.msg)
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Got it!')
                  .targetEvent(ev)
              );


              localStorage.removeItem('IFMApplication_token');
              localStorage.removeItem('UserName');
              $state.go('app.pages_auth_login');

            }else{

              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('body')))
                  .clickOutsideToClose(true)
                  .title('Message')
                  .textContent(response.msg)
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Got it!')
                  .targetEvent(ev)
              );

              console.error(response);
              vm.message = "Error";

            }

          },

          // Error
          function (response)
          {
            vm.isLoading = false;
            vm.isLoading = false;
            vm.message = "Your data has not been saved successfully!";
            console.error(response.message);
          }
        );
      }


      }


})();
