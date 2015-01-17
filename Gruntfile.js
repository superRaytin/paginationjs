// grunt
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*\n' +
                    ' * pagination.js <%= pkg.version %>\n' +
                    ' * <%= pkg.description %>\n' +
                    ' * https://github.com/superRaytin/paginationjs\n\n' +
                    ' * Homepage: http://paginationjs.com\n' +
                    ' *\n' +
                    ' * Copyright 2014-2100, superRaytin\n' +
                    ' * Released under the MIT license.\n' +
                    '*/\n'
            },
            main: {
                files: [
                    {
                        src: ['dist/pagination.js'],
                        dest: 'dist/pagination.min.js'
                    },
                    {
                        src: ['dist/pagination-with-styles.js'],
                        dest: 'dist/pagination-with-styles.min.js'
                    }
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};