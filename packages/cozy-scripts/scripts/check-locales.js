const fs = require('fs')
const { ArgumentParser } = require('argparse')

const setDiff = (set1, set2) => {
  const res = []
  for (const v of set1) {
    if (!set2.has(v)) {
      res.push(v)
    }
  }
  return res
}

const diff = (obj1, obj2) => {
  const paths1 = new Set(paths(obj1))
  const paths2 = new Set(paths(obj2))
  const removed = Array.from(setDiff(paths1, paths2))
  const added = Array.from(setDiff(paths2, paths1))
  return [
    ...added.map(x => ({ type: 'add', value: x })),
    ...removed.map(x => ({ type: 'remove', value: x }))
  ]
}

/** Outputs all the dotted paths of an object */
const paths = (obj, current = '') => {
  let res = []
  for (let [k, v] of Object.entries(obj)) {
    if (typeof v === 'object') {
      for (const leaf of paths(v, current ? `${current}.${k}` : k)) {
        res.push(`${leaf}`)
      }
    } else {
      res.push(`${current}.${k}`)
    }
  }
  return res
}

const main = () => {
  const parser = new ArgumentParser({
    description: `This scripts checks for differing keys between two locale files
It is used to check if a given locale file (file2) is up to date
with respect to another locale file (file1).
Usage: check-locales.js en.json fr.json`
  })
  parser.addArgument('file1', {
    nargs: '?',
    defaultValue: 'src/locales/en.json'
  })
  parser.addArgument('file2', {
    nargs: '?',
    defaultValue: 'src/locales/fr.json'
  })

  // argv[0] will be node
  // argv[1] will be cozy-scripts
  // argv[2] will be check-locales
  const args = parser.parseArgs(process.argv.slice(3))

  const { file1, file2 } = args
  const diffs = diff(
    JSON.parse(fs.readFileSync(file1)),
    JSON.parse(fs.readFileSync(file2))
  )

  if (diffs.length > 0) {
    for (let d of diffs) {
      console.log(d.type === 'add' ? '+' : '-', d.value)
    }
    console.warn(`Locales ${file1} and ${file2} mismatch, see diff above`)
    process.exit(1)
  } else {
    console.log('Locales have the same keys, everything OK')
    process.exit(0)
  }
}

module.exports = main
