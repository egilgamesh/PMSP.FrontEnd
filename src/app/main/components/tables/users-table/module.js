(function ()
{
    'use strict';
    angular
        .module('app.components.tables.users', ['md.data.table', 'ngMaterial'])
        .config(config);
    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.users', {
            url  : '/components/table/users',
            views: {
                'content@app': {
                    templateUrl: 'app/main/components/tables/users-table/table.html',
                    controller : 'UserController as vm'
                }
            }
        });
    }
})();
