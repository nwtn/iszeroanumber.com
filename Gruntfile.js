module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		/* OPTIMIZE IMAGES */
		imageoptim: {
			blamo: {
				options: {
					quitAfter: true
				},
				src: ['src'],
				dest: 'build/'
			}
		},


		/* CLEAN BUILD DIRECTORY */
        clean: {
			build: {
				src:	'build',
			}
		},


		/* COPY FILES */
        copy: {
			site: {
				expand:	true,
				cwd:	'src',
				src:	['*.*', '.htaccess', 'img/*.png'],
				dest:	'build/',
			},

			extras: {
				expand:	true,
				cwd:	'.',
				src:	['README.md', 'LICENSE'],
				dest:	'build/',
			}
		},


		/* CONCATENATE CSS AND JS */
		concat: {
			options: {
				process:		true,
				stripBanners:	{
					block:		true,
					line:		true
				}
			},

			/* CSS */
			css: {
				src:	[
						'src/css/normalize.css',
						'src/css/h5bp.css',
						'src/css/default.css'
				],
				dest:	'build/css/style.css'
			},

			/* Top-of-page JS */
			top: {
				src:	[
						'src/js/html5shiv.js'
				],
				dest:	'build/js/top.js'
			},

			/* Bottom-of-page JS */
			bottom: {
				src:	[
						'src/js/typekit.js'
				],
				dest:	'build/js/bottom.js'
			}
		},


		/* AUTO-PREFIX CSS */
		autoprefixer: {
			css: {
				expand: true,
				cwd: 'build',
				src: [ '**/*.css' ],
				dest: 'build'
			}
		},


		/* MINIFY CSS */
		cssmin: {
			options: {
				keepSpecialComments: 0,
			},
			minify: {
				expand: true,
				cwd: 'build/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'build/css/',
				ext: '.min.css'
			}
		},


		/* MINIFY JS */
		uglify: {
			options: {
				mangle:				true,
				compress:			true,
				report:				true,
				preserveComments:	false
			},

			/* Top-of-file JS */
			top: {
				files: {
					'build/js/top.min.js': ['build/js/top.js']
				}
			},

			/* Bottom-of-file JS */
			bottom: {
				files: {
					'build/js/bottom.min.js': ['build/js/bottom.js']
				}
			}
		}
	});


	grunt.registerTask('default', ['imageoptim', 'clean', 'copy', 'concat', 'autoprefixer', 'uglify', 'cssmin']);

	grunt.loadNpmTasks('grunt-imageoptim');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
};
