(function ()
{
    'use strict';
    angular
        .module('app.components.tables.security', ['md.data.table', 'ngMaterial'])
        .config(config);
    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.security', {
            url  : '/components/table/security',
            views: {
                'content@app': {
                    templateUrl: 'app/main/components/tables/security-table/table.html',
                    controller : 'SecurityController as vm'
                }
            }
        });
    }
})();
