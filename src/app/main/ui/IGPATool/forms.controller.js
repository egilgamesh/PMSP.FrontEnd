(function ()
{
    'use strict';



  angular
    .module('app.ui.forms.IGPATool').factory('IGPAToolStorage', function () {
    var STORAGE_ID = 'IGPAToolStorage';

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
        .module('app.ui.forms.IGPATool')
        .controller('IGPAToolFormsController', FormsController);


  /** @ngInject */
  function FormsController(api, $scope, IGPAToolStorage, $stateParams, $mdDialog, $state, appConfig)
  {
    var vm = this;


    vm.provinces = [
      {name: 'Anbar',           children: ['Ana', 'Haditha', 'Heet', 'Al-Rutba', 'Al-Kaim', 'Ramadi', 'Falluja']},
      {name: 'Babil',           children: ['Al-Mahawil', 'Hashimiya', 'Hilla', 'Al-Musayab']},
      {name: 'Baghdad',         children: ['Tarmia', 'Al Resafa', 'Mahmoudiya', 'Madain', 'Karkh', 'Taji', 'Abu Ghraib', 'Adhamiya']},
      {name: 'Basrah',          children: ['Al-Midaina', 'Al-Qurna', 'Al-Zubair', 'Shatt Al-Arab', 'Basrah', 'Abu Al-Khaseeb', 'Fao']},
      {name: 'Dahuk',           children: ['Sumel', 'Dahuk', 'Amedi']},
      {name: 'Diyala',          children: ['Khanaqin', 'Kifri', 'Baladrooz', 'Al-Muqdadiya', 'Al-Khalis', 'Baquba']},
      {name: 'Erbil',           children: ['Erbil', 'Makhmur', 'Mergasur', 'Soran', 'Choman', 'Shaqlawa', 'Koisnjaq']},
      {name: 'Kerbala',         children: ['Ain Al-Tamur', 'Kerbala', 'Al-Hindiya']},
      {name: 'Missan',          children: ['Ali Al-Gharbi', 'Amara', 'Al-Mejar Al-Kabi', 'Al-Maimouna', 'Al-Kahla', 'Qalat Saleh']},
      {name: 'Muthanna',        children: ['Al-Salman', 'Al-Rumaitha', 'Al-Samawa', 'Al-Khidhir']},
      {name: 'Najaf',           children: ['Najaf', 'Kufa', 'Al-Manathera', 'Magazines', 'Medicine']},
      {name: 'Ninewa',          children: ['Al-Shikhan', 'Tilkaif', 'Shekhan', 'Al-Hamdaniya', 'Mosul', 'Telafar', 'Al-Baaj', 'Sinjar', 'Hatra', 'Akre']},
      {name: 'Qadissiya',       children: ['Afaq', 'Diwaniya', 'Al-Shamiya']},
      {name: 'Salah al-Din',    children: ['Al-Shirqat', 'Baiji', 'Al-Daur', 'Tooz', 'Balad', 'Tikrit', 'Samarra']},
      {name: 'Sulaymaniyah',    children: ['Kalar', 'Chamchamal', 'Pshdar', 'Rania', 'Dokan', 'Sulaymaniya', 'Sharbazher', 'Halabja', 'Penjwin', 'Darbandihkan']},
      {name: 'Tameem',          children: ['Kirkuk', 'Al-Hawiga', 'Daquq']},
      {name: 'Thi-Qar',         children: ['l-Rifai', 'Nassriya', 'Suq Al-Shoyokh', 'Al-Chibayish', 'Al-Shatra']},
      {name: 'Wassit',          children: ['Al-Suwaira', 'Badra', 'Kut', 'Al-Namaniya', 'Al-Hai']},

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

      IGPAToolStorage.put({});
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
      api.IGPA.ByID.get({'id': $stateParams.id},

        // Success
        function (response)
        {
          vm.form                 = response.data;
          vm.m_2c_participants    = response.data.m_2c_participants;
          vm.m_3c_participants    = response.data.m_3c_participants;

          if (response.data.m_2c_participants === null || response.data.m_2c_participants === "")  {
            vm.m_2c_participants = { contacts: [], selected: {}};
            $scope.m_2c_participants = { contacts: [], selected: {}};
          }

          $scope.m_2c_participants    = response.data.m_2c_participants;
          $scope.m_3c_participants    = response.data.m_3c_participants;

          vm.canReview            = response.canReview;
          vm.canReviewApprove     = response.canReviewApprove;
          vm.canReviewComment     = response.canReviewComment;
          vm.canReviewRequire     = response.canReviewRequire;
          vm.reviewComment        = response.reviewComment;

          if (response.editAllow === "yes") {
            vm.editAllow = true;
          } else {
            vm.editAllow = false;
          }
          // vm.form.DateOfSiteVisit = new Date(response.data.DateOfSiteVisit);

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
      var DataTemp = IGPAToolStorage.get();
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
        IGPAToolStorage.put(vm.form);
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



      submitData.m_2c_participants    = $scope.m_2c_participants;
      submitData.m_3c_participants    = $scope.m_3c_participants;


      api.IGPA.General.save(submitData,

        // Success
        function (response)
        {
          vm.isLoading = false;
          vm.message = "Your data has been saved successfully!";
          vm.isLoading = false;


          if(response.status === 'success'){
            IGPAToolStorage.put({});
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
        locals: { items: {id: vm.id, status: status, form: 'IGPA' }},
        templateUrl: 'app/main/ui/shared/model/COR-dialog.html',
      }).then(vm.test);
    };


    //m_2c_participants
    $scope.m_2c_participants = {
      contacts: [],
      selected: {}
    };

    // gets the template to ng-include for a table row / item
    $scope.getTemplate_2c = function (contact) {
      if (contact.id === $scope.m_2c_participants.selected.id) return 'edit';
      else return 'display';
    };

    $scope.editContact_2c = function (contact) {
      $scope.m_2c_participants.selected = angular.copy(contact);
    };

    $scope.add_2c = function () {

      $scope.m_2c_participants.contacts.push({id: $scope.m_2c_participants.contacts.length + 1, section: '', level: '', concern: ''});
    };

    $scope.saveContact_2c = function (idx) {
      console.log("Saving contact");
      $scope.m_2c_participants.contacts[idx] = angular.copy($scope.m_2c_participants.selected);
      $scope.reset_2c();
    };

    $scope.reset_2c = function () {
      $scope.m_2c_participants.selected = {};
    };

    $scope.delete_2c = function (index) {
      $scope.m_2c_participants.contacts.splice(index, 1);
    };

    //m_3c_participants

    $scope.m_3c_participants = {
      contacts: [],
      selected: {}
    };

    // gets the template to ng-include for a table row / item
    $scope.getTemplate_c3 = function (contact) {
      if (contact.id === $scope.m_3c_participants.selected.id) return 'edit';
      else return 'display';
    };

    $scope.editContact_c3 = function (contact) {
      $scope.m_3c_participants.selected = angular.copy(contact);
    };

    $scope.add_c3 = function () {
      $scope.m_3c_participants.contacts.push({id: $scope.m_3c_participants.contacts.length + 1, section: '', level: '', concern: ''});
    };

    $scope.saveContact_c3 = function (idx) {
      console.log("Saving contact");
      $scope.m_3c_participants.contacts[idx] = angular.copy($scope.m_3c_participants.selected);
      $scope.reset_c3();
    };

    $scope.reset_c3 = function () {
      $scope.m_3c_participants.selected = {};
    };

    $scope.delete_c3 = function (index) {
      $scope.m_3c_participants.contacts.splice(index, 1);
    };




  }
})();
