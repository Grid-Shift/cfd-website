/* =============================================================================
    Sprite Task

    Table of Contents
    - Requires
    - Configs
    - Function
    - Tasks
    - Export

   ========================================================================== */

/* -----------------------------------------------------------------------------
    !-- Requires
   -------------------------------------------------------------------------- */

const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const gulpIf = require('gulp-if')
const handleErrors = require('../lib/handleErrors')
const isProd = require('../../lib/isProd')
const path = require('path')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const watch = require('gulp-watch')

/* -----------------------------------------------------------------------------
    !-- Configs
   -------------------------------------------------------------------------- */

const paths = require('../paths')
const config = require('../config')

const src = path.resolve(paths.src, paths.styles.src, `**/*.{${config.styles.extensions}}`)
const dest = path.resolve(paths.dest, paths.styles.dest)

/* -----------------------------------------------------------------------------
    !-- Function
   -------------------------------------------------------------------------- */

const stylesTask = () => {
  return gulp.src(src)
    .pipe(
      gulpIf(!isProd(), sourcemaps.init())
    )
    .on('error', handleErrors)
    .pipe(sass(config.styles.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer())
    .on('error', handleErrors)
    .pipe(
      gulpIf(!isProd(), sourcemaps.write())
    )
    .on('error', handleErrors)
    .pipe(gulp.dest(dest))
}

/* -----------------------------------------------------------------------------
    !-- Tasks
   -------------------------------------------------------------------------- */

gulp.task('styles', stylesTask)

gulp.task('styles:watch', () => {
  return watch(src, stylesTask)
})

/* -----------------------------------------------------------------------------
    !-- Export
   -------------------------------------------------------------------------- */

module.exports = stylesTask
