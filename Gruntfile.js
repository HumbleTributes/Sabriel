// Generated on 2015-05-16 using
// generator-webapp-advanced 0.0.11
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      images: {
        files: ['<%= config.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg}'],
        tasks: ['newer:responsive_images', 'newer:copy:images']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint', 'newer:copy:scripts'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer', 'newer:copy:images']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      assemble: {
        files: [
          '<%= config.app %>/templates/layouts/*.hbs',
          '<%= config.app %>/templates/pages/*.hbs',
          '<%= config.app %>/templates/partials/*.hbs',
          '<%= config.app %>/templates/data/*.json'
        ],
        tasks: ['assemble:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.tmp/{,*/}*.html',
          '.tmp/css/{,*/}*.css',
          '.tmp/js/{,*/}*.js',
          '.tmp/images/{,*/}*.{gif,jpeg,jpg,png,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '!Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        loadPath: 'bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/css',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/css',
          ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^<%= config.app %>\/|\.\.\//,
        src: ['<%= config.app %>/templates/{,*/}*.hbs', '.tmp/{,*/}*.html']
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/js/{,*/}*.js',
            '<%= config.dist %>/css/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,svg}',
            '<%= config.dist %>/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '.tmp/{,*/}*.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/css',
          '<%= config.dist %>/js'
        ],
        patterns: {
          js: [
            [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      },
      html: ['<%= config.dist %>/{,*/}*.html',
      '.tmp/{,*/}*.html'],
      css: ['<%= config.dist %>/css/{,*/}*.css'],
      js: ['<%= config.dist %>/js/*.main.js']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '.tmp',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'fonts/{,*/}*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }, {
          src: 'CNAME',
          dest: '<%= config.dist %>/CNAME'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/css/',
        src: '{,*/}*.css'
      },
      scripts: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/scripts',
        dest: '.tmp/js/',
        src: '{,*/}*.js'
      },
      images: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/images',
        dest: '.tmp/images/',
        src: '{,*/}*.{gif,jpeg,jpg,png,svg}'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/js/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/js/{,*/}*.js',
            '<%= config.dist %>/css/{,*/}*.css',
            '!<%= config.dist %>/js/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'sass:server',
        'copy:styles',
        'copy:scripts',
        'assemble:server',
        'copy:images'
      ],
      test: [
        'copy:styles',
        'copy:scripts'
      ],
      dist: [
        'sass',
        'copy:styles',
        'copy:scripts',
        'assemble:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Using the Assemble plugin to provide templating
    assemble: {
      options: {
        flatten: true,
        layout: 'default.hbs',
        layoutdir: '<%= config.app %>/templates/layouts',
        assets: '<%= config.dist %>/images',
        data: ['<%= config.app %>/templates/data/*.{json,yml}'],
        partials: ['<%= config.app %>/templates/partials/*.hbs']
      },
      server: {
        options: {
          production: false
        },
        files: [{
          cwd: '<%= config.app %>/templates/pages/',
          dest: '.tmp/',
          expand: true,
          src: ['**/*.hbs', '!_pages/**/*.hbs']
        }],
      },
      dist: {
        options: {
          production: true
        },
        files: [{
          cwd: '<%= config.app %>/templates/pages/',
          dest: '.tmp/',
          expand: true,
          src: ['**/*.hbs', '!_pages/**/*.hbs']
        }],
      }
    },

    // Run Uncss and remove all redundant CSS
    uncss: {
      dist: {
        options: {
          stylesheets: ['../.tmp/css/main.css']
        },
        files: {
          '.tmp/css/main.css': ['dist/index.html']
        }
      }
    },

    // Generate all instances of Favicons known to man!!!
    favicons: {
      options: {
        trueColor: true,
        precomposed: true,
        appleTouchBackgroundColor: '#FFFFFF',
        coast: true,
        windowsTile: true,
        tileBlackWhite: false,
        tileColor: 'auto',
        // html: '<%= config.dist %>/index.html',
        // HTMLPrefix: '/images/icons/'
      },
      icon: {
        src: '<%= config.app %>/images/favicons/favicon.png',
        dest: '<%= config.dist %>/images/favicons'
      }
    },

    // Deploy to Github Pages!!!
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:HumbleTributes/Sabriel.git',
          branch: 'gh-pages'
        }
      },
      local: {
        options: {
          remote: '../',
          branch: 'build'
        }
      }
    },

    responsive_images: {
      create: {
        options: {
          newFilesOnly: false,
          sizes: [{
            name: 'default',
            width: 320
          },{
            name: 'small',
            width: 480
          },{
            name: 'medium',
            width: 600
          },{
            name: 'large',
            width: 900
          },{
            name: 'xlarge',
            width: 1200
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpeg,jpg,png}'],
          cwd: '<%= config.app %>/images',
          custom_dest: '<%= config.app %>/images/{%= name %}/'
        }]
      }
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'responsive_images',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'responsive_images',
    'concurrent:dist',
    'wiredep',
    'useminPrepare',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'modernizr',
    'favicons',
    'rev',
    'usemin',
    'htmlmin',
    'buildcontrol'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
