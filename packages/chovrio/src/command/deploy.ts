import parse from '../utils/parse'
import type { Command } from 'commander'
import ora from 'ora'
import pc from 'picocolors'
import { NodeSSH } from 'node-ssh'
import readline from 'readline-sync'
import env from '../utils/env'
export default function deploy(program: Command) {
  program
    // 命令
    .command('deploy')
    // 命令描述
    .description('deploy a project to server')
    // 解析到这个命令后 要执行的操作
    .action(async () => {
      const config = parse()
      const ssh = new NodeSSH()
      let host, username, password
      // 1.连接服务器
      // 1.1 存在.env文件且具有数据就读取文件连接
      if (env.user && env.password && env.host) {
        host = env.host
        username = env.user
        password = env.password
      } else {
        // 1.2 不存在就采取输入方式连接
        host = readline.question(`Your server ip address${pc.blue('(host)')}:`)
        username = readline.question(
          `The user name you want to log in to${pc.blue('(username)')}:`
        )
        password = readline.question(`Your password${pc.blue('(password)')}:`)
      }
      const connectSpinner = ora(pc.blue(`connect server...`)).start()
      try {
        await ssh.connect({
          host,
          username,
          password
        })
        connectSpinner.stop()
        console.log(pc.green('服务器连接成功~'))
      } catch (err) {
        connectSpinner.stop()
        console.log(pc.red('数据错误，连接失败' + err.message))
      }
      // 2.删除原有文件夹内容
      const deleteSpinner = ora(pc.blue(`delete folder...`)).start()
      const remotePath = config?.deploy?.position || ''
      await ssh.execCommand(`rm -rf ${remotePath}`)
      deleteSpinner.stop()
      console.log(pc.green('删除文件成功~'))
      // 3.上传文件
      const uploadSpinner = ora(pc.blue(`upload folder...`)).start()
      const status = await ssh.putDirectory(
        process.cwd() + '/dist',
        remotePath,
        {
          recursive: true,
          concurrency: 10
        }
      )
      uploadSpinner.stop()
      if (status) {
        console.log(pc.green('文件上传服务器成功~'))
      } else {
        console.log(pc.red('文件上传服务器失败'))
      }
      process.exit(0)
    })
}
