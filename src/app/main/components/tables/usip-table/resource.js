(function ()
{
  'use strict';
  angular.module('app.components.tables.USIP')
    .factory('$USIPFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'USIPForm/:id')
    };
  }]);

  angular.module('app.components.tables.USIP')
    .factory('$USIPSearchFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
      return {
        items: $resource(appConfig.apiUrl + 'SearchUSIPForm/:id')
      };
    }]);

})();


