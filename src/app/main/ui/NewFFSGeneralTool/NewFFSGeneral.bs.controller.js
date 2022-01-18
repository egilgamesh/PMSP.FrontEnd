(function ()
{
  'use strict';


  angular
    .module('app.ui.forms.NewFFSGeneral')
    .controller('NewFFSGeneralBSFormsController', FormsController);


  /** @ngInject */
  function FormsController(api, $stateParams, $mdDialog, $state, appConfig, FFSConstant)
  {
    var vm = this;
    vm.url = appConfig.url;
    vm.sendName = "Send Data";
    vm.isLoading = false;
    vm.form = {};
    vm.isEdit = false;
    vm.editAllow = false;




    if ($stateParams.type === 'edit'){
      vm.isEdit = true;
      vm.sendName = "Update Data";
      api.ffs.NewFFSGeneralBSById.get({'id': $stateParams.formId},

        // Success
        function (response)
        {
          vm.form = response.data;


          if (response.editAllow === "yes") {
            vm.editAllow = true;
          } else {
            vm.editAllow = false;
          }

        },

        // Error
        function (response)
        {
          console.error(response);
        }
      );

    } else {
      vm.editAllow = true;
    }



    // Methods
    vm.sendForm = sendForm;


    function sendForm(ev) {
      vm.isLoading = true;
      var submitData = angular.copy(vm.form);
      submitData.id = $stateParams.formId;
      submitData.master_id = $stateParams.id;


      api.ffs.NewFFSGeneralBS.save(submitData,

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

            vm.message = "Your data has been saved successfully!";
            // $state.go('app.ui_forms-health.details', {id: response.id});

            $state.go('app.ui_forms-NewFFSGeneral.details', {id: $stateParams.id });

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
