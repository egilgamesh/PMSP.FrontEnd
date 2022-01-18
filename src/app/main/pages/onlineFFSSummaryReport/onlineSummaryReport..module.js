(function ()
{
    'use strict';

    angular
        .module('app.pages.onlineSummaryReport', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        $stateProvider.state('app.onlineSummaryReport', {
            url      : '/pages/onlineSummaryReport/:id',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/pages/onlineFFSSummaryReport/onlineSummaryReport..html',
                    controller : 'OnlineSummaryReport as vm'
                }
            },
            resolve  : {
                Timeline    : function (msApi)
                {
                    return msApi.resolve('profile.timeline@get');
                },
                About       : function (msApi)
                {
                    return msApi.resolve('profile.about@get');
                },
                PhotosVideos: function (msApi)
                {
                    return msApi.resolve('profile.photosVideos@get');
                }
            },
            bodyClass: 'profile'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/onlineFFSSummaryReport');

        // Api
      msApiProvider.register('profile.timeline', ['app/data/profile/timeline.json']);
      msApiProvider.register('profile.about', ['app/data/profile/about.json']);
      msApiProvider.register('profile.photosVideos', ['app/data/profile/photos-videos.json']);

        // Navigation
        // msNavigationServiceProvider.saveItem('pages.onlineSummaryReport', {
        //     title : 'Profile',
        //     icon  : 'icon-account',
        //     state : 'app.onlineSummaryReport',
        //     weight: 6
        // });
    }

})();
