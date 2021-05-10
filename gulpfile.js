var gulp = require("gulp");
var imagemin = require("gulp-imagemin");

gulp.task('build-img', function() {
    return gulp.src("public/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("public/images"));
});
