(function ()
{
  'use strict';
  angular.module('app.components.tables.situation')
    .factory('$SituationFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'situationForm/:id')
    };
  }]);


})();


