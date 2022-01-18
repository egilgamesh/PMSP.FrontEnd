(function ()
{
  'use strict';
  angular.module('app.components.tables.users')
    .factory('$UserAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'users/:id')
    };
  }]);
})();


