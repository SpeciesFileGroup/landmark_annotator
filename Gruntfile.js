const buildDir = 'build/';
const jsOutput = 'landmark-annotator.js';
const cssOutput = 'landmark-annotator.css';

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
                dest: `${buildDir}${jsOutput}`
            }
        },
        clean: {
            build: ['build/']
        },
        copy: {
            build: {
                files: [
                    {
                        src: 'demo/**',
                        dest: buildDir,
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        src: [dependencies],
                        dest: buildDir,
                        expand: true,
                        flatten: true
                    }
                ]
            }
        },
        stylus: {
            build: {
                options: {
                    compress: false
                },
                files: [{
                    src: ['src/styles.styl'],
                    dest: `${buildDir}${cssOutput}`
                }]
            }
        },
        watch: {
            stylus: {
                files: ['src/**/*.styl'],
                tasks: ['stylus:build']
            }
        }
    };

    grunt.initConfig(taskConfig);

    grunt.registerTask('build', [
        'clean:build',
        'copy:build',
        'browserify:build',
        'stylus:build'
    ]);

    grunt.registerTask('serve', [
        'build',
        'bgShell:serve'
    ]);
};