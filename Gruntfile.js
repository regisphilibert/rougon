// For performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all sub-folders, use:
// 'test/spec/**/*.js'

'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    //-----------------------------------------------------------------------------------------------IMPORT-package.json


    pkg: grunt.file.readJSON('package.json'),


    //-----------------------------------------------------------------------------------------------------CONFIG-OBJECT


    config: {
      src: {
        root: 'themes/rougon/src',
        //fonts: '<%= config.src.root %>/fonts/{,*/}*.{woff,woff2,ttf,eot,svg}',
        //html: '<%= config.src.root %>/pug',
        images: '<%= config.src.root %>/images/',
        scripts: '<%= config.src.root %>/assets/js/{,*/}*.js',
        styles: '<%= config.src.root %>/sass'
      },
      dist: {
        root: 'themes/rougon/static',
        //fonts: '<%= config.dist.root %>/fonts',
        html: '../../production',
        //images: '<%= config.dist.root %>/img',
        scripts: '<%= config.dist.root %>/js',
        styles: '<%= config.dist.root %>/css',
        //assets: '<%= config.dist.root %>/assets'
      }
    },


    //--------------------------------------------------------------------------------------------------------CLEAN-DIST


    clean: {
      dist: ['<%= config.dist.root %>']
    },


    //---------------------------------------------------------------------------------------------------------SASS/SCSS

    // grunt-contrib-sass (need to be installed)
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          style: 'compressed', // nested, compact, compressed, expanded
          quiet: true,
        },
        files: [{
          expand: true,
          cwd: '<%= config.src.styles %>',
          src: ['{,*!/}*.{scss,sass}'],
          dest: '<%= config.dist.styles %>',
          ext: '.css'
        }]
      }
    },

    //--------------------------------------------------------------------------------------------------------------COPY

    copy: {
      main: {
        expand: true,
        cwd: '<%= config.src.root %>/assets',
        src: '**',
        dest: '<%= config.dist.root %>/',
      },
    },

    //-------------------------------------------------------------------------------------------------------------WATCH


    watch: {
      css: {
        files: '<%= config.src.styles %>/**/*.scss',
        tasks: ['sass:dist'],
        options: {
          spawn: false,
        },
      },
      js: {
        files: '<%= config.src.scripts %>',
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
    },
  });

  //------------------------------------------------------------------------------------------------------LOAD-NPM-TASKS


  // load npm tasks, these plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies',
    pattern: ['grunt-*']
  });


  //------------------------------------------------------------------------------------------------------REGISTER-TASKS


  // Default taskg
  grunt.registerTask('default', [
    'sass:dist', 'copy:main', 'watch'
  ]);
  // Stage task for stage environement
  grunt.registerTask('stage', [
    'sass:dist', 'copy:main'
  ]);
  grunt.registerTask('production', [
    'sass:dist', 'copy:main'
  ]);
};