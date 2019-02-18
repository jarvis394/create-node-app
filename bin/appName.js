require('colors');

const validatePackageName = require('validate-npm-package-name');
const path = require('path');
const inquirer = require('inquirer');

module.exports = () => {
  return new Promise((resolve, reject) => {
    inquirer.prompt({
      type: 'input',
      name: 'appName',
      message: 'How would you name your project?',
      validate: (input) => {
        if (
          !validatePackageName(input).validForNewPackages ||
          !validatePackageName(input).validForOldPackages
        ) return "Input valid package name"
        else return input ? true : "Input text"
      }
    }).then(answers => {
      console.log('');
      console.log(
        '  Your app will be created in this directory: ' + 
        `${path.resolve(answers.appName)}`.green
      );

      inquirer.prompt({
        type: 'confirm',
        name: 'dirHere',
        message: 'You can init your app just here, just say "yes" there:'.gray,
        prefix: " ",
        default: false,
        validate: (input) => {
          return input ? true : "Input text"
        }
      }).then(a => {
        rootDir = a.dirHere ? path.resolve('.') : path.resolve(answers.appName);
        appName = path.basename(rootDir);

        // Return to new line
        console.log('');

        resolve({
          rootDir: rootDir,
          appName: appName
        });
      }).catch(e => reject(e));
    });
  });
}