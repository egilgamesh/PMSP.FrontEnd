(function ()
{
    'use strict';


  angular
    .module('app.ui.forms.situation').factory('situationStorage', function () {
    var STORAGE_ID = 'situationForm';

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
        .module('app.ui.forms.situation')
        .controller('SituationFormsController', FormsController);


  /** @ngInject */
  function FormsController(api, $scope, situationStorage, $stateParams, $mdDialog, $state, appConfig)
  {
    var vm = this;
    vm.sendName = "Send Data";
    vm.isLoading = false;
    vm.baseLocation = appConfig.url;
    vm.canReview= 0;
    vm.id = $stateParams.id;

    vm.changeValues = [
      {value: 1, name: 'Improved'},
      {value: 2, name: 'Same'},
      {value: 3, name: 'Worsened'},
      {value: 4, name: 'First Time'}
    ];

    vm.sr = {};


    vm.clearCache = function (ev) {

      situationStorage.put({});
      vm.sr = angular.copy({});

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

    if (vm.id){


      vm.sendName = "Update Data";
      api.SRForm.getById.get({'id': $stateParams.id},

        // Success
        function (response)
        {
          vm.sr = response.data;
          vm.canReview = response.canReview;
          vm.canReviewApprove     = response.canReviewApprove;
          vm.canReviewComment     = response.canReviewComment;
          vm.canReviewRequire     = response.canReviewRequire;
          vm.reviewComment = response.reviewComment;
          vm.sr.PI_DateOfInterview = new Date(response.data.PI_DateOfInterview);
        },

        // Error
        function (response)
        {
          console.error(response);
        }
      );

    }else{

      var SRTemp = situationStorage.get();
      if(SRTemp.PI_DateOfInterview){
        SRTemp.PI_DateOfInterview = new Date(SRTemp.PI_DateOfInterview);
      }else{
        situationStorage.put({});
      }

      vm.sr = angular.copy(SRTemp);

      $scope.$watch('vm.sr', function (newVal, oldVal) {
        situationStorage.put(vm.sr);
      }, true);

    }




    // Methods
    vm.sendForm = sendForm;


    function sendForm(ev) {
      vm.isLoading = true;
      var submitData = angular.copy(vm.sr);

      if(submitData.PI_DateOfInterview){
        submitData.PI_DateOfInterview = moment(vm.sr.PI_DateOfInterview).format('Y-MM-DD');
      }


      api.SRForm.list.save(submitData,

        // Success
        function (response)
        {
          vm.isLoading = false;
          vm.message = "Your data has been saved successfully!";
          vm.isLoading = false;


          if(response.status === 'success'){
            situationStorage.put({});
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
            // $state.go('app.ui_forms-situation.details', {id: response.id});
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





    vm.reviewedMSG = '';
    vm.reviewChange = function() {
      api.CORReview.situationReport.save({id: $stateParams.id, status: vm.isReportReviewChecked},
        // Success
        function (response)
        {

          vm.reviewedMSG = response.msg;


        },
        // Error
        function (response)
        {
          vm.reviewedMSG = 'Some error occurred!';
        }
      );

    };

    //COR
    vm.COROptions = function (event, status) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'ReportOptionsController',
        controllerAs: 'ctrl',
        focusOnOpen: false,
        targetEvent: event,
        locals: { items: {id: vm.id, status: status, form: 'SitRep' }},
        templateUrl: 'app/main/ui/shared/model/COR-dialog.html',
      }).then(vm.getItems);
    };

  }
})();
