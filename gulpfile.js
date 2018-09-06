var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    copy = require('gulp-copy'),
    combiner = require('stream-combiner2');

const paths = {
	plain: {
		src: 'simpleSocialShare.js',
		dest: ''
	},
	jquery: {
		src: 'jquery.simpleSocialShare.js',
		dest: ''
    }
}

// Compile jQuery
gulp.task('compileJquery', () => {

    var combined = combiner.obj([

        gulp.src(paths.jquery.src)
            .pipe(jshint({
                "strict": true,
                "scripturl": true,
                "devel": true,
                "curly": true,
                "undef": true,
                "unused": true,
                "eqeqeq": true,
                "eqnull": true,
                "browser": true,
                "camelcase": false,
                "esversion": 6,
                "jquery": true,
                "globals": {
                    "linkMt": true
                }
            }))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint().on('error', errorAlert))
            //.pipe(concat('app.js'))
            //.pipe(gulp.dest(paths.plain.dest))
            .pipe(uglify().on('error', errorAlert))
            .pipe(rename('jquery.simpleSocialShare.min.js'))
            .pipe(gulp.dest(paths.jquery.dest))

    ]);

    combined.on('error', console.error.bind(console));

    return combined;
});

// Compile plain
gulp.task('compilePlain', () => {

    var combined = combiner.obj([

        gulp.src(paths.plain.src)
            .pipe(jshint({
                "strict": true,
                "scripturl": true,
                "devel": true,
                "curly": true,
                "undef": true,
                "unused": true,
                "eqeqeq": true,
                "eqnull": true,
                "browser": true,
                "camelcase": false,
                "esversion": 6,
                "jquery": false,
                "globals": {
                    "linkMt": true
                }
            }))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint().on('error', errorAlert))
            //.pipe(concat('app.js'))
            //.pipe(gulp.dest(paths.plain.dest))
            .pipe(uglify().on('error', errorAlert))
            .pipe(rename('simpleSocialShare.min.js'))
            .pipe(gulp.dest(paths.plain.dest))

    ]);

    combined.on('error', console.error.bind(console));

    return combined;
});

function errorAlert(err) {
    console.log(err.toString());
    this.emit("end");
}

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.plain.src, ['compilePlain']);
    gulp.watch(paths.jquery.src, ['compileJquery']);
});

gulp.task('default', ['compilePlain', 'compileJquery']);
