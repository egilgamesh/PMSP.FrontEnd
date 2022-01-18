(function () {
  'use strict';

  angular
    .module('fuse')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $rootScope) {
    // Data

    //////////

    // Remove the splash screen
    $scope.$on('$viewContentAnimationEnded', function (event) {
      if (event.targetScope.$id === $scope.$id) {
        $rootScope.$broadcast('msSplashScreen::remove');
      }
    });
  }

  angular


    .module('fuse')


    // Angular File Upload module does not include this directive
    // Only for example


    /**
     * The ng-thumb directive
     * @author: nerv
     * @version: 0.1.2, 2014-01-09
     */
    .directive('ngThumb', ['$window', function ($window) {
      var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function (item) {
          return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function (file) {
          var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      };

      return {
        restrict: 'A',
        template: '<canvas/>',
        link: function (scope, element, attributes) {
          if (!helper.support) return;

          var params = scope.$eval(attributes.ngThumb);

          if (!helper.isFile(params.file)) return;
          if (!helper.isImage(params.file)) return;

          var canvas = element.find('canvas');
          var reader = new FileReader();

          reader.onload = onLoadFile;
          reader.readAsDataURL(params.file);

          function onLoadFile(event) {
            var img = new Image();
            img.onload = onLoadImage;
            img.src = event.target.result;
          }

          function onLoadImage() {
            var width = params.width || this.width / this.height * params.height;
            var height = params.height || this.height / this.width * params.width;
            canvas.attr({width: width, height: height});
            canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
          }
        }
      };
    }]);

  angular
    .module('fuse')
    .constant('FFSConstant', {
      selectTime: [
        {value: "00:00:00", name: "12.00 AM"},
        {value: "00:30:00", name: "12.30 AM"},
        {value: "01:00:00", name: "01.00 AM"},
        {value: "01:30:00", name: "01.30 AM"},
        {value: "02:00:00", name: "02.00 AM"},
        {value: "02:30:00", name: "02.30 AM"},
        {value: "03:00:00", name: "03.00 AM"},
        {value: "03:30:00", name: "03.30 AM"},
        {value: "04:00:00", name: "04.00 AM"},
        {value: "04:30:00", name: "04.30 AM"},
        {value: "05:00:00", name: "05.00 AM"},
        {value: "05:30:00", name: "05.30 AM"},
        {value: "06:00:00", name: "06.00 AM"},
        {value: "06:30:00", name: "06.30 AM"},
        {value: "07:00:00", name: "07.00 AM"},
        {value: "07:30:00", name: "07.30 AM"},
        {value: "08:00:00", name: "08.00 AM"},
        {value: "08:30:00", name: "08.30 AM"},
        {value: "09:00:00", name: "09.00 AM"},
        {value: "09:30:00", name: "09.30 AM"},
        {value: "10:00:00", name: "10.00 AM"},
        {value: "10:30:00", name: "10.30 AM"},
        {value: "11:00:00", name: "11.00 AM"},
        {value: "11:30:00", name: "11.30 AM"},
        {value: "12:00:00", name: "12.00 PM"},
        {value: "12:30:00", name: "12.30 PM"},
        {value: "13:00:00", name: "01.00 PM"},
        {value: "13:30:00", name: "01.30 PM"},
        {value: "14:00:00", name: "02.00 PM"},
        {value: "14:30:00", name: "02.30 PM"},
        {value: "15:00:00", name: "03.00 PM"},
        {value: "15:30:00", name: "03.30 PM"},
        {value: "16:00:00", name: "04.00 PM"},
        {value: "16:30:00", name: "04.30 PM"},
        {value: "17:00:00", name: "05.00 PM"},
        {value: "17:30:00", name: "05.30 PM"},
        {value: "18:00:00", name: "06.00 PM"},
        {value: "18:30:00", name: "06.30 PM"},
        {value: "19:00:00", name: "07.00 PM"},
        {value: "19:30:00", name: "07.30 PM"},
        {value: "20:00:00", name: "08.00 PM"},
        {value: "20:30:00", name: "08.30 PM"},
        {value: "21:00:00", name: "09.00 PM"},
        {value: "21:30:00", name: "09.30 PM"},
        {value: "22:00:00", name: "10.00 PM"},
        {value: "22:30:00", name: "10.30 PM"},
        {value: "23:00:00", name: "11.00 PM"},
        {value: "23:30:00", name: "11.30 PM"}
      ],
      selectEducation: [
        {
          name: "Illiterate: can read & write but no formal education",
          value: "Illiterate: can read & write but no formal education"
        },
        {name: "primary level completion", value: "primary level completion"},
        {name: "intermediate level completion", value: "intermediate level completion"},
        {name: "secondary graduate", value: "secondary graduate"},
        {name: "vocational training", value: "vocational training"},
        {name: "diploma", value: "diploma"},
        {name: "Bachelor’s degree", value: "Bachelor’s degree"},
        {name: "Master’s degree", value: "Master’s degree"},
        {name: "Ph.D", value: "Ph.D"}
      ],
      selectAge: [
        {value: "15-19 years", name: "15-19 years"},
        {value: "20-24 years", name: "20-24 years"},
        {value: "25-29 years", name: "25-29 years"},
        {value: "30-49 years", name: "30-49 years"},
        {value: "50-65 years", name: "50-65 years"},
        {value: "66+ years", name: "66+ years"}
      ],
      selectDateNewDoNotKnow: [
        {value: "Don’t Know", name: "Don’t Know"},
        {value: "Pre-1990", name: "Pre-1990"},
        {value: "1990 - 2002", name: "1990 - 2002"},
        {value: "2003-2014", name: "2003-2014"},
        {value: "new", name: "new"}
      ],
      selectDateAfterDoNotKnow: [
        {value: "Don’t Know", name: "Don’t Know"},
        {value: "Before 2014", name: "Before 2014"},
        {value: "2014", name: "2014"},
        {value: "2015", name: "2015"},
        {value: "2016 or after", name: "2016 or after"}
      ],
      selectDateJanJunDoNotKnow: [
        {value: "Don’t Know", name: "Don’t Know"},
        {value: "2015", name: "2015"},
        {value: "Jan-Jun 2016", name: "Jan-Jun 2016"},
        {value: "July-Dec 2016", name: "July-Dec 2016"},
        {value: "Jan-Jun 2017", name: "Jan-Jun 2017"},
      ],
      selectYesNoDoNotKnow: [
        {value: "Don’t Know", name: "Don’t Know"},
        {value: "No", name: "No"},
        {value: "Yes", name: "Yes"}
      ],
        selectYesNoDoNotKnowAndNone: [
          {value: "None", name: "None"},
          {value: "Don’t Know", name: "Don’t Know"},
          {value: "No", name: "No"},
          {value: "Yes", name: "Yes"}
        ],
      selectYesNoDoNo: [
        {value: "No", name: "No"},
        {value: "Yes", name: "Yes"}
      ],
      selectPercentageDoNotKnow: [
        {value: "Don’t Know", name: "Don’t Know"},
        {value: "> than 25%", name: "> than 25%"},
        {value: "25% - 49%", name: "25% - 49%"},
        {value: "51% - 74%", name: "51% - 74%"},
        {value: "100%", name: "100%"}
      ],
      selectEstimateMonth: [
        {value: "None", name: "None"},
        {value: "Don’t Know", name: "Don’t Know"},
        {value: "> 9 months", name: "> 9 months"},
        {value: "6-9 months", name: "6-9 months"},
        {value: "3-6 months", name: "3-6 months"},
        {value: "< 3 months", name: "< 3 months"},
      ],
      selectSatisfactions: [
        {value: "Very Dissatisfied", name: "Very Dissatisfied"},
        {value: "Somewhat Dissatisfied", name: "Somewhat Dissatisfied"},
        {value: "Neutral/Don’t Know", name: "Neutral/Don’t Know"},
        {value: "Somewhat Satisfied", name: "Somewhat Satisfied"},
        {value: "Very Satisfied", name: "Very Satisfied"},
      ],
      selectLessDoNotKnow: [
        {value: "Don’t Know", name: "Don’t Know"},
        {value: "0", name: "0"},
        {value: "< 25", name: "< 25"},
        {value: "25-49", name: "25-49"},
        {value: "50-75", name: "50-75"},
        {value: "76-99", name: "76-99"},
        {value: "> 100", name: "> 100"},
      ],
      selectPatients: [
        {value: "Don’t Know", name: "Don’t Know"},
        {value: "Ethnic or religious Minority", name: "Ethnic or religious Minority"},
        {value: "Disabled/Elderly", name: "Disabled/Elderly"},
        {value: "IDPs", name: "IDPs"},
        {value: "Youth (15-29)", name: "Youth (15-29)"},
        {value: "Women", name: "Women"},
      ],
      selectImpact: [
        {value: "Significantly Worsened", name: "Significantly Worsened"},
        {value: "Slightly Worsened", name: "Slightly Worsened"},
        {value: "No Change/Don’t Know", name: "No Change/Don’t Know"},
        {value: "Improved", name: "Improved"},
        {value: "Significantly Improved", name: "Significantly Improved"},
      ],
      selectInfluence: [
        {value: "None", name: "None"},
        {value: "Significantly Negatively Affected", name: "Significantly Negatively Affected"},
        {value: "Slightly Negatively Affected", name: "Slightly Negatively Affected"},
        {value: "No Impact/Don’t Know", name: "No Impact/Don’t Know"},
        {value: "Slightly Affected", name: "Slightly Affected"},
        {value: "Significantly Affected", name: "Significantly Affected"}
      ],
      selectOneToFive: [
        {value: 1, name: "1"},
        {value: 2, name: "2"},
        {value: 3, name: "3"},
        {value: 4, name: "4"},
        {value: 5, name: "5"},

      ],
      selectWeeks: [
      {value: "Don’t know", name: "Don’t know"},
      {value: "> five days", name: "> five days"},
      {value: "1 week", name: "1 week"},
      {value: "2-3 weeks", name: "2-3 weeks"},
      {value: "More than 4 weeks", name: "More than 4 weeks"}
    ],
      selectBigNumbers: [
      {value: '<2,500', name: "<2,500"},
      {value: '1,000-2,499', name: "1,000-2,499"},
      {value: '500-999', name: "500-999"},
      {value: 'Under 500', name: "Under 500"},
      {value: 'Don’t know', name: "Don’t know"},

    ],
      selectLevelsAffected: [
        {value: 'Very negatively Affected', name: "Very negatively Affected"},
        {value: 'Somewhat Negatively Affected', name: "Somewhat Negatively Affected"},
        {value: 'No Impact/Don’t Know', name: "No Impact/Don’t Know"},
        {value: 'Somewhat Positively Affected', name: "Somewhat Positively Affected"},
        {value: 'Significantly Positively Affected', name: "Significantly Positively Affected"},
      ],
      selectWellLevels: [
        {value: 'Very Badly', name: "Very Badly"},
        {value: 'Somewhat Badly', name: "Somewhat Badly"},
        {value: 'Neutral/Don’t Know', name: "Neutral/Don’t Know"},
        {value: 'Somewhat well', name: "Somewhat well"},
        {value: 'Very well ', name: "Very well "}
      ],
      selectYesNoNoComments: [
        {value: "No Comments", name: "No Comments"},
        {value: "No", name: "No"},
        {value: "Yes", name: "Yes"}
      ]
    });


})();
