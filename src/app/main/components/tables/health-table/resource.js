(function ()
{
  'use strict';
  angular.module('app.components.tables.health')
    .factory('$HealthFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'healthForm/:id')
    };
  }]);


})();


