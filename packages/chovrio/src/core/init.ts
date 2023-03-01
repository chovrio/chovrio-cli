import inquirer from 'inquirer'
import type { Command } from 'commander'
// 新建模板
export default function init(program: Command) {
  program
    .command('create')
    .description('create a project')
    .argument('<string>', 'project name')
    .action(async str => {
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
      })
      console.log(str, template)
    })
}
