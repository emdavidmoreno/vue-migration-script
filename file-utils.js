const fs = require('node:fs')
const path = require('node:path')

const readFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8')
}

const crawlFolder = (folderPath, fileList = []) => {
  const files = fs.readdirSync(folderPath)

  for (const file of files) {
    const filePath = path.join(folderPath, file)

    if (fs.statSync(filePath).isDirectory()) {
      crawlFolder(filePath, fileList)
    } else {
      fileList.push(filePath)
    }
  }

  return fileList
}

const createFileFromRoot = (filePath, rootFolder, fileContent) => {
  const fullPath = path.join(rootFolder, filePath)
  const dirPath = path.dirname(fullPath)

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  fs.writeFileSync(fullPath, fileContent)
}

module.exports = {
  readFile,
  crawlFolder,
  createFileFromRoot,
}
