(function ()
{
  'use strict';
  angular.module('app.components.tables.municipality')
    .factory('$MunicipalityFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'municipalityForm/:id')
    };
  }]);


})();


