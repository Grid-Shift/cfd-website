/* =============================================================================
    Scripts Task

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
const handleErrors = require('../lib/handleErrors')
const path = require('path')
const sequence = require('gulp-sequence')
const watch = require('gulp-watch')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')

/* -----------------------------------------------------------------------------
    !-- Configs
   -------------------------------------------------------------------------- */

const config = require('../config')
const configWebpack = require('../../webpack.config.js')
const configWebpackObj = configWebpack()
const paths = require('../paths')

const src = path.resolve(paths.src, paths.scripts.src, `**/*.${config.scripts.extensions}`)
const dest = path.resolve(paths.dest, paths.scripts.dest)

/* -----------------------------------------------------------------------------
    !-- Function
   -------------------------------------------------------------------------- */

const scriptsTask = () => {
  return gulp.src(src)
    .pipe(
      webpackStream(configWebpackObj)
    )
    .on('error', handleErrors)
    .pipe(gulp.dest(dest))
}

/* -----------------------------------------------------------------------------
    !-- Tasks
   -------------------------------------------------------------------------- */

gulp.task('scripts', scriptsTask)

gulp.task('scripts:watch', () => {
  const watchOptions = Object.assign({}, configWebpackObj, {watch: true})

  return gulp.src(src)
    .pipe(
      webpackStream(watchOptions)
    )
    .on('error', handleErrors)
    .pipe(gulp.dest(dest))
})

/* -----------------------------------------------------------------------------
    !-- Exports
   -------------------------------------------------------------------------- */

module.exports = scriptsTask
