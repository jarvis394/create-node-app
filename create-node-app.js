#!/usr/bin/env node

require('colors')

const commander = require('commander')
const shell = require('shelljs')
const envinfo = require('envinfo')
const path = require('path')
const fs = require('fs-extra')

const pkg = require('./package.json')

const program = new commander.Command(pkg.name)

  // Version
  .version(`
  > create-node-app
  > Current version is ${pkg.version}
  `, '-V, --version')

  // Skip
  .option('-s, --skip', 'Quickly skip everything')

  // Verbose
  .option('-v, --verbose', 'Verbose everything')

  // Info
  .option('-i, --info', 'Show environment debug info')

program.on('--help', () => {
  console.log('')
  console.log('About:'.yellow)
  console.log('  * Made by jarvis394')
  console.log(`  * GitHub: ${'https://github.com/jarvis394'.cyan}`)
})

// Parse arguments
program.parse(process.argv)

// Init options from args
const options = program.opts()

// Debug info
if (program.info) {
  console.log('\nEnvironment info:'.bold.yellow)
  return envinfo
    .run({
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'npm'],
      Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
      npmPackages: ['express', 'koa', 'restify', 'hapi'],
    }, {
      clipboard: false,
      duplicates: true,
      showNotFound: true,
    })
    .then(console.log)
}

// Greet
console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n ')
console.log('      create-node-app:v1.0.0'.gray)
console.log('                                           ')
console.log('      Welcome to creation page!            ')
console.log('      Choose any framework you want to use ')
console.log('      in your new auto-generated project!  ')
console.log('                                           ')

// Check npm installed
if (!shell.which('npm')) {
  console.log('[ERROR]'.red + ' "npm" is not installed. ')
  console.log('        Download it here: ' + 'https://www.npmjs.com/get-npm'.cyan)

  process.exit(1)
}

require('./bin/appName')(options.skip).then(name => {
  require('./bin/npmInit')(options.skip).then(choices => {

    // Ensure that dir isn't created, then create if not
    fs.ensureDirSync(name.appName)

    if (choices) {

      let packageJson = {
        name: name.appName,
        version: '1.0.0',
        main: 'index.js',
        scripts: {
          'start': 'node ./index.js'
        },
        keywords: [],
        author: '',
        license: '',
        description: ''
      }

      let {
        newName,
        description,
        scripts,
        author
      } = choices

      if (newName) packageJson.name = newName
      if (description) packageJson.description = description
      if (scripts) packageJson.scripts = scripts
      if (author) packageJson.author = author

      // Write package.json
      fs.writeJSON(
        path.join(name.rootDir, 'package.json'),
        packageJson
      )

    } else {

      shell.cd(name.rootDir)
      shell.exec('npm init -y', {
        silent: true
      })

    }
    
    require('./bin/processServer')(name.rootDir, name.appName, options.verbose).then(() => {
      require('./bin/postInstall')(name.appName)
    })
  })
})