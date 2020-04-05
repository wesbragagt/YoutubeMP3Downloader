console.log('----YoutubeMP3 Download----')
const fs = require('fs')
const youtubedl = require('youtube-dl')
const ffmpeg = require('fluent-ffmpeg')
const bin = '/usr/local/bin/ffmpeg'
const homeDir = require('os').homedir()
const outputDir = `${homeDir}/Documents/tracks/`
const url = process.argv[2]
const audioFile = process.argv[3]
const output = outputDir + audioFile
const video = youtubedl(url,
  // Optional arguments passed to youtube-dl.
  ['--format=18'],
  // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname })

  video.on('info', (info)=>{
      console.log('Download started...')
  })

const proc = new ffmpeg({source:video})
proc.saveToFile(output)

proc.on('error', (error) => console.error(error))

proc.on('end', ()=>{
console.log(homeDir)
console.log(`Done downloading ${audioFile} at ${homeDir}/Documents/tracks/${audioFile}`)
})


 
// video.pipe(fs.createWriteStream('video.mp4'))