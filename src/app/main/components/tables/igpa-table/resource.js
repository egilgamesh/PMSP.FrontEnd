(function ()
{
  'use strict';
  angular.module('app.components.tables.IGPA')
    .factory('$IGPAFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'IGPAForm/:id')
    };
  }]);

  angular.module('app.components.tables.IGPA')
    .factory('$IGPASearchFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
      return {
        items: $resource(appConfig.apiUrl + 'SearchIGPAForm/:id')
      };
    }]);

})();


