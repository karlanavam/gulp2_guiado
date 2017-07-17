const gulp = require('gulp');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const rutas = {
    rutaJS: 'src/assets/js/*.js',
    rutaSCSS: 'src/assets/scss/*.scss',
    rutaHTML: 'index.html'
};

//* no importa dónde busca ese 
gulp.task('prepararHTML', function() {
    gulp.src(rutas.rutaHTML)
    .pipe(gulp.dest('public/'))
});

gulp.task('prepararJS', function(){
    return gulp.src(rutas.rutaJS)
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('public/js'))
});

/* Entra a la ruta donde está el archivo SCSS. 1er pipe: en la variable sass le comprime. 2. Que si hay un error mande una alerta de qué error y donde. 3. que la compresión se guarde en la carpeta css de public */
//Esta tarea tiene la ruta del archivo y el qué hacer.
gulp.task('prepararCSS', function(){
    /*return: asíncrono*/ gulp.src(rutas.rutaSCSS)
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
});

/* Va a iniciar el servidor, y le dice que lo que se va a mostrar está en la carpeta public */
//Esta tarea llama a 
gulp.task('verCambiosCSS', function(){
    browserSync.init({
        server: {
            basedir: './public'
        }
    });
    /* que vigile si hay un cambio en rutaSCSS, y si lo hay, que ejecute la tarea sass-watch */
    gulp.watch(rutas.rutaSCSS, ['sass-watch']);
    gulp.watch(rutas.rutaJS, ['sass-watch']);
    gulp.watch(rutas.rutaHTML, ['sass-watch']);
});

/* cuando hay un cambio en SCSS debe recargar el servidor */
//primer parámetro: nombre de tarea, segundo: es la tarea/acción que trae en su interior la ruta y el qué hacer y el tercero: tarea/acción a ejecutar sin ruta.
gulp.task('sass-watch', ['prepararCSS', 'prepararJS', 'prepararHTML'], function(){
    browserSync.reload();
});