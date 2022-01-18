(function ()
{
  'use strict';
  angular.module('app.components.tables.water')
    .factory('$WaterFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'NewFFSGeneralForm/:id')
    };
  }]);

  angular.module('app.components.tables.water')
    .factory('$NewFFSSearchFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
      return {
        items: $resource(appConfig.apiUrl + 'SearchNewFFSGeneralForm/:id')
      };
    }]);

})();


