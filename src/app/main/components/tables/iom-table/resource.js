(function ()
{
  'use strict';
  angular.module('app.components.tables.IOM')
    .factory('$IOMFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'IOMForm/:id')
    };
  }]);

  angular.module('app.components.tables.IOM')
    .factory('$IOMSearchFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
      return {
        items: $resource(appConfig.apiUrl + 'SearchIOMForm/:id')
      };
    }]);

})();


