#!/usr/bin/env node
// vi:syntax=js

const fs = require('fs')

const log = console.log.bind(console)
const err = console.error.bind(console)

const stat = (path) => new Promise((ok,no)=>{
  fs.stat(path,(err,info)=>{
    if(err){return no(err)}
    const isDirectory = info.isDirectory()
    const isFile = !isDirectory
    ok({...info,isFile,isDirectory})
  })
})

const readSubDir = (path,fileList=[],recursion=100) => recursion ? new Promise((ok,no)=>{
  fs.readdir(path,(err,files)=>{
    if(err){return no(err)}
    Promise.all(files.map( filename => {
      const filePath = path+'/'+filename
      const ext = require('path').extname(filename)
      const basename = require('path').basename(filename,ext)
      const extension = ext.replace(/^\./,'')
      const parentDirs = path.replace(/^\.\/|\/$|^\./g,'').trim()
      const parent = require('path').basename(path)
      const depth = parentDirs.length
      const tags = parentDirs.split('/')
      const paths = {filename,filePath,depth,parentDirs,parent,extension,basename,tags}
      return stat(filePath)
        .then(stat=>{
            const file = {...stat,...paths}
            if(file.isDirectory)
            { return readSubDir(file.filePath,fileList,recursion-1)
                .then( (files) => ({ ...file, type:'directory', files:files.map(({filename})=>filename) } ))
            }
            return ({...file, type:getType(file.extension)})
        })
    }))
    .then( list => {
      fileList.push(...list.slice())
      return ok(list)
    })
    .catch(no)
  })
}) : new Promise.resolve({})

const readDir = (path,fileList=[]) => readSubDir(path,fileList,100).then(()=>fileList)

const getType = (ext) => {
  if(/jpe?g|png|gif|bmp|tiff?/.test(ext)){ return 'image' }
  if(/jsx?|tsx?|json/.test(ext)){ return 'application'}
  if(/html?|txt|md/.test(ext)){return 'text'}
  if(/pdf|docx?|xlsx?/.test(ext)){return 'document'}
  if(/xps|svg|ai/.test(ext)){return 'vectorial'}
  else{ return 'unknown-'+ext}
}

const buildIndexes = (items) => {
  const directories = {}
  const filenames = {}
  const depths = {}
  const dirs = []
  const files = []
  const types = {}
  items.forEach((item,i)=>{
    const { filename:fil, parentDirs:dir, depth, isDirectory,type } = item
    if(!directories[dir]){directories[dir] = []}
    if(!filenames[fil]){filenames[fil] = []}
    if(!depths[depth]){depths[depth] = []}
    if(!types[type]){types[type] = []}
    if(isDirectory){ dirs.push(i)}else{files.push(i)}
    directories[dir].push(i)
    filenames[fil].push(i)
    depths[depth].push(i)
    types[type].push(i)
  })
  return { items, types, directories, filenames, depths, inode:{directory:dirs, file:files} }
}

const writeFile = (path) => (data) => new Promise((ok,no)=>{
  fs.writeFile(path,data,{encoding:'utf8'},(err)=>{
    if(err){return no(err)}
    return ok()
  })
})

const toString = (data) => new Promise((ok,no)=>{
  try{
    const str = JSON.stringify(data,null,2)
    return ok(str)
  }catch(e){ return no(e)}
})

const writeData = (path) => (data) => toString(data).then(writeFile(path))

const outputData = (data) => toString(data).then(log)


const help = (executableName) => {
  const text = `
  usage: ${executableName} <directoryToParse> <output>
`
  return text
}

const processCommandLineArgs = (argv) => {

  const [ myName, ...args ] = argv.slice(1)
  const executableName = require('path').basename(myName,'.js')


  if(args[0] === '-h' || args[0] === '--help'){
    console.log(help(executableName))
    process.exit(0)
  }

  const input = args[0] ? args[0] : false

  if(!input){
    err(`you need to specify an entry directory`)
    log(help(executableName))
    process.exit(1)
  }

  const output = args[1] ? writeData(args[1]) : outputData

  return readDir(input)
    .then(buildIndexes)
    .then(output)
    .catch(({message})=>err(message))

}

processCommandLineArgs(process.argv)
