const buildDir = 'build/';
const componentJs = 'src/landmarkAnnotator.component.js';
const jsOutput = 'landmark-annotator.js';
const cssOutput = 'landmark-annotator.css';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var dependencies = []; //No deps yet that aren't caught by browserify!

    var taskConfig = {
        bgShell: {
            test: {
                cmd: './node_modules/.bin/mocha src/**/*.spec.js'
            }
        },
        browserify: {
            build: {
                options: {
                    transform: [['babelify', {presets: ['react']}]],
                    watch: true,
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: [componentJs],
                dest: `${buildDir}${jsOutput}`
            }
        },
        clean: {
            build: ['build/']
        },
        connect: {
            dev: {
                options: {
                    open: true,
                    port: 9000,
                    livereload: 35729,
                    base: buildDir
                }
            }
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
            options: {
                livereload: true
            },
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
        'connect:dev',
        'watch'
    ]);

    grunt.registerTask('test', [
        'bgShell:test'
    ]);
};