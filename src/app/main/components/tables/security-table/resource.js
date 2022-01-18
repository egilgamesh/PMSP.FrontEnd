(function ()
{
  'use strict';
  angular.module('app.components.tables.security')
    .factory('$SecurityTrackerAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'securityTracker/:id')
    };
  }]);


})();


