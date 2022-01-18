(function ()
{
  'use strict';
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  angular.module('fuse').filter('map_colour', [function () {
    return function (input) {
      var colors = ['#ceccc8','#b0bacc','#9aa8c4','#8797b8','#7486ac','#63759f','#526391','#415383','#304375','#1e3467', '#1e3467'];
      var numbers = hexToRgb(colors[input]);
      return "rgba(" + numbers.r + "," + numbers.g + "," + numbers.b + ",1)";
    }
  }]);
  angular.module('fuse').directive('region', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      scope: {
        dummyData: "=",
        hoverRegion: "=" //<--- Add this
      },
      link: function (scope, element, attrs) {
        scope.elementId = element.attr("id");
        scope.regionClick = function () {
          alert(scope.elementId + ' => ' + scope.dummyData[scope.elementId].value);
        };
        scope.regionMouseOver = function () {               //<
          scope.hoverRegion = scope.elementId;            //<--- Add this
          element[0].parentNode.appendChild(element[0]);  //<
        };                                                  //<
        element.attr("ng-click", "regionClick()");
        element.attr("ng-attr-fill", "{{dummyData[elementId].colorCode | map_colour}}"); //<--- THIS BIT!
        element.attr("ng-mouseover", "regionMouseOver()"); //<--- Add this
        element.attr("ng-class", "{active:hoverRegion==elementId}"); //<--- Add this
        element.removeAttr("region");
        $compile(element)(scope);
      }
    }
  }]);

  angular.module('fuse').directive('svgMap', ['$compile', function($compile) {
    return {
      restrict: 'EA',
      scope: {
        type: '='
      },
      link: function (scope, element, attrs) {
        var regions = element[0].querySelectorAll('.state');
        angular.forEach(regions, function (path, key) {
          var regionElement = angular.element(path);
          regionElement.attr("region", "");
          regionElement.attr("dummy-data", "dummyData");
          regionElement.attr("hover-region", "hoverRegion"); //<--- Add this
          $compile(regionElement)(scope);
        })
      },
      controllerAs: 'vm',
      templateUrl: 'app/main/directives/SVGMap/svgMap.html',
      controller: function($scope, api, $interval, $mdSidenav){

        var vm = this;

         $scope.dummyData = [];

         $scope.dtOptions = {
          dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
           pageLength: 5,
           lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            autoWidth : true,
            responsive: true,
            order     : [1, 'asc'],
            columnDefs: [
            {
              width    : '40',
              orderable: true,
              targets  : [0]
            },
            {
              width  : '20%',
            }
          ]
        };

        $scope.createDummyData = function () {
          var dataTemp = {};

          dataTemp['Anbar'] = {value: 3, colorCode: 0};
          dataTemp['Babil'] = {value: 2, colorCode: 0};
          dataTemp['Baghdad'] = {value: 3, colorCode: 1};
          dataTemp['Basrah'] = {value: 4, colorCode: 2};
          dataTemp['Dahuk'] = {value: 5, colorCode: 3};
          dataTemp['Diyala'] = {value: 6, colorCode: 3};
          dataTemp['Erbil'] = {value: 7, colorCode: 4};
          dataTemp['Kerbala'] = {value: 8, colorCode: 5};
          dataTemp['Missan'] = {value: 9, colorCode: 5};
          dataTemp['Muthanna'] = {value: 10, colorCode: 6};
          dataTemp['Najaf'] = {value: 18, colorCode: 6};
          dataTemp['Ninewa'] = {value: 11, colorCode: 7};
          dataTemp['Qadissiya'] = {value: 12, colorCode: 7};
          dataTemp['Salah al-Din'] = {value: 13, colorCode: 8};
          dataTemp['Sulaymaniyah'] = {value: 14, colorCode: 8};
          dataTemp['Kirkuk'] = {value: 15, colorCode: 9};
          dataTemp['Thi-Qar'] = {value: 16, colorCode: 1};
          dataTemp['Wasit'] = {value: 17, colorCode: 6};

           $scope.dummyData = dataTemp ;
        };

        $scope.createDummyData();

        $scope.changeHoverRegion = function (region) {  //
          $scope.hoverRegion = region;                // <-- Add this
        };



      },
    }
  }]);

})();

