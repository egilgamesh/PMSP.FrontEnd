(function () {
  'use strict';

  // angular
  //   .module('app.ui.forms.HAI').config(function($mdDateLocaleProvider) {
  //   $mdDateLocaleProvider.formatDate = function(date) {
  //     return moment(date).format('YY-MM-DD');
  //   };
  // });

  angular
    .module('app.ui.forms.HAI')
    .controller('HAIFormsController', FormsController);

  /** @ngInject */
  function FormsController(api, $scope, NewFFSGeneralStorage, $stateParams, $mdDialog, $state, appConfig, $http) {
    var vm = this;

    vm.url = appConfig.url;
    vm.sendName = "Send Data";
    vm.isLoading = false;
    vm.form = {};
    vm.isEdit = false;
    vm.id = $stateParams.id;
    vm.ReportOptions = true; //change this
    vm.editAllow = false;

    vm.pageInitLoading= true;

    loadData();
    function loadData() {
      api.HAI.ByID.get({'id': $stateParams.id},

        // Success
        function (response)
        {
          vm.form                 = JSON.parse(response.data.form_json);
          vm.formAll              = response.data;
          vm.canReview            = response.canReview;
          vm.canReviewApprove     = response.canReviewApprove;
          vm.canReviewComment     = response.canReviewComment;
          vm.canReviewRequire     = response.canReviewRequire;
          vm.reviewComment        = response.reviewComment;

          vm.isEdit = true;
          vm.pageInitLoading= false;


          if (response.editAllow === "yes") {
            vm.editAllow = true;
          } else {
            vm.editAllow = false;
          }
        },

        // Error
        function (response)
        {
          vm.pageInitLoading = false;
          console.error(response);
        }
      );
    }


    vm.editAllow = true;

    vm.showTheField = function(fieldItem, allFields) {


      var isShow = true;

      if (fieldItem.IsSkipe === 'No') {
        return true;
      }

      angular.forEach(allFields, function(obj, values){

        if (fieldItem.SkipName === obj.Name) {
          if (fieldItem.SkipValue === obj.Value) {

            isShow = fieldItem.SkipType === 'Show';

          }  else {

            isShow = fieldItem.SkipType === 'Hide';
          }
        }
      });


      return isShow;
    };


    vm.isModuleIsActive = function(fields) {


      var isShow = false;

      var fieldRefine = fields['Components'][0]['Fields'];

      angular.forEach(fieldRefine, function(obj, values){

        if (obj.ValueMulti === undefined) {
          if (obj.Value && obj.Value !== "") {
            isShow = true;
          }
        } else {
          if (obj.ValueMulti && obj.ValueMulti.length > 0) {
            isShow = true;
          }
        }

      });

      return isShow;

    };



    //COR
    vm.COROptions = function (event, status) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'ReportOptionsController',
        controllerAs: 'ctrl',
        focusOnOpen: false,
        targetEvent: event,
        locals: { items: {id: vm.id, status: status, form: 'HAI' }},
        templateUrl: 'app/main/ui/shared/model/COR-dialog.html',
      }).then(vm.test);
    };

    vm.saveUSAIDInformation = function (data) {

      $http({
        url: appConfig.apiUrl + 'saveUSAIDInformation',
        method: "POST",
        data: { data: data, id: vm.id }
      })
        .then(function(response) {
            if (response.data.status === "success") {

              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('body')))
                  .clickOutsideToClose(true)
                  .title('Message')
                  .textContent(response.data.message)
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Got it!')
                  .targetEvent(this)
              );

            } else {

              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('body')))
                  .clickOutsideToClose(true)
                  .title('Message')
                  .textContent(response.data.message)
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Got it!')
                  .targetEvent(this)
              );

            }
          },
          function(response) { // optional
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('body')))
                .clickOutsideToClose(true)
                .title('Message')
                .textContent("Error")
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(this)
            );
          });
    };


    //save the data:
    vm.sendForm = sendForm;
    function sendForm(ev) {

      vm.isLoading = true;

      var data = {
        form: JSON.stringify(vm.form),
        formAll: vm.formAll,
        id: vm.formAll.id,
      };

      api.HAI.General.save(data,

        // Success
        function (response)
        {
          vm.isLoading = false;
          vm.message = "Your data has been saved successfully!";
          vm.isLoading = false;


          if(response.status === 'success'){
            NewFFSGeneralStorage.put({});
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
            $state.go('app.dashboards_home.home');

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
            // vm.message = "Error";

          }

        },

        // Error
        function (response)
        {
          vm.isLoading = false;
          vm.isLoading = false;
          vm.message = "Your data has not been saved successfully!";
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('body')))
              .clickOutsideToClose(true)
              .title('Message')
              .textContent(response.msg)
              .ariaLabel(response.message)
              .ok('Got it!')
              .targetEvent(ev)
          );
          console.error(response.message);
        }
      );
    }
  }
})();
