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
        src: ['mocha/mocha.css', 'mocha/mocha.js'],
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

  grunt.event.on('coverage', function(lcov, done){
      require('coveralls').handleInput(lcov, function(err){
          if (err) {
              return done(err);
          }
          done();
      });
  });

  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('test', ['browserify', 'copy:test', 'mocha_istanbul']);
  grunt.registerTask('test_and_coveralls', ['browserify', 'copy:test', 'mocha_istanbul:coveralls']);
};
