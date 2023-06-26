import inquirer from 'inquirer';
import pc from 'picocolors';
import ora from 'ora';
import fs from 'fs-extra';
// import { execa } from 'execa'
import { resolve } from 'path';
import type { Command } from 'commander';
import { sleep } from '../utils/sleep';
import { __dirname } from '../utils/nodeVariable';
// 新建模板
export default function init(program: Command) {
  program
    .command('create')
    .description('create a project')
    .argument('<string>', 'project name')
    .action(async name => {
      const { template } = await inquirer.prompt({
        type: 'list',
        name: 'template',
        message: 'choose a template',
        choices: [
          'react',
          'vue',
          'react + typescript',
          'vue + typescript',
          'none'
        ]
      });
      console.log(pc.green(`fetch template ${template}`));
      const fetchingSpinning = ora(pc.blue(`fetch template`)).start();
      fetchingSpinning.color = 'cyan';
      fetchingSpinning.stop();
      const copySpinner = ora(
        pc.blue(`generate project by template...`)
      ).start();
      await sleep(3000);
      const realPath = await fs.realpath(process.cwd());
      const projectPath = realPath + '/' + name.toString();
      await fs.copy(resolve(__dirname, `../template/${template}`), projectPath);
      const pkg = JSON.parse(
        fs.readFileSync(`${projectPath}/package.json`, 'utf-8')
      );
      pkg.name = name;
      fs.writeFileSync(
        `${projectPath}/package.json`,
        JSON.stringify(pkg, null, 2),
        'utf-8'
      );
      copySpinner.stop();
      const installSpinner = ora(
        pc.blue(`generate project by template...`)
      ).start();
      process.chdir(projectPath);
      installSpinner.stop();
      console.log(pc.green(`generate project by template\n\n`));

      console.log(pc.yellow('Done now run:\n'));
      console.log(pc.yellow(`cd ${name}`));
      console.log(pc.yellow('pnpm install'));
    });
}
