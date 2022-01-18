(function ()
{
    'use strict';

    angular
        .module('app.dashboards.Metabase',
            [
                // 3rd Party Dependencies
                'nvd3',
                'datatables'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        // State
        $stateProvider.state('app.dashboards_FFS_Metabase', {
            url      : '/dashboard-FFS-Metabase',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/dashboards/metabase/metabase.html',
                    controller : 'DashboardProjectController as vm'
                }
            },
        })
    }



})();
