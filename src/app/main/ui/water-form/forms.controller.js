(function ()
{
  'use strict';

  angular
    .module('app.ui.forms.water').factory('waterStorage', function () {
    var STORAGE_ID = 'waterForm';

    return {
      get: function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');
      },

      put: function (todos) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
      }
    };
  });

  angular
    .module('app.ui.forms.water')
    .controller('WaterFormsController', FormsController);


  /** @ngInject */
  function FormsController(api, $scope, waterStorage, $stateParams, $mdDialog, $state, appConfig, FFSConstant)
  {
    var vm = this;

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
    vm.selectYesNoDoNotKnowAndNone      = FFSConstant.selectYesNoDoNotKnowAndNone;




  vm.url = appConfig.url;
    vm.sendName = "Send Data";
    vm.isLoading = false;
    vm.waterForm = {};
    vm.isEdit = false;
    vm.id = $stateParams.id;
    vm.ReportOptions = true; //change this


    vm.clearCache = function (ev) {

      waterStorage.put({});
      vm.waterForm = angular.copy({});

      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('body')))
          .clickOutsideToClose(true)
          .title('Message')
          .textContent('Cache has been reset!')
          .ariaLabel('Alert Dialog Demo')
          .ok('Thank you!')
          .targetEvent(ev)
      );

    };

    function loadData() {
      api.ffs.waterById.get({'id': $stateParams.id},

        // Success
        function (response)
        {
          vm.waterForm    = response.data;
          vm.canReview     = response.canReview;
          vm.canReviewApprove     = response.canReviewApprove;
          vm.canReviewComment     = response.canReviewComment;
          vm.canReviewRequire     = response.canReviewRequire;
          vm.reviewComment = response.reviewComment;
          vm.waterForm.DateOfSiteVisit = new Date(response.data.DateOfSiteVisit);
        },

        // Error
        function (response)
        {
          console.error(response);
        }
      );
    }

    if (vm.id){
      vm.isEdit = true;
      vm.sendName = "Update Data";
      loadData();

    }else{

      var waterDataTemp = waterStorage.get();
      if(waterDataTemp.DateOfSiteVisit){
        waterDataTemp.DateOfSiteVisit = new Date(waterDataTemp.DateOfSiteVisit);
      }

      vm.waterForm = angular.copy(waterDataTemp);
      $scope.$watch('vm.waterForm', function (newVal, oldVal) {
        waterStorage.put(vm.waterForm);
      }, true);

    }


    vm.sendForm = sendForm;
    function sendForm(ev) {
      vm.isLoading = true;
      var submitData = angular.copy(vm.waterForm);

      if(submitData.DateOfSiteVisit){
        submitData.DateOfSiteVisit = moment(vm.waterForm.DateOfSiteVisit).format('Y-MM-DD');
      }


      api.ffs.water.save(submitData,

        // Success
        function (response)
        {
          vm.isLoading = false;
          vm.message = "Your data has been saved successfully!";
          vm.isLoading = false;


          if(response.status === 'success'){
            waterStorage.put({});
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
            // $state.go('app.ui_forms-water.details', {id: response.id});
            $state.go('app.dashboards_project');

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

    //COR
    vm.COROptions = function (event, status) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'ReportOptionsController',
        controllerAs: 'ctrl',
        focusOnOpen: false,
        targetEvent: event,
        locals: { items: {id: vm.id, status: status, form: 'Water' }},
        templateUrl: 'app/main/ui/shared/model/COR-dialog.html',
      }).then(vm.test);
    };


  }
})();