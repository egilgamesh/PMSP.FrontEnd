(function ()
{
  'use strict';


  angular
    .module('app.ui.forms.municipality')
    .controller('MunicipalityBSRFormsController', FormsController);


  /** @ngInject */
  function FormsController(api, $stateParams, $mdDialog, $state, appConfig, FFSConstant)
  {
    var vm = this;
    vm.url = appConfig.url;
    vm.sendName = "Send Data";
    vm.isLoading = false;
    vm.municipalityForm = {};
    vm.isEdit = false;

    //Selected Items
    vm.selectTime                 = FFSConstant.selectTime;
    vm.selectEducation            = FFSConstant.selectEducation;
    vm.selectAge                  = FFSConstant.selectAge;
    vm.selectDateNewDoNotKnow     = FFSConstant.selectDateNewDoNotKnow;
    vm.selectDateAfterDoNotKnow   = FFSConstant.selectDateAfterDoNotKnow;
    vm.selectDateJanJunDoNotKnow  = FFSConstant.selectDateJanJunDoNotKnow;
    vm.selectYesNoDoNotKnow       = FFSConstant.selectYesNoDoNotKnow;
    vm.selectYesNoDoNo            = FFSConstant.selectYesNoDoNo;
    vm.selectPercentageDoNotKnow  = FFSConstant.selectPercentageDoNotKnow;
    vm.selectEstimateMonth        = FFSConstant.selectEstimateMonth;
    vm.selectSatisfactions        = FFSConstant.selectSatisfactions;
    vm.selectLessDoNotKnow        = FFSConstant.selectLessDoNotKnow;
    vm.selectPatients             = FFSConstant.selectLessDoNotKnow;
    vm.selectImpact               = FFSConstant.selectImpact;
    vm.selectInfluence            = FFSConstant.selectInfluence;
    vm.selectOneToFive            = FFSConstant.selectOneToFive;
    vm.selectWeeks                = FFSConstant.selectWeeks;
    vm.selectBigNumbers           = FFSConstant.selectBigNumbers;
    vm.selectLevelsAffected       = FFSConstant.selectLevelsAffected;
    vm.selectWellLevels           = FFSConstant.selectWellLevels;
    vm.selectYesNoNoComments      = FFSConstant.selectYesNoNoComments;


    if ($stateParams.type === 'edit'){
      vm.isEdit = true;
      vm.sendName = "Update Data";
      api.ffs.municipalityBSRById.get({'id': $stateParams.municipalityId},

        // Success
        function (response)
        {
          vm.municipalityForm = response.data;
        },

        // Error
        function (response)
        {
          console.error(response);
        }
      );

    }



    // Methods
    vm.sendForm = sendForm;


    function sendForm(ev) {
      vm.isLoading = true;
      var submitData = angular.copy(vm.municipalityForm);
      submitData.id = $stateParams.municipalityId;
      submitData.municipality_id = $stateParams.id;


      api.ffs.municipalityBSR.save(submitData,

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
            // $state.go('app.ui_forms-municipality.details', {id: response.id});

            $state.go('app.ui_forms-municipality.details', {id: $stateParams.id });

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
