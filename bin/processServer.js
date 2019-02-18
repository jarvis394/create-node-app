const inquirer = require('inquirer');

module.exports = () => {
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
      processServer(answers.server)
    });
  });
}

function processServer(val) {
  let loader = ['/ Installing', '| Installing', '\\ Installing', '- Installing'];
  let i = 4;
  let ui = new BottomBar({
    bottomBar: loader[i % 4] + ` ${val}`.green
  });
  let interval = setInterval(() => {
    ui.updateBottomBar('\n' + loader[i++ % 4] + ` ${val}\n\n`.green);
  }, 100);

  shell.cd(appName)
  shell.exec('npm install ' + val + ' --save', {
    silent: true
  }, (code, stdout, stderr) => {
    if (verboseFlag) console.log(stdout)

    if (code !== 0) {
      ui.updateBottomBar('\n');

      console.log('[ERROR]'.red + ' Something bad happend:\n');
      console.log(stderr);

      return process.exit(1);
    }

    ui.updateBottomBar('\n  Successfully installed ' + `${val}`.green + '!\n\n');
    clearInterval(interval);

    let template = fs.readFileSync('../templates/' + val + '.js')

    fs.writeFileSync(path.join(__dirname, appName, 'index.js'), template);

    process.exit(0)
  });
}