const path = require('node:path')
const utils = require('./file-utils')
const generateMigration = require('./migration')

async function generate (rootPath = './src', output = './output') {
  const filePaths = utils.crawlFolder(rootPath)
  for (const filepath of filePaths) {
    const oldCode = utils.readFile(filepath)
    const code = await generateMigration(oldCode)
    await utils.createFileFromRoot(filepath, output, code || '')
  }
}
module.exports = generate
const absoluteFolderPath = path.resolve(__dirname)
generate(path.resolve(absoluteFolderPath, '../src'), path.resolve(absoluteFolderPath, '../output'))
