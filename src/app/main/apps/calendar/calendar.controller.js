(function ()
{
    'use strict';

    angular
        .module('app.calendar')
        .controller('CalendarController', CalendarController);

    /** @ngInject */
    function CalendarController($mdDialog, $document, api)
    {
        var vm = this;

      vm.events = [[]];

      // Data
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

      vm.tempData = [];
      api.USAID_Weekly.getWeeklyShort.get({},

                    // Success
                    function (response)
                    {

                      angular.forEach(response.data, function(value, key) {
                        vm.events[0].push(
                          {
                            id: value['id'],
                            start: value['start_date'],
                            end: value['end_date'],
                            title: value['project_type'] + ': ' + value['title'],
                            note: value['note'],
                            cancelReason: value['cancel_reason'],
                            projectType: value['project_type'],
                            location: value['location'],
                            user: value['user'],
                            reportIFMStatus: value['event_status']
                          }
                        );
                      });

                      // vm.events[0] = vm.tempData;


                    },

                  // Error
                  function (response)
                  {
                      console.error(response);
                  }
              );



        vm.calendarUiConfig = {
            calendar: {
                editable          : false,
                eventLimit        : true,
                header            : '',
                handleWindowResize: false,
                aspectRatio       : 1,
                dayNames          : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesShort     : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                viewRender        : function (view)
                {
                    vm.calendarView = view;
                    vm.calendar = vm.calendarView.calendar;
                    vm.currentMonthShort = vm.calendar.getDate().format('MMM');
                },
                columnFormat      : {
                    month: 'ddd',
                    week : 'ddd D',
                    day  : 'ddd M'
                },
                eventClick        : eventDetail,
                selectable        : true,
                selectHelper      : true,
                select            : select
            }
        };

        // Methods
        vm.addEvent = addEvent;
        vm.next = next;
        vm.prev = prev;

        //////////

        /**
         * Go to next on current view (week, month etc.)
         */
        function next()
        {
            vm.calendarView.calendar.next();
        }

        /**
         * Go to previous on current view (week, month etc.)
         */
        function prev()
        {
            vm.calendarView.calendar.prev();
        }

        /**
         * Show event detail
         *
         * @param calendarEvent
         * @param e
         */
        function eventDetail(calendarEvent, e)
        {
            showEventDetailDialog(calendarEvent, e);
        }

        /**
         * Add new event in between selected dates
         *
         * @param start
         * @param end
         * @param e
         */
        function select(start, end, e)
        {
            // showEventFormDialog('add', false, start, end, e);
        }

        /**
         * Add event
         *
         * @param e
         */
        function addEvent(e)
        {

        }

        /**
         * Show event detail dialog
         * @param calendarEvent
         * @param e
         */
        function showEventDetailDialog(calendarEvent, e)
        {
            $mdDialog.show({
                controller         : 'EventDetailDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/apps/calendar/dialogs/event-detail/event-detail-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : e,
                clickOutsideToClose: true,
                locals             : {
                    calendarEvent      : calendarEvent,
                    showEventFormDialog: showEventFormDialog,
                    event              : e
                }
            });
        }

        /**
         * Show event add/edit form dialog
         *
         * @param type
         * @param calendarEvent
         * @param start
         * @param end
         * @param e
         */
        function showEventFormDialog(type, calendarEvent, start, end, e)
        {
            var dialogData = {
                type         : type,
                calendarEvent: calendarEvent,
                start        : start,
                end          : end
            };

            $mdDialog.show({
                controller         : 'EventFormDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/apps/calendar/dialogs/event-form/event-form-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : e,
                clickOutsideToClose: true,
                locals             : {
                    dialogData: dialogData
                }
            }).then(function (response)
            {
                switch ( response.type )
                {
                  case 'add':
                        // Add new

                        break;

                    case 'edit':
                        // Edit

                        break;

                    case 'remove':
                        // Remove


                        break;
                }
            });
        }
    }

})();
