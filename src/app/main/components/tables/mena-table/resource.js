(function ()
{
  'use strict';
  angular.module('app.components.tables.MENA')
    .factory('$MENAFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'MENAForm/:id')
    };
  }]);

  angular.module('app.components.tables.MENA')
    .factory('$MENASearchFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
      return {
        items: $resource(appConfig.apiUrl + 'SearchMENAForm/:id')
      };
    }]);

})();


