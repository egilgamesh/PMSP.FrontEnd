(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $httpProvider, $provide, appConfig)
    {



      function redirectWhenLoggedOut($q, $injector) {

        return {

          responseError: function(rejection) {

            // Need to use $injector.get to bring in $state or else we get
            // a circular dependency error
            var $state = $injector.get('$state');

            // Instead of checking for a status code of 400 which might be used
            // for other reasons in Laravel, we check for the specific rejection
            // reasons to tell us if we need to redirect to the login state
            var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid', 'Unauthenticated.'];

            // Loop through each rejection reason and redirect to the login
            // state if one is encountered
            angular.forEach(rejectionReasons, function(value, key) {

              if(rejection.data.error === value || rejection.data.message === value) {

                // If we get a rejection corresponding to one of the reasons
                // in our array, we know we need to authenticate the user so
                // we can remove the current user from local storage
                localStorage.removeItem('user');

                // Send the user to the auth state so they can login
                $state.go('app.pages_auth_login');
              }
            });

            return $q.reject(rejection);
          }
        }
      }

      // Setup for the $httpInterceptor
      $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

      // Push the new factory onto the $http interceptor array
      $httpProvider.interceptors.push('redirectWhenLoggedOut');


      $locationProvider.html5Mode(false);
      $locationProvider.hashPrefix('');

        // $urlRouterProvider.otherwise('/dashboard-project');
      $urlRouterProvider.otherwise('/pages/auth/login');
      $authProvider.tokenName = 'token';
      $authProvider.tokenPrefix = 'IFMApplication';
      $authProvider.tokenHeader = 'Authorization';
      $authProvider.tokenType = 'Bearer';
      $authProvider.storageType = 'localStorage';

      // Satellizer configuration that specifies which API
      // route the JWT should be retrieved from
      $authProvider.loginUrl = appConfig.authUrl;

      // Redirect to the auth state if any other states
      // are requested other than users


        /**
         * Layout Style Switcher
         *
         * This code is here for demonstration purposes.
         * If you don't need to switch between the layout
         * styles like in the demo, you can set one manually by
         * typing the template urls into the `State definitions`
         * area and remove this code
         */
        // Inject $cookies
        var $cookies;

        angular.injector(['ngCookies']).invoke([
            '$cookies', function (_$cookies)
            {
                $cookies = _$cookies;
            }
        ]);

        // Get active layout
        var layoutStyle = $cookies.get('layoutStyle') || 'verticalNavigation';

        var layouts = {
            verticalNavigation  : {
                main      : 'app/core/layouts/vertical-navigation.html',
                toolbar   : 'app/toolbar/layouts/vertical-navigation/toolbar.html',
                navigation: 'app/navigation/layouts/vertical-navigation/navigation.html'
            },
            verticalNavigationFullwidthToolbar  : {
                main      : 'app/core/layouts/vertical-navigation-fullwidth-toolbar.html',
                toolbar   : 'app/toolbar/layouts/vertical-navigation-fullwidth-toolbar/toolbar.html',
                navigation: 'app/navigation/layouts/vertical-navigation/navigation.html'
            },
            verticalNavigationFullwidthToolbar2  : {
                main      : 'app/core/layouts/vertical-navigation-fullwidth-toolbar-2.html',
                toolbar   : 'app/toolbar/layouts/vertical-navigation-fullwidth-toolbar-2/toolbar.html',
                navigation: 'app/navigation/layouts/vertical-navigation-fullwidth-toolbar-2/navigation.html'
            },
            horizontalNavigation: {
                main      : 'app/core/layouts/horizontal-navigation.html',
                toolbar   : 'app/toolbar/layouts/horizontal-navigation/toolbar.html',
                navigation: 'app/navigation/layouts/horizontal-navigation/navigation.html'
            },
            contentOnly         : {
                main      : 'app/core/layouts/content-only.html',
                toolbar   : '',
                navigation: ''
            },
            contentWithToolbar  : {
                main      : 'app/core/layouts/content-with-toolbar.html',
                toolbar   : 'app/toolbar/layouts/content-with-toolbar/toolbar.html',
                navigation: ''
            }
        };
        // END - Layout Style Switcher

        // State definitions
        $stateProvider
            .state('app', {
                abstract: true,
                views   : {
                    'main@'         : {
                        templateUrl: layouts[layoutStyle].main,
                        controller : 'MainController as vm'
                    },
                    'toolbar@app'   : {
                        templateUrl: layouts[layoutStyle].toolbar,
                        controller : 'ToolbarController as vm'
                    },
                    'navigation@app': {
                        templateUrl: layouts[layoutStyle].navigation,
                        controller : 'NavigationController as vm'
                    },
                    'quickPanel@app': {
                        templateUrl: 'app/quick-panel/quick-panel.html',
                        controller : 'QuickPanelController as vm'
                    }
                }
            });
    }

})();
