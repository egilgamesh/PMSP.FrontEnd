(function ()
{
  'use strict';
  angular.module('app.components.tables.IMC')
    .factory('$IMCFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'IMCForm/:id')
    };
  }]);

  angular.module('app.components.tables.IMC')
    .factory('$IMCSearchFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
      return {
        items: $resource(appConfig.apiUrl + 'SearchIMCForm/:id')
      };
    }]);

})();


