#!/usr/bin/env node
const program = require('commander')
    , request = require('superagent')
    , chalk = require('chalk')

program
  .version('1.0.0')
  .usage('<keywords>')
  .parse(process.argv)

if (!program.args.length) {
  program.help()
}
else {
  main()
}

function main() {
  const keywords = program.args
      , url = `https://api.github.com/search/repositories?sort=stars&order=desc&q=${ keywords }`

  request.get(url)
    .end((err, res) => {
      if (err) 
        return console.log(chalk.red(`Error: ${ err }`))
      else {
        loopPackage(res.body)
      } 
      
    })
}

function loopPackage(packages) {
  for (let key of Object.keys(packages)) {
    const package = packages[key]
    console.log(package)
    // console.log(chalk.cyan.bold.underline(`Name: ${ package.name }`))
    // console.log(chalk.cyan.bold.magenta.bold(`Owner: ${ package.owner.login }`))
    // console.log(chalk.grey(`Desc: ${ package.description }`))
    // console.log(chalk.grey(`Clone URL: ${ package.clone_url }`))
  }
}