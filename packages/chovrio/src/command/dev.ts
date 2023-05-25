import type { Command } from 'commander'
import express from 'express'
export default function build(program: Command) {
  program
    .command('dev')
    .description('project development')
    .action(() => {
      const server = express()
      server.use(express.static(process.cwd()))
      server.listen(3000, () => {
        console.log('server running http://localhost:3000')
      })
    })
}
