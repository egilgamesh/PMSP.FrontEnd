(function ()
{
  'use strict';
  angular.module('app.components.tables.electricity')
    .factory('$ElectricityFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'electricityForm/:id')
    };
  }]);


})();


