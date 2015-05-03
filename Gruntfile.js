module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      scrypt: {
        files: {
          'scrypt-async.min.js' : [ 'scrypt-async.js' ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['uglify']);

};
