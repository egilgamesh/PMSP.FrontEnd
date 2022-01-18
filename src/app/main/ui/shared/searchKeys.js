(function ()
{
  'use strict';
  angular.module('fuse').filter('searchKeys', function() {
    return function(items, search) {


      var filtered = [];
      if (search) {
        angular.forEach(items, function(item) {

          if (search === "G") {

            if (item.section.length) {
              if (item.section.substring(0,1) === search || item.section.substring(0,1) === 'm' || item.section.substring(0,1) === 'i') {
                filtered.push(item);
              }
            }

          } else {
            if (item.section.length) {
              if (item.section.substring(0,2) === search) {
                filtered.push(item);
              }
            }

          }

        });
      }else{
        filtered=items;
      }
      return filtered;
    }
  });
})();

