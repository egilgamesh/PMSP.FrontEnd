(function ()
{
  'use strict';
  angular.module('app.components.tables.education')
    .factory('$EducationFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'educationForm/:id')
    };
  }]);


})();


