(function ()
{
    'use strict';

    angular
        .module('app.pages.onlineSummaryReport')
        .controller('OnlineSummaryReport', OnlineSummaryReport);

    /** @ngInject */
    function OnlineSummaryReport(Timeline, About, PhotosVideos, $state, $http, $stateParams, appConfig, api, $mdDialog)
    {
        var vm = this;

        // Data
        vm.posts = Timeline.posts;
        vm.activities = Timeline.activities;
        vm.about = About.data;
        vm.photosVideos = PhotosVideos.data;

      function loadData() {
        api.ffs.NewFFSGeneralById.get({'id': $stateParams.id},

          // Success
          function (response)
          {

            vm.canReview            = response.canReview;
            vm.canReviewApprove     = response.canReviewApprove;
            vm.canReviewComment     = response.canReviewComment;
            vm.canReviewRequire     = response.canReviewRequire;
            vm.reviewComment = response.reviewComment;
            vm.showOnlineBuilder = response.showOnlineBuilder;
            vm.reportCode = response.code;
            vm.isUSAID = response.isUSAID;


          },

          // Error
          function (response)
          {
            console.error(response);
          }
        );
      }
      loadData();
      //COR
      vm.COROptions = function (event, status) {
        $mdDialog.show({
          clickOutsideToClose: true,
          controller: 'ReportOptionsController',
          controllerAs: 'ctrl',
          focusOnOpen: false,
          targetEvent: event,
          locals: { items: {id: $stateParams.id, status: status, form: 'New' }},
          templateUrl: 'app/main/ui/shared/model/COR-dialog.html',
        }).then(vm.test);
      };

      vm.summary = {};

      vm.url = appConfig.url;

      console.log("START");

      $http.get(appConfig.apiUrl + 'OnlineFFSSummaryReport/' + $stateParams.id).
      then(function(response) {
        console.log(response);

        vm.summary = response.data.summary;
        vm.ffs = response.data.ffs;

        // this callback will be called asynchronously
        // when the response is available
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });


    }

})();
