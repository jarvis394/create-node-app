require('colors');

const validatePackageName = require('validate-npm-package-name');
const path = require('path');
const inquirer = require('inquirer');
const askName = require('inquirer-npm-name');
const npmName = require('npm-name');

module.exports = (skipFlag) => {
  return new Promise((resolve, reject) => {
    askName({
      type: 'input',
      name: 'n',
      message: 'How would you name your project?',
      validate: async (input) => {
        let n = await npmName(input)
        if (!n) return "This package name is already taken"

        if (
          !validatePackageName(input).validForNewPackages ||
          !validatePackageName(input).validForOldPackages
        ) return "Input valid package name"
        else return input ? true : "Input text"
      }
    }, inquirer).then(answers => {
      console.log('');
      console.log(
        '  Your app will be created in this directory: ' +
        `${path.resolve(answers.n)}`.green
      );

      if (!skipFlag) {
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
          let rootDir = a.dirHere ? path.resolve('.') : path.resolve(answers.n);
          let appName = path.basename(rootDir);

          // Return to new line
          console.log('');

          resolve({
            rootDir: rootDir,
            appName: appName
          });
        }).catch(e => reject(e));
      } else {
        let rootDir = path.resolve(answers.n);
        let appName = path.basename(rootDir);

        // Return to new line
        console.log('');

        resolve({
          rootDir: rootDir,
          appName: appName
        });
      }
    });
  });
}