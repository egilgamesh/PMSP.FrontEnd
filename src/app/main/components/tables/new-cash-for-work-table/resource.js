(function ()
{
  'use strict';
  angular.module('app.components.tables.NewCashForWork')
    .factory('$NewCashForWorkFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'NewCashForWorkForm/:id')
    };
  }]);


})();


