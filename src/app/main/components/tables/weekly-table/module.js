(function ()
{
    'use strict';
    angular
        .module('app.components.tables.weekly', ['md.data.table', 'ngMaterial'])
        .config(config);
    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.weekly', {
            url  : '/components/table/weekly',
            views: {
                'content@app': {
                    templateUrl: 'app/main/components/tables/weekly-table/table.html',
                    controller : 'WeeklyController as vm'
                }
            }
        });
    }
})();
