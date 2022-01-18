/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

console.log('sudo rm -rf /var/www/pmspV2/public/assets');
console.log('sudo rm -rf /var/www/pmspV2/public/scripts');
console.log('sudo rm -rf /var/www/pmspV2/public/styles');
console.log('sudo rm -rf /var/www/pmspV2/public/maps');
console.log('sudo rm -rf /var/www/pmspV2/public/app');
console.log('sudo cp -r /var/www/PMSPDatabaseFrontEnd/dist/* /var/www/pmspV2/public/');
console.log('sudo mv /var/www/pmspV2/public/index.html /var/www/pmspV2/public/main.php');

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

