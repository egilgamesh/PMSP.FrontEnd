(function ()
{
    'use strict';

    angular
        .module('fuse')
        .factory('api', apiService);

    /** @ngInject */
    function apiService($resource, appConfig)
    {

        /**
         * You can use this service to define your API urls. The "api" service
         * is designed to work in parallel with "apiResolver" service which you can
         * find in the "app/core/services/api-resolver.service.js" file.
         *
         * You can structure your API urls whatever the way you want to structure them.
         * You can either use very simple definitions, or you can use multi-dimensional
         * objects.
         *
         * Here's a very simple API url definition example:
         *
         *      api.getBlogList = $resource('http://api.example.com/getBlogList');
         *
         * While this is a perfectly valid $resource definition, most of the time you will
         * find yourself in a more complex situation where you want url parameters:
         *
         *      api.getBlogById = $resource('http://api.example.com/blog/:id', {id: '@id'});
         *
         * You can also define your custom methods. Custom method definitions allow you to
         * add hardcoded parameters to your API calls that you want to sent every time you
         * make that API call:
         *
         *      api.getBlogById = $resource('http://api.example.com/blog/:id', {id: '@id'}, {
         *         'getFromHomeCategory' : {method: 'GET', params: {blogCategory: 'home'}}
         *      });
         *
         * In addition to these definitions, you can also create multi-dimensional objects.
         * They are nothing to do with the $resource object, it's just a more convenient
         * way that we have created for you to packing your related API urls together:
         *
         *      api.blog = {
         *                   list     : $resource('http://api.example.com/blog'),
         *                   getById  : $resource('http://api.example.com/blog/:id', {id: '@id'}),
         *                   getByDate: $resource('http://api.example.com/blog/:date', {id: '@date'}, {
         *                       get: {
         *                            method: 'GET',
         *                            params: {
         *                                getByDate: true
         *                            }
         *                       }
         *                   })
         *       }
         *
         * If you look at the last example from above, we overrode the 'get' method to put a
         * hardcoded parameter. Now every time we make the "getByDate" call, the {getByDate: true}
         * object will also be sent along with whatever data we are sending.
         *
         * All the above methods are using standard $resource service. You can learn more about
         * it at: https://docs.angularjs.org/api/ngResource/service/$resource
         *
         * -----
         *
         * After you defined your API urls, you can use them in Controllers, Services and even
         * in the UIRouter state definitions.
         *
         * If we use the last example from above, you can do an API call in your Controllers and
         * Services like this:
         *
         *      function MyController (api)
         *      {
         *          // Get the blog list
         *          api.blog.list.get({},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *
         *          // Get the blog with the id of 3
         *          var id = 3;
         *          api.blog.getById.get({'id': id},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *
         *          // Get the blog with the date by using custom defined method
         *          var date = 112314232132;
         *          api.blog.getByDate.get({'date': date},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *      }
         *
         * Because we are directly using $resource service, all your API calls will return a
         * $promise object.
         *
         * --
         *
         * If you want to do the same calls in your UI Router state definitions, you need to use
         * "apiResolver" service we have prepared for you:
         *
         *      $stateProvider.state('app.blog', {
         *          url      : '/blog',
         *          views    : {
         *               'content@app': {
         *                   templateUrl: 'app/main/apps/blog/blog.html',
         *                   controller : 'BlogController as vm'
         *               }
         *          },
         *          resolve  : {
         *              Blog: function (apiResolver)
         *              {
         *                  return apiResolver.resolve('blog.list@get');
         *              }
         *          }
         *      });
         *
         *  You can even use parameters with apiResolver service:
         *
         *      $stateProvider.state('app.blog.show', {
         *          url      : '/blog/:id',
         *          views    : {
         *               'content@app': {
         *                   templateUrl: 'app/main/apps/blog/blog.html',
         *                   controller : 'BlogController as vm'
         *               }
         *          },
         *          resolve  : {
         *              Blog: function (apiResolver, $stateParams)
         *              {
         *                  return apiResolver.resolve('blog.getById@get', {'id': $stateParams.id);
         *              }
         *          }
         *      });
         *
         *  And the "Blog" object will be available in your BlogController:
         *
         *      function BlogController(Blog)
         *      {
         *          var vm = this;
         *
         *          // Data
         *          vm.blog = Blog;
         *
         *          ...
         *      }
         */

        var api = {};

        // Base Url
        api.baseUrl = 'app/data/';

        /**
         * Here you can find all the definitions that the Demo Project requires
         *
         * If you wish to use this method, you can create your API definitions
         * in a similar way.
         */

        /*
         api.dashboard = {
         project  : $resource(api.baseUrl + 'dashboard/project/data.json'),
         server   : $resource(api.baseUrl + 'dashboard/server/data.json'),
         analytics: $resource(api.baseUrl + 'dashboard/analytics/data.json')
         };

         api.cards = $resource(api.baseUrl + 'cards/cards.json');

         api.fileManager = {
         documents: $resource(api.baseUrl + 'file-manager/documents.json')
         };

         api.ganttChart = {
         tasks: $resource(api.baseUrl + 'gantt-chart/tasks.json'),
         timespans : $resource(api.baseUrl + 'gantt-chart/timespans.json')
         };

         api.icons = $resource('assets/icons/selection.json');

         api.invoice = $resource(api.baseUrl + 'invoice/invoice.json');

         api.mail = {
         inbox: $resource(api.baseUrl + 'mail/inbox.json')
         };

         api.profile = {
         timeline    : $resource(api.baseUrl + 'profile/timeline.json'),
         about       : $resource(api.baseUrl + 'profile/about.json'),
         photosVideos: $resource(api.baseUrl + 'profile/photos-videos.json')
         };

         api.quickPanel = {
         activities: $resource(api.baseUrl + 'quick-panel/activities.json'),
         contacts  : $resource(api.baseUrl + 'quick-panel/contacts.json'),
         events    : $resource(api.baseUrl + 'quick-panel/events.json'),
         notes     : $resource(api.baseUrl + 'quick-panel/notes.json')
         };

         api.search = {
         classic : $resource(api.baseUrl + 'search/classic.json'),
         mails   : $resource(api.baseUrl + 'search/mails.json'),
         users   : $resource(api.baseUrl + 'search/users.json'),
         contacts: $resource(api.baseUrl + 'search/contacts.json')
         };

         api.scrumboard = {
         boardList: $resource(api.baseUrl + 'scrumboard/boardList.json'),
         board    : $resource(api.baseUrl + 'scrumboard/boards/:id.json')
         };

         api.tables = {
         employees   : $resource(api.baseUrl + 'tables/employees.json'),
         employees100: $resource(api.baseUrl + 'tables/employees100.json')
         };

         api.timeline = {
         page1: $resource(api.baseUrl + 'timeline/page-1.json'),
         page2: $resource(api.baseUrl + 'timeline/page-2.json'),
         page3: $resource(api.baseUrl + 'timeline/page-3.json')
         };

         api.todo = {
         tasks: $resource(api.baseUrl + 'todo/tasks.json'),
         tags : $resource(api.baseUrl + 'todo/tags.json')
         };
         */

      api.user = {
        list       : $resource(appConfig.apiUrl + 'users'),
        logOut     : $resource(appConfig.apiUrl + 'logOut'),
        getById    : $resource(appConfig.apiUrl + 'users/:id', {id: '@id'}),
        getByDate  : $resource(appConfig.apiUrl + 'users/:date', {id: '@date'},
          {
            get: {
              method: 'GET',
              params: {
                getByDate: true
              }
            }
          }
        )
      };

      api.weeklySummary = {
        list     : $resource(appConfig.apiUrl + 'weeklySummary'),
        getById  : $resource(appConfig.apiUrl + 'weeklySummary/:id', {id: '@id'}),
        getByDate: $resource(appConfig.apiUrl + 'weeklySummary/:date', {id: '@date'},
          {
            get: {
              method: 'GET',
              params: {
                getByDate: true
              }
            }
          }
        )
      };

      api.securityTracker = {
        list     : $resource(appConfig.apiUrl + 'securityTracker'),
      };

      api.chart = {
        ffs     : $resource(appConfig.apiUrl + 'ffsChartNew'),
        ffsPie  : $resource(appConfig.apiUrl + 'ffsPieChartNew'),
        infoGraphic  : $resource(appConfig.apiUrl + 'infoGraphic'),
      };



      api.SRForm = {
        list     : $resource(appConfig.apiUrl + 'situationForm'),
        analysis     : $resource(appConfig.apiUrl + 'sitRepAnalysis'),
        analysisChart     : $resource(appConfig.apiUrl + 'sitRepAnalysisChart'),
        getById  : $resource(appConfig.apiUrl + 'situationForm/:id', {id: '@id'}),
        getByDate: $resource(appConfig.apiUrl + 'situationForm/:date', {id: '@date'},
          {
            get: {
              method: 'GET',
              params: {
                getByDate: true
              }
            }
          }
        )
      };


      api.home = {
        list     : $resource(appConfig.apiUrl + 'dashboard'),
        CRS      : $resource(appConfig.apiUrl + 'dashboard/CRS'),
        HAI      : $resource(appConfig.apiUrl + 'dashboard/HAI'),
        IOM      : $resource(appConfig.apiUrl + 'dashboard/IOM'),
        TopMountain      : $resource(appConfig.apiUrl + 'dashboard/TopMountain'),
        USIP      : $resource(appConfig.apiUrl + 'dashboard/USIP'),
        MENA     : $resource(appConfig.apiUrl + 'dashboard/MENA'),
        IMC      : $resource(appConfig.apiUrl + 'dashboard/IMC'),
        getById  : $resource(appConfig.apiUrl + 'dashboard/:id', {id: '@id'}),
        getByDate: $resource(appConfig.apiUrl + 'dashboard/:date', {id: '@date'},
          {
            get: {
              method: 'GET',
              params: {
                getByDate: true
              }
            }
          }
        )
      };

      api.password = {
        reset     : $resource(appConfig.apiUrl + 'restPassword'),
      };

      api.IGPA = {
        General                              : $resource(appConfig.apiUrl + 'IGPAForm'),
        ByID                                 : $resource(appConfig.apiUrl + 'IGPAForm/:id', {id: '@id'}),
        C2                                   : $resource(appConfig.apiUrl + 'C2IGPAForm'),
        C2ByID                               : $resource(appConfig.apiUrl + 'C2IGPAForm/:id', {id: '@id'}),
        C3                                   : $resource(appConfig.apiUrl + 'C3IGPAForm'),
        C3ByID                               : $resource(appConfig.apiUrl + 'C3IGPAForm/:id', {id: '@id'}),
      };

      api.CRS = {
        General                              : $resource(appConfig.apiUrl + 'CRSForm'),
        ByID                                 : $resource(appConfig.apiUrl + 'CRSForm/:id', {id: '@id'}),
      };

      api.HAI = {
        General                              : $resource(appConfig.apiUrl + 'HAIForm'),
        ByID                                 : $resource(appConfig.apiUrl + 'HAIForm/:id', {id: '@id'}),
      };

      api.IOM = {
        General                              : $resource(appConfig.apiUrl + 'IOMForm'),
        ByID                                 : $resource(appConfig.apiUrl + 'IOMForm/:id', {id: '@id'}),
      };
      api.TopMountain = {
        General                              : $resource(appConfig.apiUrl + 'TopMountainForm'),
        ByID                                 : $resource(appConfig.apiUrl + 'TopMountainForm/:id', {id: '@id'}),
      };

      api.NEWSR = {
        General                              : $resource(appConfig.apiUrl + 'NEWSRForm'),
        ByID                                 : $resource(appConfig.apiUrl + 'NEWSRForm/:id', {id: '@id'}),
      };

      api.USIP = {
        General                              : $resource(appConfig.apiUrl + 'USIPForm'),
        ByID                                 : $resource(appConfig.apiUrl + 'USIPForm/:id', {id: '@id'}),
      };

      api.MENA = {
        General                              : $resource(appConfig.apiUrl + 'MENAForm'),
        ByID                                 : $resource(appConfig.apiUrl + 'MENAForm/:id', {id: '@id'}),
      };

      api.IMC = {
        General                              : $resource(appConfig.apiUrl + 'IMCForm'),
        ByID                                 : $resource(appConfig.apiUrl + 'IMCForm/:id', {id: '@id'}),
      };

      api.review = {
        report            : $resource(appConfig.apiUrl + 'ReportReview'),
      };


      api.USAID_Weekly = {
        getWeekly            : $resource(appConfig.apiUrl + 'GetIFMWeeklyPlane'),
        getWeeklyShort            : $resource(appConfig.apiUrl + 'GetIFMWeeklyPlaneShort'),
      };

      api.map = {
        MapData            : $resource(appConfig.apiUrl + 'MapData'),
      };

      api.newFFSmap = {
        MapData            : $resource(appConfig.apiUrl + 'NewFFSMapData'),
      };

      api.photo = {
        caption            : $resource(appConfig.apiUrl + 'PhotoChangeCaption'),
        delete             : $resource(appConfig.apiUrl + 'PhotoDelete'),
        loadById           : $resource(appConfig.apiUrl + 'ShowPhotoForForm/:id/:form', {id: '@id', form: '@form'}),
        loadShowById           : $resource(appConfig.apiUrl + 'ShowHomePagePhotoForForm/:id/:form', {id: '@id', form: '@form'}),
      };


      api.Dashboard = {
        slide            : $resource(appConfig.apiUrl + 'DashboardSlideInformation'),
      };


      api.ffs = {
        health                 : $resource(appConfig.apiUrl + 'healthForm'),
        healthById             : $resource(appConfig.apiUrl + 'healthForm/:id', {id: '@id'}),
        healthBS               : $resource(appConfig.apiUrl + 'healthBSForm'),
        healthBSById           : $resource(appConfig.apiUrl + 'healthBSForm/:id', {id: '@id'}),

        cash                   : $resource(appConfig.apiUrl + 'cashForm'),
        cashById               : $resource(appConfig.apiUrl + 'cashForm/:id', {id: '@id'}),
        cashBS                 : $resource(appConfig.apiUrl + 'cashBSForm'),
        cashBSById             : $resource(appConfig.apiUrl + 'cashBSForm/:id', {id: '@id'}),

        education              : $resource(appConfig.apiUrl + 'educationForm'),
        educationById          : $resource(appConfig.apiUrl + 'educationForm/:id', {id: '@id'}),
        educationBS            : $resource(appConfig.apiUrl + 'educationBSForm'),
        educationBSById        : $resource(appConfig.apiUrl + 'educationBSForm/:id', {id: '@id'}),

        electricity            : $resource(appConfig.apiUrl + 'electricityForm'),
        electricityById        : $resource(appConfig.apiUrl + 'electricityForm/:id', {id: '@id'}),
        electricityBS          : $resource(appConfig.apiUrl + 'electricityBSForm'),
        electricityBSById      : $resource(appConfig.apiUrl + 'electricityBSForm/:id', {id: '@id'}),

        municipality           : $resource(appConfig.apiUrl + 'municipalityForm'),
        municipalityById       : $resource(appConfig.apiUrl + 'municipalityForm/:id', {id: '@id'}),
        municipalityBS         : $resource(appConfig.apiUrl + 'municipalityBSForm'),
        municipalityBSById     : $resource(appConfig.apiUrl + 'municipalityBSForm/:id', {id: '@id'}),
        municipalityBSR        : $resource(appConfig.apiUrl + 'municipalityBSRForm'),
        municipalityBSRById     : $resource(appConfig.apiUrl + 'municipalityBSRForm/:id', {id: '@id'}),

        water                  : $resource(appConfig.apiUrl + 'waterForm'),
        waterById              : $resource(appConfig.apiUrl + 'waterForm/:id', {id: '@id'}),
        waterBS                : $resource(appConfig.apiUrl + 'waterBSForm'),
        waterBSById            : $resource(appConfig.apiUrl + 'waterBSForm/:id', {id: '@id'}),


        NewFFSGeneral                  : $resource(appConfig.apiUrl + 'NewFFSGeneralForm'),
        NewFFSGeneralById              : $resource(appConfig.apiUrl + 'NewFFSGeneralForm/:id', {id: '@id'}),
        NewFFSGeneralBS                : $resource(appConfig.apiUrl + 'NewFFSGeneralBSForm'),
        NewFFSGeneralBSById            : $resource(appConfig.apiUrl + 'NewFFSGeneralBSForm/:id', {id: '@id'}),

        NewCashForWork                  : $resource(appConfig.apiUrl + 'NewCashForWorkForm'),
        NewCashForWorkById              : $resource(appConfig.apiUrl + 'NewCashForWorkForm/:id', {id: '@id'}),
        NewCashForWorkBS                : $resource(appConfig.apiUrl + 'NewCashForWorkBSForm'),
        NewCashForWorkBSById            : $resource(appConfig.apiUrl + 'NewCashForWorkBSForm/:id', {id: '@id'}),

      };


      return api;
    }



})();
