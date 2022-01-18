(function ()
{
  'use strict';
  angular.module('app.components.tables.weekly')
    .factory('$WeeklyAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
    return {
      items: $resource(appConfig.apiUrl + 'weeklySummary/:id')
    };
  }]);
})();

(function ()
{
  'use strict';
  angular.module('app.components.tables.weekly')
    .factory('$SiteVisitAPI', ['$resource', 'appConfig', function ($resource, appConfig) {
      return {
        items: $resource(appConfig.apiUrl + 'SiteVisitFFS/:id')
      };
    }]);
})();



