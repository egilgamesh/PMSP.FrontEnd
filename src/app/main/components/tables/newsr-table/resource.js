(function ()
{
  'use strict';
  angular.module('app.components.tables.NEWSR')
    .factory('$NEWSRFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'NEWSRForm/:id')
    };
  }]);

  angular.module('app.components.tables.NEWSR')
    .factory('$NEWSRSearchFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
      return {
        items: $resource(appConfig.apiUrl + 'SearchNEWSRForm/:id')
      };
    }]);

})();


