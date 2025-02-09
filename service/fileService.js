const fs = require('fs')
const path = require('path')
const {v4} = require('uuid')
const BaseError = require('../errors/base_error')

class FileService {
    save(file){
  try {
    const fileName = v4() + '.jpg'
    const currentDir = __dirname
    const staticDir = path.join(currentDir, '..', 'uploads')
    const filePath = path.join(staticDir, fileName)

    if(!fs.existsSync(staticDir)){
        fs.mkdirSync(staticDir, {recursive: true})
    }

    file.mv(filePath)
    return fileName
  } catch (error) {
    throw new Error('Error with saving a file' + error)
  }
    }
}

module.exports = new FileService()