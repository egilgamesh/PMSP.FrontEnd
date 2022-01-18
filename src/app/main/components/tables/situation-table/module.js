(function ()
{
    'use strict';
    angular
        .module('app.components.tables.situation', ['md.data.table', 'ngMaterial'])
        .config(config);
    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.situation', {
            url  : '/components/table/situation',
            views: {
                'content@app': {
                    templateUrl: 'app/main/components/tables/situation-table/table.html',
                    controller : 'SituationController as vm'
                }
            }
        }).state('app.situation.type', {
          url      : '/:type',
          views    : {
            'content@app': {
              templateUrl: 'app/main/components/tables/situation-table/table.html',
              controller : 'SituationController as vm'
            }
          },
          bodyClass: 'forms'
        });
    }
})();
