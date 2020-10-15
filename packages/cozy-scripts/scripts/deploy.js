const argparse = require('argparse')
const spawn = require('cross-spawn')

function runDeploy(options) {
  const { cliArgs } = options
  const parser = new argparse.ArgumentParser({
    prog: 'cs deploy',
    description:
      'Use git-directory-deploy to deploy a version of your app on a git branch'
  })
  parser.addArgument('--branch', {
    defaultValue: 'build',
    help: 'Branch where the directory will be pushed (default: build)'
  })
  parser.addArgument('--directory', {
    defaultValue: 'build/',
    help: 'Which directory will be pushed (default: build/)'
  })
  parser.addArgument('--repository', {
    defaultValue: 'origin',
    help: 'On which repository will the directory be pushed (default: origin)'
  })
  const args = parser.parseArgs(cliArgs)

  const process = spawn.sync(
    'env',
    [
      'HUSKY_SKIP_HOOKS=1',
      'git-directory-deploy',
      '--directory',
      args.directory,
      '--branch',
      args.branch,
      '--repo',
      args.repository
    ],
    {
      stdio: 'inherit'
    }
  )
  if (process.status !== 0) throw new Error('Deploy script failed.')
}

module.exports = runDeploy
