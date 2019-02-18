require('colors');

const validatePackageName = require('validate-npm-package-name');
const inquirer = require('inquirer');

module.exports = async () => {
  return new Promise((resolve, reject) => {
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
  });
}

const separate = () => console.log('');

async function promptNewName() {
  separate();

  let choice = await inquirer.prompt({
    type: 'confirm',
    name: 'customName',
    message: 'Do you want to set custom name to your project?',
    default: false
  });

  if (choice.customName) {
    let newName = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'New name: ',
      prefix: '  -'.green,
      validate: (input) => {
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
  separate();

  let choice = await inquirer.prompt({
    type: 'confirm',
    name: 'description',
    message: 'Do you want to set description?',
    default: false
  });

  if (choice.description) {
    let desc = await inquirer.prompt({
      type: 'input',
      name: 'input',
      message: 'Description: ',
      prefix: '  -'.green,
      validate: (input) => {
        return input ? true : "Input text"
      }
    });

    return desc.input;
  } else return;
}

async function promptScripts() {
  separate();

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
    ]
  });

  if (!choice.scripts) return false;
  else return choice.scripts;
}

async function promptAuthor() {
  separate();

  let choice = await inquirer.prompt({
    type: 'confirm',
    name: 'author',
    message: 'Do you want to set author?',
    default: false
  });

  if (choice.author) {
    let author = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Author: ',
      prefix: '  -'.green,
      validate: (input) => {
        return input ? true : "Input text"
      }
    });

    return author.name;
  } else return;
}
