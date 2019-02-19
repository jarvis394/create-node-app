require('colors');

const inquirer = require('inquirer');
const BottomBar = inquirer.ui.BottomBar;
const shell = require('shelljs');
const fs = require('fs-extra');
const path = require('path');

module.exports = (rootDir, appName, verbose) => {
  return new Promise((resolve, reject) => {
    inquirer.prompt({
      type: 'list',
      name: 'server',
      message: 'What framework do you use to serve the application?',
      choices: [
        'express',
        'hapi',
        'koa',
        'restify'
      ]
    }).then(answers => {
      processServer(answers.server, rootDir, appName, verbose, resolve);
    });
  });
}

function processServer(val, rootDir, appName, verbose, resolve) {
  let loader = ['/ Installing', '| Installing', '\\ Installing', '- Installing'];
  let i = 4;
  let ui = new BottomBar({
    bottomBar: loader[i % 4] + ` ${val}`.green
  });
  let interval = setInterval(() => {
    ui.updateBottomBar('\n' + loader[i++ % 4] + ` ${val}\n\n`.green);
  }, 100);

  shell.exec('npm install ' + val + ' --save', {
    silent: true
  }, (code, stdout, stderr) => {
    if (verbose) console.log(stdout);

    if (code !== 0) {
      ui.updateBottomBar('\n');

      console.log('[ERROR]'.red + ' Something bad happend:\n');
      console.log(stderr);

      return process.exit(1);
    }

    ui.updateBottomBar('\n  Successfully installed ' + `${val}`.green + '!\n\n');
    clearInterval(interval);
    
    let template = fs.readFileSync('../templates/' + val + '.js');
    let gitignore = fs.readFileSync('../templates/.gitignore');
    
    fs.writeFileSync(path.join(rootDir, 'index.js'), template);
    fs.writeFileSync(path.join(rootDir, '.gitignore'), gitignore);

    resolve(true);
  });
}