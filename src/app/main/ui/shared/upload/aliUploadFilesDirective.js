(function ()
{
  'use strict';
  angular.module('fuse').directive('aliUploadFiles', [function() {
    return {
      restrict: 'EA',
      scope: {
        isEdit: '=',
        filterBy: '=',
        formName: '='
      },
      templateUrl: 'app/main/ui/shared/upload/upload.photos.html',
      controller: function($scope, api, FileUploader, appConfig, $stateParams, $location, $mdDialog){

        console.log("DIRECTIVE AMUploadFileController + " + $scope.isEdit);


        $scope.isLoading = true;

        $scope.showTabDialog = function(ev, exif) {
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/main/ui/shared/tabDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {exif: exif},
            clickOutsideToClose:true,
            fullscreen: true
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


        $scope.photosPage = {};
        var pId = $location.path().split("/")[2]||"Unknown";

        $scope.pId = pId;


        if ($scope.formName) {
          $scope.pId = $scope.formName;
          pId = $scope.pId;
        }

        function loadDataPage() {
          api.photo.loadById.get({'id': $stateParams.id, form: pId},

            // Success
            function (response)
            {
              console.log(response);
              $scope.photosPage = response.photos;
              $scope.isLoading = false;

            },

            // Error
            function (response)
            {
              console.error(response);
              $scope.isLoading = false;
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
          loadDataPage();
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

          console.log("------ photoChange ------");

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

          console.log("-------- photoChangeSection -----------");

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
                loadDataPage();
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

