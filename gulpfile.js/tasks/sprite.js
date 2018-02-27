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
const handleErrors = require('../lib/handleErrors')
const path = require('path')
const svgMin = require('gulp-svgmin')
const svgStore = require('gulp-svgstore')
const watch = require('gulp-watch')

/* -----------------------------------------------------------------------------
    !-- Configs
   -------------------------------------------------------------------------- */

const paths = require('../paths')
const config = require('../config')

const src = path.resolve(paths.src, paths.sprite.src, '**/*.svg')
const dest = path.resolve(paths.dest, paths.sprite.dest)

/* -----------------------------------------------------------------------------
    !-- Function
   -------------------------------------------------------------------------- */

const spriteTask = () => {
  return gulp.src(src)
    .pipe(
      svgMin((file) => {
        const prefix = path.basename(file.relative, path.extname(file.relative))
        return {
          plugins: [{
            cleanupIDs: {
              prefix: `${prefix}--`,
              minify: true
            }
          }]
        }
      })
    )
    .on('error', handleErrors)
    .pipe(svgStore())
    .on('error', handleErrors)
    .pipe(gulp.dest(dest))
}

/* -----------------------------------------------------------------------------
    !-- Tasks
   -------------------------------------------------------------------------- */

gulp.task('sprite', spriteTask)

gulp.task('sprite:watch', () => {
  return watch(src, spriteTask)
})

/* -----------------------------------------------------------------------------
    !-- Export
   -------------------------------------------------------------------------- */

module.exports = spriteTask
