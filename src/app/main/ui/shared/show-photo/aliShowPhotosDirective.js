(function ()
{
  'use strict';
  angular.module('fuse').directive('aliShowPhotos', [function() {
    return {
      restrict: 'EA',
      scope: {
        filterBy: '=',
        formName: '='
      },
      templateUrl: 'app/main/ui/shared/show-photo/show.photos.html',
      controller: function($scope, api, FileUploader, appConfig, $stateParams, $location, $mdDialog){

        $scope.isLoading = true;

        // inside your app controller
        $scope.images = [
          {
            id : 1,
            title : 'This is <b>amazing photo</b> of <i>nature</i>',
            alt : 'amazing nature photo',
            thumbUrl : 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793__340.jpg',
            url : 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793_960_720.jpg',
            extUrl : 'http://mywebsitecpm/photo/1453793'
          },
          {
            id : 2,
            url : 'https://pixabay.com/static/uploads/photo/2016/06/10/22/25/ortler-1449018_960_720.jpg',
            deletable : true,
          },
          {
            id : 3,
            thumbUrl : 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701__340.jpg',
            url : 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701_960_720.jpg'
          }
        ];

// gallery methods
        $scope.methods = {};

// so you will bind openGallery method to a button on page
// to open this gallery like ng-click="openGallery();"
        $scope.openGallery = function(){

        };

// Similar to above function
        $scope.closeGallery = function(){
          $scope.methods.close();
        };

        $scope.nextImg = function(){
          $scope.methods.next();
        };

        $scope.prevImg = function(){
          $scope.methods.prev();
        };
        //end
        $scope.RotateImage = function (id,deg) {

          var deg = 90 * deg;
          $('#' + id).css({
            '-webkit-transform': 'rotate(' + deg + 'deg)',  //Safari 3.1+, Chrome
            '-moz-transform': 'rotate(' + deg + 'deg)',     //Firefox 3.5-15
            '-ms-transform': 'rotate(' + deg + 'deg)',      //IE9+
            '-o-transform': 'rotate(' + deg + 'deg)',       //Opera 10.5-12.00
            'transform': 'rotate(' + deg + 'deg)'          //Firefox 16+, Opera 12.50+

          });
        };



        $scope.url = appConfig.url;

        $scope.showTabDialog = function(ev, exif) {

          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/main/ui/shared/tabDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {exif: exif},
            clickOutsideToClose:true
          })
            .then(function(answer) {
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
        };

        function DialogController(exif, $scope, $mdDialog, appConfig, uiGmapIsReady) {


          $scope.url = appConfig.url;
          $scope.photo = exif;


          $scope.randomMarkers = [{id: 1, latitude: exif.exif.latitude, longitude: exif.exif.longitude}];



          $scope.map = {
            show: false,
            //USA
            center : {
              latitude: 33.396906,
              longitude: 44.360842
            },
            zoom : 6,
            control : {}
          };

          $scope.refreshMap = function(){
            $scope.map.show = true;

            //France
            uiGmapIsReady.promise()
              .then(function (map_instances) {
                $scope.map.control.refresh({
                  latitude: 48,
                  longitude: 2.3
                });
              });
            //refresh success
          };

          $scope.refreshMap();

          $scope.hide = function() {
            $mdDialog.hide();
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
          };
        }

        $scope.photos = {};
        $scope.photosPage = {};
        var pId = $location.path().split("/")[2]||"Unknown";

        $scope.pId = pId;


        if ($scope.formName) {
          $scope.pId = $scope.formName;
          pId = $scope.pId;
        }

        function loadDataPage() {
          api.photo.loadShowById.get({'id': $stateParams.id, form: pId, section: $scope.filterBy},

            // Success
            function (response)
            {
              $scope.isLoading = false;
              $scope.photosPage = response.photos;

            },

            // Error
            function (response)
            {
              $scope.isLoading = false;
              console.error(response);
            }
          );
        }

        loadDataPage();


        var uploader = $scope.uploader = new FileUploader({
          url: appConfig.apiUrl + 'UploadPhoto' + '/' + $stateParams.id + '/' + pId,
          headers: {Authorization: 'Bearer ' + localStorage.getItem('IFMApplication_token')}
        });


        uploader.filters.push({
          name: 'customFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 50;
          }
        });

        uploader.onSuccessItem = function() {
          loadData();
        };


        var controller = $scope.controller = {
          isImage: function(item) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        };

        uploader.onErrorItem = function(fileItem) {
          alert('Error upload the file name: ' + fileItem);
        };

        $scope.photoChange = function(id, caption, photo) {
          photo.isLoading = true;
          photo.saveMSG = 'Saving...';

          api.photo.caption.save({id: id, title: caption},

            // Success
            function (response)
            {
              photo.saveMSG = 'Saved Succeed';
            },

            // Error
            function (response)
            {
              photo.saveMSG = 'error';
            }
          );

        };
        $scope.photoChangeSection = function(id, section, photo) {
          photo.isLoading = true;
          photo.saveMSG = 'Saving...';

          api.photo.caption.save({id: id, section: section},

            // Success
            function (response)
            {
              photo.saveMSG = 'Saved Succeed';
            },

            // Error
            function (response)
            {
              photo.saveMSG = 'error';
            }
          );

        };
        $scope.DeleteFiles = function(id) {
          var result = confirm("Want to delete?");
          if (result) {
            api.photo.delete.save({id: id},

              // Success
              function (response)
              {
                loadData()
              },

              // Error
              function (response)
              {
                console.error(response);
              }
            );
          }
        };


      },
    }
  }]);

})();

