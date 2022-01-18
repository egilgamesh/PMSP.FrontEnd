(function ()
{
  'use strict';
  angular.module('app.components.tables.water')
    .factory('$WaterFormAPIOld', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'waterForm/:id')
    };
  }]);


})();


