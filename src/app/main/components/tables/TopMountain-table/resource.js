(function ()
{
  'use strict';
  angular.module('app.components.tables.TopMountain')
    .factory('$TopMountainFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'TopMountainForm/:id')
    };
  }]);

  angular.module('app.components.tables.TopMountain')
    .factory('$TopMountainSearchFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
      return {
        items: $resource(appConfig.apiUrl + 'SearchTopMountainForm/:id')
      };
    }]);

})();


