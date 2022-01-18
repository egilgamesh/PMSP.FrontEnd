(function ()
{
  'use strict';
  angular.module('app.components.tables.HAI')
    .factory('$HAIFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'HAIForm/:id')
    };
  }]);

  angular.module('app.components.tables.HAI')
    .factory('$HAISearchFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
      return {
        items: $resource(appConfig.apiUrl + 'SearchHAIForm/:id')
      };
    }]);

})();


