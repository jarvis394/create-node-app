require('colors');

const validatePackageName = require('validate-npm-package-name');
const inquirer = require('inquirer');
const npmName = require('npm-name');

module.exports = async (skipFlag) => {
  return new Promise((resolve, reject) => {
    if (skipFlag) resolve(false);
    else {
      inquirer.prompt({
        type: 'confirm',
        name: 'confirmInit',
        message: 'Do you want to configrue package.json?',
        default: false
      }).then(async ({
        confirmInit
      }) => {
        if (!confirmInit) return resolve(false);

        let newName = await promptNewName();
        let description = await promptDescriprion();
        let scripts = await promptScripts();
        let author = await promptAuthor();

        resolve({
          newName: newName,
          description: description,
          scripts: scripts,
          author: author
        })
      });
    }
  });
}

async function promptNewName() {
  let choice = await inquirer.prompt({
    type: 'confirm',
    name: 'customName',
    message: 'Do you want to set custom name to your project?',
    default: false,
    prefix: '  |'.green
  });

  if (choice.customName) {
    let newName = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'New name: ',
      prefix: '    -'.green,
      validate: async (input) => {
        let n = await npmName(input)
        if (!n) return "This package name is already taken"

        if (
          !validatePackageName(input).validForNewPackages ||
          !validatePackageName(input).validForOldPackages
        ) return "Input valid package name"
        else return input ? true : "Input text"
      }
    });

    return newName.name;
  } else return;
}

async function promptDescriprion() {
  let choice = await inquirer.prompt({
    type: 'confirm',
    name: 'description',
    message: 'Do you want to set description?',
    default: false,
    prefix: '  |'.green
  });

  if (choice.description) {
    let desc = await inquirer.prompt({
      type: 'input',
      name: 'input',
      message: 'Description: ',
      prefix: '    -'.green,
      validate: (input) => {
        return input ? true : "Input text"
      }
    });

    return desc.input;
  } else return;
}

async function promptScripts() {
  let choice = await inquirer.prompt({
    type: 'checkbox',
    name: 'scripts',
    message: 'Do you want to set scripts?',
    choices: [{
        name: 'npm start',
        checked: true
      },
      {
        name: 'npm test'
      }
    ],
    prefix: '  |'.green
  });

  if (choice.scripts.length === 0) return {};
  else {
    let scriptsObj = {}

    for (let i in choice.scripts) {
      let name = choice.scripts[i].slice(4);
      let script = await askNpmScript(name);

      scriptsObj[name] = script;
    }

    return scriptsObj;
  }

  async function askNpmScript(name) {
    let script = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Input command for script ' + `${name}`.yellow + ':',
      validate: input => input ? true : '>>> Input command',
      prefix: '    -'.green
    });

    return script.name;
  }
}

async function promptAuthor() {
  let choice = await inquirer.prompt({
    type: 'confirm',
    name: 'author',
    message: 'Do you want to set author?',
    default: false,
    prefix: '  |'.green
  });

  if (choice.author) {
    let author = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Author: ',
      prefix: '    -'.green,
      validate: (input) => {
        return input ? true : "Input text"
      }
    });

    return author.name;
  } else return;
}