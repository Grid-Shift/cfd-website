/* =============================================================================
    Images Task

    Table of Contents
    - Requires
    - Configs
    - Function
    - Tasks
    - Exports

   ========================================================================== */

/* -----------------------------------------------------------------------------
    !-- Requires
   -------------------------------------------------------------------------- */

const gulp = require('gulp')
const changed = require('gulp-changed')
const handleErrors = require('../lib/handleErrors')
const imageMin = require('gulp-imagemin')
const path = require('path')
const watch = require('gulp-watch')

/* -----------------------------------------------------------------------------
    !-- Configs
   -------------------------------------------------------------------------- */

const paths = require('../paths')
const config = require('../config')

const src = path.resolve(paths.src, paths.images.src, `**/*.{${config.images.extensions}}`)
const dest = path.resolve(paths.dest, paths.images.dest)

/* -----------------------------------------------------------------------------
    !-- Function
   -------------------------------------------------------------------------- */

const imagesTask = () => {
  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(imageMin({verbose: true}))
    .on('error', handleErrors)
    .pipe(gulp.dest(dest))
}

/* -----------------------------------------------------------------------------
    !-- Tasks
   -------------------------------------------------------------------------- */

gulp.task('images', imagesTask)

gulp.task('images:watch', () => {
  return watch(src, imagesTask)
})

/* -----------------------------------------------------------------------------
    !-- Exports
   -------------------------------------------------------------------------- */

module.exports = imagesTask
