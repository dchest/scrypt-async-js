module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      unittests: {
        files: {
          'test/lib/unittests-bundle.js': [ './test/unittests.js' ]
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
      coverage: {
        src: 'test'
      },
      coveralls: {
        src: ['test'],
        options: {
          coverage:true,
          reportFormats: ['cobertura','lcovonly']
        }
      }
    },
    mocha_phantomjs: {
      all: ['test/**/*.html']
    },
    mochaTest: {
      unittests: {
        options: {
          reporter: 'spec'
        },
        src: [ 'test/unittests.js' ]
      }
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-istanbul')
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.event.on('coverage', function(lcov, done){
      require('coveralls').handleInput(lcov, function(err){
          if (err) {
              return done(err);
          }
          done();
      });
  });

  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
  grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
  grunt.registerTask('test', ['browserify', 'copy:test', 'mochaTest', 'mocha_phantomjs']);
};
