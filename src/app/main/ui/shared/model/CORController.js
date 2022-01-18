(function ()
{
  'use strict';

  angular.module('fuse')
    .controller('ReportOptionsController', addItemController);

  /** @ngInject */
  function addItemController(items, $mdDialog, $scope, api, $state) {

    this.cancel = $mdDialog.cancel;
    $scope.error = '';


    $scope.cation = '';
    $scope.cationInfo = '';
    $scope.titleOfMSG = '';
    $scope.isComment = false;


    if(items.status === 'accepted') {

      $scope.cation = 'Review';
      $scope.cationInfo = 'Do you want to mark this report as Reviewed?';
    }
    if(items.status === 'commented') {
      $scope.isComment = true;
      $scope.cation = 'Comments';
      $scope.cationInfo = 'Do you want to send a Comment to this report?';
    }
    if(items.status === 'duplicated') {
      $scope.isComment = true;
      $scope.cation = 'Duplicate';
      $scope.cationInfo = 'Do you want to mark this report as Duplicated?';
    }
    if(items.status === 'infoReq') {
      $scope.isComment = true;
      $scope.cation = 'Request more information';
      $scope.cationInfo = 'Do you want get more information on this report?';
      $scope.titleOfMSG = 'You will get an email notification from the system when the report is updated';
    }


    function success(status) {
      if (status.status == 'error') {
        $scope.error = status.msg;
        return null;
      }
      $mdDialog.hide(status);
    }

    $scope.submit = function (comments, ev) {
      $scope.error = '';
      if(items.status !== 'accepted') {
        if(!comments){
          $scope.error = 'Comments is required';
          return;
        }

      }
      $scope.isLoading = true;

      api.review.report.save({id: items.id, status: items.status, comments: comments, form: items.form},
        // Success
        function (response)
        {

          if(response.status === 'success'){
            // $state.go('app.dashboards_project');
            $mdDialog.hide(status);


            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('body')))
                .clickOutsideToClose(true)
                .title('Message')
                .textContent(response.msg)
                .ariaLabel('Title')
                .ok('Ok')
                .targetEvent(ev)
            );

          }else{
            $scope.error = response.status.msg;
          }


        },
        // Error
        function (response)
        {
          $scope.isLoading = false;
          $scope.error = 'Some error occurred!';
        }
      );

    };


  }

})();

