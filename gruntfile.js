module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                livereload: true,
            },

            html:{
                files: ['*.php']
            },

            sass: {
                files: ['scss/**/*.scss'],   //Carpetas donde se buscaran cambios
                tasks: ['sass']
            },

            scripts: {
                files: ['js/*.js'],
                tasks: ['uglify']
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed',//Estilo de salida
                    noCache: true       //Crear cache
                },
                files: [{
                    expand: true,       //Busca en todas las carpetas
                    cwd:    'scss',     //Carpeta de origen
                    src:    ['*.scss'], //Que archivos buscara
                    dest:   'assets/css', //Carpeta de destino
                    ext:    '.min.css'  //Extension de salida del css
                }]
            }
        },

        uglify: {
            iomy_target: {
                files: {

                    'assets/js/final.min.js': ['js/main.js']               
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('default', ['sass']);
    grunt.registerTask('default', ['uglify']);
};