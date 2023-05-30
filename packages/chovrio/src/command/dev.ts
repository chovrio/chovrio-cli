import type { Command } from 'commander';
import express from 'express';
import { loadConfigFromFile } from '../utils/ConfigFileParse/loadConfigFromFile';
export default function build(program: Command) {
  program
    .command('dev')
    .description('project development')
    .action(async () => {
      const { path, config } = await loadConfigFromFile('dev');
      console.log(path, config);
      // const server = express();
      // server.use(express.static(process.cwd()));
      // server.listen(3000, () => {
      //   console.log('server running http://localhost:3000');
      // });
    });
}
