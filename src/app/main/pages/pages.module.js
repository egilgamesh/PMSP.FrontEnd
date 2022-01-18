(function ()
{
    'use strict';

    angular
        .module('app.pages', [
            'app.pages.auth.login',
          'app.pages.auth.reset-password',
          'app.pages.onlineSummaryReport',
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        // msNavigationServiceProvider.saveItem('pages', {
        //     title : 'PAGES',
        //     group : true,
        //     weight: 1
        // });
    }
})();
