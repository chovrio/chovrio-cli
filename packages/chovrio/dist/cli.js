import { program as t } from 'commander'
import e from 'inquirer'
t.name('chovrio').description('CLI to JavaScript').version('1.0.0'),
  t.option('--first').option('-s, --separator <char>').option('-w, --watch'),
  (function (t) {
    t.command('create')
      .description('create a project')
      .argument('<string>', 'project name')
      .action(async t => {
        const { template: o } = await e.prompt({
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
        console.log(t, o)
      })
  })(t),
  t.parse()
