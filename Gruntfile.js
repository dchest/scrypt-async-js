module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      unittests: {
        files: {
          'test/lib/unittests-bundle.js': [ './test/unittests.js' ]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: './test'
        }
      }
    },
    copy: {
      test: {
        expand: true,
        flatten: true,
        cwd: 'node_modules/',
        src: ['mocha/mocha.css', 'mocha/mocha.js', 'chai/chai.js'],
        dest: 'test/lib/'
      }
    },
    mocha_istanbul: {
      coveralls: {
        src: ['test'],
        options: {
          coverage:true,
          timeout: 6000,
          reportFormats: ['cobertura','lcovonly']
        }
      }
    },
    mocha_phantomjs: {
      all: ['test/**/*.html']
    },
    'saucelabs-mocha': {
      all: {
        options: {
          username: process.env.SAUCE_USERNAME,
          key: process.env.SAUCE_ACCESS_KEY,
          urls: ['http://127.0.0.1:3000/unittests.html'],
          build: process.env.TRAVIS_JOB_ID,
          testname: 'Sauce Unit Test for scrypt-async-js',
          browsers: [
            {
              browserName: "safari",
              platform: "OS X 10.10"
            },
            {
              browserName: "chrome",
              platform: "OS X 10.10"
            },
            {
              browserName: "firefox",
              platform: "OS X 10.10"
            },
            {
              browserName: "internet explorer",
              version: "11",
              platform: "Windows 8.1"
            },
            {
              browserName: "internet explorer",
              version: "10",
              platform: "Windows 8"
            },
            {
              browserName: "internet explorer",
              version: "9",
              platform: "Windows 7"
            },
            {
              browserName: "internet explorer",
              version: "8",
              platform: "Windows 7"
            },
            {
              browserName: "chrome",
              platform: "Windows 8.1"
            },
            {
              browserName: "firefox",
              platform: "Windows 8.1"
            },
            {
              browserName: "iphone",
              platform: "OS X 10.10",
              version: "8.2"
            },
            {
              browserName: "chrome",
              platform: "Linux"
            },
            {
              browserName: "firefox",
              platform: "Linux"
            }
          ],
          public: "public",
          maxRetries: 3,
          throttled: 2,
          pollInterval: 4000,
          statusCheckAttempts: 200
        }
      },
    },
    uglify: {
      scrypt: {
        options: {
          preserveComments: 'some'
        },
        files: {
          'scrypt-async.min.js' : [ 'scrypt-async.js' ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-istanbul')
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-saucelabs');

  grunt.event.on('coverage', function(lcov, done){
      require('coveralls').handleInput(lcov, function(err){
          if (err) {
              return done(err);
          }
          done();
      });
  });

  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('test', ['browserify', 'copy:test', 'mocha_istanbul', 'mocha_phantomjs']);
  grunt.registerTask('test_and_coveralls', ['browserify', 'copy:test', 'mocha_istanbul:coveralls', 'mocha_phantomjs']);
  grunt.registerTask('saucelabs', ['connect', 'saucelabs-mocha']);
};
