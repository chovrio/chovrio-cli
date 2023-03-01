import { program } from 'commander'
import { version } from '../../package.json'
import init from './init'
program.name('chovrio').description('CLI to JavaScript').version(version)
program.option('--first').option('-s, --separator <char>').option('-w, --watch')
init(program)
program.parse()
// const options = program.opts()
// console.log(options, program.args)
