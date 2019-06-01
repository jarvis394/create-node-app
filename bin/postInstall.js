require('colors')

module.exports = (appName) => {
  console.log('_______________________________________________\n\n')
  console.log('  Thank you for choosing ' + 'create-node-app'.green + '!')
  console.log('')
  console.log('  Now you can go to your ' + `${appName}`.yellow + ' folder')
  console.log('  and run ' + 'node .'.bold.yellow + ' or ' + 'npm start'.bold.yellow + ', if you defined that script')
  console.log('')
  console.log('')
  console.log('              Happy coding!\n\n'.rainbow)

  process.exit(0)
}