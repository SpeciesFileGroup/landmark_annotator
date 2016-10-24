module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var dependencies = []; //No deps yet that aren't caught by browserify!

    var taskConfig = {
        bgShell: {
            serve: {
                cmd: './node_modules/.bin/live-server build/'
            }
        },
        browserify: {
            build: {
                options: {
                    transform: [['babelify', {presets: ['react']}]],
                    watch: true
                },
                src: ['src/**/*.js'],
                dest: 'build/main.js'
            }
        },
        clean: {
            build: ['build/']
        },
        copy: {
            build: {
                files: [
                    {
                        src: 'demo/index.html',
                        dest: 'build/index.html'
                    },
                    {
                        src: [dependencies],
                        dest: 'build/',
                        expand: true,
                        flatten: true
                    }
                ]
            }
        }
    };

    grunt.initConfig(taskConfig);

    grunt.registerTask('build', [
        'clean:build',
        'copy:build',
        'browserify:build'
    ]);

    grunt.registerTask('serve', [
        'build',
        'bgShell:serve'
    ]);
};