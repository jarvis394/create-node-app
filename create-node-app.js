#!/usr/bin/env node

require('colors');

const commander = require('commander');
const inquirer = require('inquirer');
const shell = require('shelljs');
const envinfo = require('envinfo');
const path = require('path');
const os = require('os');
const fs = require('fs-extra');

const BottomBar = inquirer.ui.BottomBar;
const packageJson = require('./package.json');

const program = new commander.Command(packageJson.name)

  // Version
  .version(`
  > create-node-app
  > Current version is ${packageJson.version}
  `, '-V, --version')

  // Verbose
  .option('-v, --verbose', 'Verbose everything')

  // Info
  .option('-i, --info', 'Show environment debug info');

program.on('--help', () => {
  console.log('');
  console.log('About:'.yellow);
  console.log('  * Made by jarvis394');
  console.log(`  * GitHub: ${'https://github.com/jarvis394'.cyan}`);
});

// Parse arguments
program.parse(process.argv);

// Init options from args
const options = program.opts();

// Debug info
if (program.info) {
  console.log('\nEnvironment info:'.bold.yellow);
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
    .then(console.log);
}

let verboseFlag = options.verbose;

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
  console.log('[ERROR]'.red + ' "npm" is not installed. ');
  console.log('        Download it here: ' + `https://www.npmjs.com/get-npm`.cyan);

  process.exit(1)
}

require('./bin/appName')().then(name => {

  // // Ensure that dir isn't created, then create if not
  // fs.ensureDirSync(answers.appName);

  // const packageJson = {
  //   name: answers.appName,
  //   version: "1.0.0",
  //   main: "index.js"
  // };
  // fs.writeJSON(
  //   path.join(answers.rootDir, 'package.json'),
  //   packageJson + os.EOL
  // );

  require('./bin/npmInit')().then(choices => {
    if (choices) {

      let packageJson = {
        name: name.appName,
        version: "1.0.0",
        main: "index.js",
        scripts: {
          "start": "node ./index.js"
        },
        keywords: [],
        author: "",
        license: "",
        description: ""
      }

      let {
        newName,
        description,
        scripts,
        author
      } = choices;

      if (newName) packageJson.name = newName;

    } else {
      shell.exec('npm init -y', {
        silent: true
      });
    }
    require('./bin/processServer')().then(() => {
      require('./bin/postInstall')()
    });
  });
});