(function ()
{
    'use strict';

    angular
        .module('app.ui', [
            'app.ui.forms.security',
            'app.ui.forms.health',
            'app.ui.forms.water',
            'app.ui.forms.cash',
            'app.ui.forms.situation',
            'app.ui.forms.education',
            'app.ui.forms.electricity',
            'app.ui.forms.municipality',
            'app.ui.forms.NewFFSGeneral',
            'app.ui.forms.NewCashForWork',
            'app.ui.forms.IGPATool',
             'app.ui.forms.IOM',
            'app.ui.forms.CRS',
            'app.ui.forms.IMC',
            'app.ui.forms.HAI',
            'app.ui.forms.MENA',
            'app.ui.forms.USIP',
            'app.ui.forms.NEWSR',
            'app.ui.forms.TopMountain',

        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {


        // Navigation
        msNavigationServiceProvider.saveItem('ui', {
            title : 'IFM Data Entry',
            group : true,
            weight: 3
        });

      msNavigationServiceProvider.saveItem('ui.ifm', {
        title : 'IFM',
        icon  : 'icon-tile-four',
        weight: 1
      });

      msNavigationServiceProvider.saveItem('ui.ifm.security', {
        title: 'Security Form',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-security',
        hidden: function ()
        {

          return localStorage.getItem('UserType') !== 'admin';

        },
      });

      // msNavigationServiceProvider.saveItem('ui.ifm.situation', {
      //   title: 'SitReps Form',
      //   icon : 'icon-window-restore',
      //   state: 'app.ui_forms-situation'
      // });
      //
      // msNavigationServiceProvider.saveItem('ui.ifm.health', {
      //   title: 'UNDP/FFS Health',
      //   icon : 'icon-window-restore',
      //   state: 'app.ui_forms-health'
      // });
      //
      // msNavigationServiceProvider.saveItem('ui.ifm.cash', {
      //   title: 'UNDP/FFS Cash of work',
      //   icon : 'icon-window-restore',
      //   state: 'app.ui_forms-cash'
      // });
      //
      // msNavigationServiceProvider.saveItem('ui.ifm.electricity', {
      //   title: 'UNDP/FFS Electricity',
      //   icon : 'icon-window-restore',
      //   state: 'app.ui_forms-electricity'
      // });
      //
      // msNavigationServiceProvider.saveItem('ui.ifm.education', {
      //   title: 'UNDP/FFS Education',
      //   icon : 'icon-window-restore',
      //   state: 'app.ui_forms-education'
      // });
      //
      // msNavigationServiceProvider.saveItem('ui.ifm.municipality', {
      //   title: 'UNDP/FFS Municipality',
      //   icon : 'icon-window-restore',
      //   state: 'app.ui_forms-municipality'
      // });
      //
      // msNavigationServiceProvider.saveItem('ui.ifm.water', {
      //   title: 'UNDP/FFS Water',
      //   icon : 'icon-window-restore',
      //   state: 'app.ui_forms-water'
      // });

      msNavigationServiceProvider.saveItem('ui.ifm.NewFFSGeneral', {
        title: 'UNDP/FFS General',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-NewFFSGeneral'
      });

      msNavigationServiceProvider.saveItem('ui.ifm.NewCashOfWork', {
        title: 'UNDP/FFS Cash 4 Work',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-NewCashOfWork'
      });

      msNavigationServiceProvider.saveItem('ui.ifm.IGPATool', {
        title: 'IGPA',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-IGPATool'
      });

      msNavigationServiceProvider.saveItem('ui.ifm.CRSTool', {
        title: 'CRS',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-CRS'
      });

      msNavigationServiceProvider.saveItem('ui.ifm.IMCTool', {
        title: 'IMC',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-IMC'
      });

      msNavigationServiceProvider.saveItem('ui.ifm.HAITool', {
        title: 'HAI',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-HAI'
      });

      msNavigationServiceProvider.saveItem('ui.ifm.MENATool', {
        title: 'MENA',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-MENA'
      });

      msNavigationServiceProvider.saveItem('ui.ifm.IOMTool', {
        title: 'IOM',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-IOM'
      });

      msNavigationServiceProvider.saveItem('ui.ifm.USIPTool', {
        title: 'USIP',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-USIP'
      });

      msNavigationServiceProvider.saveItem('ui.ifm.NEWSR', {
        title: 'SitRep',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-NEWSR'
      });

      msNavigationServiceProvider.saveItem('ui.ifm.TopMountain', {
        title: 'TopMountain',
        icon : 'icon-window-restore',
        state: 'app.ui_forms-TopMountain'
      });

    }
})();
