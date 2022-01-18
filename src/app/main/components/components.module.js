(function ()
{
    'use strict';

    angular
        .module('app.components', [
            // 'app.components.cards',
            // 'app.components.charts.c3',
            // 'app.components.charts.chart-js',
            // 'app.components.charts.chartist',
            // 'app.components.charts.nvd3',
            // 'app.components.custom-directives',
            'app.components.maps',
            'app.components.new_ffs_maps',
            // 'app.components.price-tables',
            'app.components.tables.users',
            'app.components.tables.security',
            'app.components.tables.health',
            'app.components.tables.water',
            'app.components.tables.newFFSToolsGeneral',
            'app.components.tables.education',
            'app.components.tables.municipality',
            'app.components.tables.electricity',
            'app.components.tables.cash',
            'app.components.tables.situation',
            'app.components.tables.weekly',
          'app.components.tables.NewCashForWork',
            // 'app.components.widgets',
            // 'app.components.material-docs',
          'app.components.tables.IGPA',
          'app.components.tables.CRS',
          'app.components.tables.IMC',
          'app.components.tables.HAI',
          'app.components.tables.MENA',
          'app.components.tables.IOM',
          'app.components.tables.USIP',
          'app.components.tables.NEWSR',
          'app.components.tables.TopMountain'


        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    // msNavigationServiceProvider.saveItem('components.cards', {
    //     title : 'Cards',
    //     icon  : 'icon-content-copy',
    //     state : 'app.components_cards',
    //     weight: 3
    // });
    //
    // msNavigationServiceProvider.saveItem('components.charts', {
    //     title : 'Charts',
    //     icon  : 'icon-poll',
    //     weight: 4
    // });
    //
    // msNavigationServiceProvider.saveItem('components.charts.c3', {
    //     title: 'C3',
    //     state: 'app.components_charts_c3'
    // });
    //
    // msNavigationServiceProvider.saveItem('components.charts.chart-js', {
    //     title: 'Chart.js',
    //     state: 'app.components_charts_chart-js'
    // });
    //
    // msNavigationServiceProvider.saveItem('components.charts.chartist', {
    //     title: 'Chartist',
    //     state: 'app.components_charts_chartist'
    // });
    //
    // msNavigationServiceProvider.saveItem('components.charts.nvd3', {
    //     title: 'nvD3',
    //     state: 'app.components_charts_nvd3'
    // });
    //

    //
    // msNavigationServiceProvider.saveItem('components.price-tables', {
    //     title: 'Price Tables',
    //     icon : 'icon-view-carousel',
    //     state: 'app.components_price-tables',
    //     weight: 6
    // });
    //
    // msNavigationServiceProvider.saveItem('components.tables', {
    //     title: 'Tables',
    //     icon : 'icon-table-large',
    //     weight: 7
    // });

    // Navigation
    {
        msNavigationServiceProvider.saveItem('tables', {
            title : 'IFM Data Review',
            group : true,
            weight: 4
        });

      msNavigationServiceProvider.saveItem('tables.ifm', {
        title : 'IFM',
        icon  : 'icon-tile-four',
        weight: 1
      });

      msNavigationServiceProvider.saveItem('tables.ifm.users', {
        title: 'Users',
        state: 'app.users',
        weight: 1,
        hidden: function ()
        {
          return localStorage.getItem('UserType') !== 'admin';
        },
      });

      msNavigationServiceProvider.saveItem('apps.usaid.mapsold', {
          title: 'Old FFS Maps',
          icon : 'icon-map-marker',
          state: 'app.components_maps',
          weight: 1
      });
      msNavigationServiceProvider.saveItem('apps.usaid.maps', {
        title: 'New FFS Maps',
        icon : 'icon-map-marker',
        state: 'app.new_ffs_maps',
        weight: 1
      });


      msNavigationServiceProvider.saveItem('tables.ifm.security', {
        title: 'Security Management',
        state: 'app.security',
        weight: 11,
        hidden: function ()
        {

          return localStorage.getItem('UserType') !== 'admin';

        },
      });

      msNavigationServiceProvider.saveItem('tables.ifm.situation', {
        title: 'SitReps',
        state: 'app.situation',
        weight: 12
      });

      msNavigationServiceProvider.saveItem('tables.ifm.situation', {
        title: 'Top Mountain',
        state: 'app.TopMountain',
        weight: 13
      });

      //
      // msNavigationServiceProvider.saveItem('tables.ifm.health', {
      //   title: 'UNDP/FFS Health',
      //   state: 'app.health',
      //   weight: 13
      // });


      // msNavigationServiceProvider.saveItem('tables.ifm.cash', {
      //   title: 'UNDP/FFS Cash of work',
      //   state: 'app.cash',
      //   weight: 15
      // });
      //
      // msNavigationServiceProvider.saveItem('tables.ifm.electricity', {
      //   title: 'UNDP/FFS Electricity',
      //   state: 'app.electricity',
      //   weight: 16
      // });
      //
      // msNavigationServiceProvider.saveItem('tables.ifm.education', {
      //   title: 'UNDP/FFS Education',
      //   state: 'app.education',
      //   weight: 17
      // });
      //
      // msNavigationServiceProvider.saveItem('tables.ifm.municipality', {
      //   title: 'UNDP/FFS Municipality',
      //   state: 'app.municipality',
      //   weight: 18
      // });

      // msNavigationServiceProvider.saveItem('tables.ifm.water', {
      //   title: 'UNDP/FFS Water',
      //   state: 'app.water',
      //   weight: 19
      // });


      msNavigationServiceProvider.saveItem('tables.ifm.newFFSToolsGeneral', {
        title: 'UNDP/FFS Tool',
        state: 'app.newFFSToolsGeneral',
        weight: 21
      });


      msNavigationServiceProvider.saveItem('tables.ifm.weekly', {
        title: 'IFM Weekly Plan',
        state: 'app.weekly',
        weight: 20
      });

      msNavigationServiceProvider.saveItem('tables.ifm.NewCashForWork', {
        title: 'UNDP/FFS Cash 4 Work',
        state: 'app.NewCashForWork',
        weight: 22
      });
      msNavigationServiceProvider.saveItem('tables.ifm.IGPA', {
        title: 'USAID/IGPA',
        state: 'app.IGPA',
        weight: 23
      });

      msNavigationServiceProvider.saveItem('tables.ifm.CRS', {
        title: 'USAID/CRS',
        state: 'app.CRS',
        weight: 24
      });

      msNavigationServiceProvider.saveItem('tables.ifm.IMC', {
        title: 'USAID/IMC',
        state: 'app.IMC',
        weight: 25
      });

      msNavigationServiceProvider.saveItem('tables.ifm.HAI', {
        title: 'USAID/HAI',
        state: 'app.HAI',
        weight: 26
      });

      msNavigationServiceProvider.saveItem('tables.ifm.MENA', {
        title: 'USAID/MENA',
        state: 'app.MENA',
        weight: 27
      });

      msNavigationServiceProvider.saveItem('tables.ifm.IOM', {
        title: 'USAID/IOM',
        state: 'app.IOM',
        weight: 28
      });

      msNavigationServiceProvider.saveItem('tables.ifm.USIP', {
        title: 'USAID/USIP',
        state: 'app.USIP',
        weight: 29
      });
      msNavigationServiceProvider.saveItem('tables.ifm.NEWSR', {
        title: 'SitRep',
        state: 'app.NEWSR',
        weight: 30
      });
      msNavigationServiceProvider.saveItem('tables.ifm.TopMountain', {
        title: 'Top Mountain',
        state: 'app.TopMountain',
        weight: 31
      });

    }
})();
