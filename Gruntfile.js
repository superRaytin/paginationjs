
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*\n' +
                    ' * pagination.js <%= pkg.version %>\n' +
                    ' * <%= pkg.description %>\n' +
                    ' * <%= pkg.repository.url %>\n\n' +
                    ' * Homepage: <%= pkg.homepage %>\n' +
                    ' *\n' +
                    ' * Copyright 2014-2100, <%= pkg.author %>\n' +
                    ' * Released under the <%= pkg.license %> license.\n' +
                    '*/\n'
            },
            main: {
                files: [
                    {
                        src: ['src/pagination.js'],
                        dest: 'dist/pagination.min.js'
                    }
                ]
            }
        },

        copy: {
            main: {
                files: [
                    {
                        src: 'src/pagination.js',
                        dest: 'dist/pagination.js'
                    },
                    {
                        src: 'src/pagination.less',
                        dest: 'dist/pagination.less'
                    }
                ]
            }
        },

        less: {
            main: {
                src: 'src/pagination.less',
                dest: 'dist/pagination.css'
            }
        },

        cssmin: {
            main: {
                src: 'dist/pagination.css',
                dest: 'dist/pagination.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        'uglify',
        'copy',
        'less',
        'cssmin'
    ]);
};