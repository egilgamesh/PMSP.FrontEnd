(function ()
{
    'use strict';

    angular.module('app.calendar')
        .controller('EventFormDialogController', EventFormDialogController);

    /** @ngInject */
    function EventFormDialogController($mdDialog, dialogData, api)
    {
        var vm = this;

        // Data
        vm.dialogData = dialogData;
        vm.notifications = ['15 minutes before', '30 minutes before', '1 hour before'];
        vm.projects = [
          {name: 'GSP', value: 'GSP'},
          {name: 'FFS', value: 'FFS'},
          {name: 'SitRep', value: 'SitRep'},
          {name: 'Writing Report', value: 'WritingReport'},
          ];

      vm.states  = [


        'Anbar',
        'Babil',
        'Baghdad', 'Basrah',
        'Dhi Qar',
        'Diwaniyah',
        'Diyala',
        'Karbala',
        'Kirkuk',
        'Maysan',
        'Muthanna',
        'Najaf',
        'Ninawa',
        'Salah Ad Din',
        'Wasit',
        'Erbil'


      ];

      vm.statuses = [
        {value: 'waiting', name: 'Waiting'},
        {value: 'canceled', name: 'Canceled'},
        {value: 'done', name: 'Done'}
      ];

        // Methods
        vm.saveEvent = saveEvent;
        vm.removeEvent = removeEvent;
        vm.closeDialog = closeDialog;

        init();

        //////////

        /**
         * Initialize
         */
        function init()
        {

            // Figure out the title
            switch ( vm.dialogData.type )
            {
                case 'add' :
                    vm.dialogTitle = 'Add Event';
                    break;

                case 'edit' :
                    vm.dialogTitle = 'Edit Event';
                    break;

                default:
                    break;
            }

            // Edit
            if ( vm.dialogData.calendarEvent )
            {
                // Clone the calendarEvent object before doing anything
                // to make sure we are not going to brake FullCalendar
                vm.calendarEvent = angular.copy(vm.dialogData.calendarEvent);

                // Convert moment.js dates to javascript date object
                if ( moment.isMoment(vm.calendarEvent.start) )
                {
                    vm.calendarEvent.start = vm.calendarEvent.start.toDate();
                }

                if ( moment.isMoment(vm.calendarEvent.end) )
                {
                    vm.calendarEvent.end = vm.calendarEvent.end.toDate();
                }
            }
            // Add
            else
            {
                // Convert moment.js dates to javascript date object
                if ( moment.isMoment(vm.dialogData.start) )
                {
                    vm.dialogData.start = vm.dialogData.start.toDate();
                }

                if ( moment.isMoment(vm.dialogData.end) )
                {
                    vm.dialogData.end = vm.dialogData.end.toDate();
                }

                vm.calendarEvent = {
                    start        : vm.dialogData.start,
                    end          : vm.dialogData.end,
                    notifications: []
                };
            }
        }

        /**
         * Save the event
         */
        function saveEvent()
        {
            // Convert the javascript date objects back to the moment.js dates
            var dates = {
                start: moment.utc(vm.calendarEvent.start).format('Y-MM-DD'),
                end  : moment.utc(vm.calendarEvent.end).format('Y-MM-DD')
            };

            var response = {
                type         : vm.dialogData.type,
                calendarEvent: angular.extend({}, vm.calendarEvent, dates)
            };


          switch ( vm.dialogData.type )
          {
            case 'add' :
              api.weeklySummary.list.save(response,

                // Success
                function (res)
                {
                  console.log(response);
                  response.calendarEvent.id = res.id;
                  $mdDialog.hide(response);

                },

                // Error
                function (response)
                {
                  console.error(response);
                }
              );
              break;

            case 'edit' :
              api.weeklySummary.list.save(response,

                // Success
                function (res)
                {
                  console.log(response);
                  response.calendarEvent.id = res.id;
                  $mdDialog.hide(response);

                },

                // Error
                function (response)
                {
                  console.error(response);
                }
              );
              break;

            default:
              break;
          }




        }

        /**
         * Remove the event
         */
        function removeEvent()
        {
            var response = {
                type         : 'remove',
                calendarEvent: vm.calendarEvent
            };

            $mdDialog.hide(response);
        }

        /**
         * Close the dialog
         */
        function closeDialog()
        {
            $mdDialog.cancel();
        }
    }
})();
