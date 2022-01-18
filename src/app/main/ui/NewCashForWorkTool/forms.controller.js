(function ()
{
    'use strict';

  angular
    .module('app.ui.forms.NewCashForWork').factory('NewCashForWorkStorage', function () {
    var STORAGE_ID = 'NewCashForWork';

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
        .module('app.ui.forms.NewCashForWork')
        .controller('NewCashForWorkFormsController', FormsController);


  /** @ngInject */
  function FormsController(api, $scope, NewCashForWorkStorage, $stateParams, $mdDialog, $state, appConfig)
  {
    var vm = this;

    vm.provinces = [
      {name: 'Anbar',    children: ['Ana', 'Haditha', 'Heet', 'Al-Rutba', 'Al-Kaim', 'Ramadi', 'Falluja']},
      {name: 'Babil',    children: ['Al-Mahawil', 'Hashimiya', 'Hilla', 'Al-Musayab']},
      {name: 'Baghdad',  children: ['Tarmia', 'Al Resafa', 'Mahmoudiya', 'Madain', 'Karkh', 'Taji', 'Abu Ghraib', 'Adhamiya']},
      {name: 'Basrah',   children: ['Al-Midaina', 'Al-Qurna', 'Al-Zubair', 'Shatt Al-Arab', 'Basrah', 'Abu Al-Khaseeb', 'Fao']},
      {name: 'Dahuk',    children: ['Sumel', 'Dahuk', 'Amedi']},
      {name: 'Diyala',   children: ['Khanaqin', 'Kifri', 'Baladrooz', 'Al-Muqdadiya', 'Al-Khalis', 'Baquba']},
      {name: 'Erbil',    children: ['Erbil', 'Makhmur', 'Mergasur', 'Soran', 'Choman', 'Shaqlawa', 'Koisnjaq']},
      {name: 'Kerbala',  children: ['Ain Al-Tamur', 'Kerbala', 'Al-Hindiya']},
      {name: 'Missan',   children: ['Ali Al-Gharbi', 'Amara', 'Al-Mejar Al-Kabi', 'Al-Maimouna', 'Al-Kahla', 'Qalat Saleh']},
      {name: 'Muthanna', children: ['Al-Salman', 'Al-Rumaitha', 'Al-Samawa', 'Al-Khidhir']},
      {name: 'Najaf',    children: ['Najaf', 'Kufa', 'Al-Manathera', 'Magazines', 'Medicine']},
      {name: 'Ninewa',   children: ['Al-Shikhan', 'Tilkaif', 'Shekhan', 'Al-Hamdaniya', 'Mosul', 'Telafar', 'Al-Baaj', 'Sinjar', 'Hatra', 'Akre']},
      {name: 'Qadissiya',   children: ['Afaq', 'Diwaniya', 'Al-Shamiya']},
      {name: 'Salah al-Din',   children: ['Al-Shirqat', 'Baiji', 'Al-Daur', 'Tooz', 'Balad', 'Tikrit', 'Samarra']},
      {name: 'Sulaymaniyah',   children: ['Kalar', 'Chamchamal', 'Pshdar', 'Rania', 'Dokan', 'Sulaymaniya', 'Sharbazher', 'Halabja', 'Penjwin', 'Darbandihkan']},
      {name: 'Tameem',   children: ['Kirkuk', 'Al-Hawiga', 'Daquq']},
      {name: 'Thi-Qar',   children: ['l-Rifai', 'Nassriya', 'Suq Al-Shoyokh', 'Al-Chibayish', 'Al-Shatra']},
      {name: 'Wassit',   children: ['Al-Suwaira', 'Badra', 'Kut', 'Al-Namaniya', 'Al-Hai']},

    ];

    vm.districts = [];


    vm.viewOnMap = function(coords) {


      try {

        if (coords.split(",")[0] === undefined || coords.split(",")[1] === undefined) {
          alert("Error Coords, Please check your GSP Coordination");
          return;
        }



      } catch (err) {

        alert("Error Coords");
        return;

      }

      $mdDialog.show({
        controller: 'CheckReportOnMapDialogController',
        templateUrl: 'app/main/ui/NewFFSGeneralTool/checkReportOnMap.html',
        parent: angular.element(document.body),
        locals: { mapData: coords },
        clickOutsideToClose:true,
        fullscreen: false // Only for -xs, -sm breakpoints.
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };


    vm.districtUpdate = function() {
      angular.forEach(vm.provinces, function(obj, values){
        if (obj.name === vm.form.m1_3_province) {
          vm.districts = obj.children;
        }
      });

    };

    vm.url = appConfig.url;
    vm.sendName = "Send Data";
    vm.isLoading = false;
    vm.form = {};
    vm.isEdit = false;
    vm.id = $stateParams.id;
    vm.ReportOptions = true; //change this
    vm.editAllow = false;


    vm.clearCache = function (ev) {

      NewCashForWorkStorage.put({});
      vm.form = angular.copy({});

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
      api.ffs.NewCashForWorkById.get({'id': $stateParams.id},

        // Success
        function (response)
        {
          vm.form    = response.data;
          vm.canReview     = response.canReview;
          vm.canReviewApprove     = response.canReviewApprove;
          vm.canReviewComment     = response.canReviewComment;
          vm.canReviewRequire     = response.canReviewRequire;
          vm.reviewComment = response.reviewComment;
          // vm.form.DateOfSiteVisit = new Date(response.data.DateOfSiteVisit);

          if (response.editAllow === "yes") {
            vm.editAllow = true;
          } else {
            vm.editAllow = false;
          }

          angular.forEach(vm.provinces, function(obj, values){
            if (obj.name === vm.form.m1_3_province) {
              vm.districts = obj.children;
            }
          });

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
      vm.editAllow = true;
      var DataTemp = NewCashForWorkStorage.get();
      if(DataTemp.DateOfSiteVisit){
        DataTemp.DateOfSiteVisit = new Date(DataTemp.DateOfSiteVisit);
      }

      vm.form = angular.copy(DataTemp);
      angular.forEach(vm.provinces, function(obj, values){
        if (obj.name === vm.form.m1_3_province) {
          vm.districts = obj.children;
        }
      });
      $scope.$watch('vm.form', function (newVal, oldVal) {
        NewCashForWorkStorage.put(vm.form);
      }, true);

    }


    vm.sendForm = sendForm;
    function sendForm(ev) {
      vm.isLoading = true;
      var submitData = angular.copy(vm.form);

      if(submitData.m1_8){
        submitData.m1_8 = moment(vm.form.m1_8).format('Y-MM-DD');
      }
      if(submitData.m5_2a){
        submitData.m5_2a = moment(vm.form.m5_2a).format('Y-MM-DD');
      }
      if(submitData.m5_2b){
        submitData.m5_2b = moment(vm.form.m5_2b).format('Y-MM-DD');
      }

      if(submitData.m5_3c){
        submitData.m5_3c = moment(vm.form.m5_3c).format('Y-MM-DD');
      }
      if(submitData.m5_3e){
        submitData.m5_3e = moment(vm.form.m5_3e).format('Y-MM-DD');
      }
      if(submitData.m5_3f){
        submitData.m5_3f = moment(vm.form.m5_3f).format('Y-MM-DD');
      }


      api.ffs.NewCashForWork.save(submitData,

        // Success
        function (response)
        {
          vm.isLoading = false;
          vm.message = "Your data has been saved successfully!";
          vm.isLoading = false;


          if(response.status === 'success'){
            NewCashForWorkStorage.put({});
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
        locals: { items: {id: vm.id, status: status, form: 'NewCashForWork' }},
        templateUrl: 'app/main/ui/shared/model/COR-dialog.html',
      }).then(vm.test);
    };


  }
})();
