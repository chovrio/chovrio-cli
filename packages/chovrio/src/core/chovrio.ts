import { Command, program } from 'commander'
import { version } from '../../package.json'
import build from '../command/build'
import create from '../command/create'
import deploy from '../command/deploy'
class Chovrio {
  program: Command
  commands: Array<(program: Command) => void>
  constructor() {
    this.program = program
    this.commands = [create, build, deploy]
    this.init()
    this.program.option('-v, --version').action(() => {
      console.log(version)
    })
    this.program.parse()
  }
  init() {
    this.commands.forEach(command => {
      command(program)
    })
  }
}
const cli = new Chovrio()
cli.program.version(version)
// program.name('chovrio').description('CLI to JavaScript').version(version)
// program.option('--first').option('-s, --separator <char>').option('-w, --watch')
// create(program)
// build(program)
// program.parse()
// const options = program.opts()
// console.log(options, program.args)
