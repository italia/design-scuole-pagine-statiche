var gulp=require("gulp"),uglify=require("gulp-uglify"),rename=require("gulp-rename"),sourcemaps=require("gulp-sourcemaps");gulp.task("compress",function(){return gulp.src("js/jquery.responsive-dom.js").pipe(sourcemaps.init()).pipe(uglify()).pipe(rename({extname:".min.js"})).pipe(sourcemaps.write("./")).pipe(gulp.dest("js"))});