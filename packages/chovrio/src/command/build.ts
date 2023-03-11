import type { Command } from 'commander'

export default function build(program: Command) {
  program
    .command('build')
    .description('build a project or file')
    .action(() => {
      console.log(1111)
    })
}
