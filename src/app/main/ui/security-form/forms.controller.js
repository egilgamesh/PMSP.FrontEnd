(function ()
{
    'use strict';

    angular
        .module('app.ui.forms.security')
        .controller('SecurityFormsController', FormsController);

    /** @ngInject */
    function FormsController(api, $stateParams, $mdDialog, $state)
    {
        var vm = this;


if ($stateParams.id){
  api.securityTracker.getById.get({'id': $stateParams.id},

    // Success
    function (response)
    {
      vm.basicForm = response.data;
      vm.basicForm.departedDate = new Date(response.data.departedDate);
      vm.basicForm.returnDate = new Date(response.data.returnDate);

    },

    // Error
    function (response)
    {
      console.error(response);
    }
  );
}




        vm.basicForm = {};
        vm.formWizard = {};
        vm.isLoading = false;


      vm.states  = [


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
         'Erbil'


      ];

      vm.submit = function(ev){
        vm.isLoading = true;

        var data = angular.copy(vm.basicForm);

        data.departedDate = moment.utc(vm.basicForm.departedDate).format('Y-MM-DD');
        data.returnDate = moment.utc(vm.basicForm.returnDate).format('Y-MM-DD');
        data.id = $stateParams.id;


        api.securityTracker.list.save(data,

          // Success
          function (response)
          {
            vm.isLoading = false;
            vm.basicForm.id = response.id;
            $state.go('app.ui_forms-security.details', {id: vm.basicForm.id});
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

              vm.message = "Your data has been saved successfully!";

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
            vm.message = "Your data has not been saved successfully!";

          }
        );
      }


    }
})();
