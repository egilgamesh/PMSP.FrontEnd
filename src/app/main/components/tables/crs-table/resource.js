(function ()
{
  'use strict';
  angular.module('app.components.tables.CRS')
    .factory('$CRSFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'CRSForm/:id')
    };
  }]);

  angular.module('app.components.tables.CRS')
    .factory('$CRSSearchFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
      return {
        items: $resource(appConfig.apiUrl + 'SearchCRSForm/:id')
      };
    }]);

})();


