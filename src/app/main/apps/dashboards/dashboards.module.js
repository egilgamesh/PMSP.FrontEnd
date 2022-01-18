(function ()
{
    'use strict';

    angular
        .module('app.dashboards',
            [
              'app.dashboards.home',
              'app.dashboards.undp',
              'app.dashboards.tut',
              'app.dashboards.sitrep',
              'app.dashboards.taqadum',
              'app.dashboards.server',
              'app.dashboards.CRS',
              'app.dashboards.HAI',
              'app.dashboards.MENA',
              'app.dashboards.IOM',
              'app.dashboards.USIP',
              'app.dashboards.IMC',
              'app.dashboards.IGPA',
              'app.dashboards.FFS',
              'app.dashboards.Metabase',
              'app.dashboards.TopMountain',

            ]
        )
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {

      msNavigationServiceProvider.saveItem('Home', {
        title : 'Home',
        group : false,
        icon  : 'icon-home',
        weight: 1,
        state: 'app.dashboards_home.home'
      });

      msNavigationServiceProvider.saveItem('Metabase', {
        title: 'UNDP/FFS Statics',
        group : false,
        icon  : 'icon-tile-four',
        weight: 1,
        state: 'app.dashboards_FFS_Metabase',
        hidden: function ()
        {
          return localStorage.getItem('UserType') !== 'admin';
        },
      });

      msNavigationServiceProvider.saveItem('USAID', {
        title : 'ACTIVE',
        group : true,
        weight: 1
      });

      msNavigationServiceProvider.saveItem('USAID.activities', {
        title : 'USAID',
        icon  : 'icon-tile-four',
        weight: 1
      });

      msNavigationServiceProvider.saveItem('USAID.activities.CRS', {
        title: 'USAID/CRS',
        icon  : 'icon-clipboard-check',
        state: 'app.dashboards_CRS.CRS'
      });

      msNavigationServiceProvider.saveItem('USAID.activities.HAI', {
        title: 'USAID/HAI',
        icon  : 'icon-clipboard-check',
        state: 'app.dashboards_HAI.HAI'
      });

      msNavigationServiceProvider.saveItem('USAID.activities.MENA', {
        title: 'USAID/MENA',
        icon  : 'icon-clipboard-check',
        state: 'app.dashboards_MENA.MENA'
      });

      msNavigationServiceProvider.saveItem('USAID.activities.IOM', {
        title: 'USAID/IOM',
        icon  : 'icon-clipboard-check',
        state: 'app.dashboards_IOM.IOM'
      });

      msNavigationServiceProvider.saveItem('USAID.activities.USIP', {
        title: 'USAID/USIP',
        icon  : 'icon-clipboard-check',
        state: 'app.dashboards_USIP.USIP'
      });

      msNavigationServiceProvider.saveItem('USAID.activities.TopMountain', {
        title: 'USAID/TopMountain',
        icon  : 'icon-clipboard-check',
        state: 'app.dashboards_TopMountain.TopMountain'
      });

        msNavigationServiceProvider.saveItem('apps', {
            title : 'ARCHIVE',
            group : true,
            weight: 1
        });


      msNavigationServiceProvider.saveItem('apps.usaid', {
        title : 'USAID',
        icon  : 'icon-tile-four',
        weight: 1
      });

        msNavigationServiceProvider.saveItem('USAID.activities.FFS', {
            title: 'UNDP/FFS',
            icon  : 'icon-clipboard-check',
            state: 'app.dashboards_FFS.NewGeneralFFSTool'
        });


      msNavigationServiceProvider.saveItem('USAID.activities.IGPA', {
        title: 'USAID/IGPA',
        icon  : 'icon-clipboard-check',
        state: 'app.dashboards_IGPA.IGPA'
      });


      msNavigationServiceProvider.saveItem('USAID.activities.IMC', {
        title: 'USAID/IMC',
        icon  : 'icon-clipboard-check',
        state: 'app.dashboards_IMC.IMC',
      });



      msNavigationServiceProvider.saveItem('apps.usaid.undp', {
        title: 'UNDP/FFS Archived',
        icon  : 'icon-clipboard-text',
        state: 'app.dashboards_undp.health'
      });

      msNavigationServiceProvider.saveItem('apps.usaid.taqadum', {
        title: 'Taqadum',
        icon  : 'icon-folder-multiple',
        state: 'app.dashboards_taqadum.report'
      });

      msNavigationServiceProvider.saveItem('apps.usaid.sitrep', {
        title: 'SitRep',
        icon  : 'icon-code-string',
        state: 'app.dashboards_sitrep.SitRep'
      });


      msNavigationServiceProvider.saveItem('apps.usaid.server', {
        title: 'SitRep Analysis',
        icon  : 'icon-chart-areaspline',
        state: 'app.dashboards_sitrepAnalysis.thisWeek'
      });


      // msNavigationServiceProvider.saveItem('apps.usaid.tut', {
      //   title: 'Tutorial',
      //   icon  : 'icon-chart-areaspline',
      //   state: 'app.dashboards_tut.introTut',
      //   weight: 100
      // });

    }


})();
