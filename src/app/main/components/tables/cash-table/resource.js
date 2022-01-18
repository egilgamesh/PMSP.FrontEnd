(function ()
{
  'use strict';
  angular.module('app.components.tables.cash')
    .factory('$CashFormAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'cashForm/:id')
    };
  }]);


})();


