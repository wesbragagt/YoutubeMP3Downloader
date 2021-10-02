console.log("----YoutubeMP3 Download----");
const fs = require("fs");
const homeDir = require("os").homedir();
const outputDir = `${homeDir}/Music/Tracks/`;
const url = process.argv[2];
const audioFile = process.argv[3];
const output = outputDir + audioFile;
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const cliProgress = require('cli-progress')

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);if (!fs.existsSync(outputDir)) {

  fs.mkdirSync(outputDir);
}
main();

function main() {
  //Configure YoutubeMp3Downloader with your settings
  const YD = new YoutubeMp3Downloader({
    ffmpegPath: "/usr/local/bin/ffmpeg", // FFmpeg binary location
    outputPath: outputDir,
    youtubeVideoQuality: "highestaudio", // Desired video quality (default: highestaudio)
    queueParallelism: 2, // Download parallelism (default: 1)
    progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
    allowWebm: false, // Enable download from WebM sources (default: false)
  });

  //Download video and save as MP3 file
  // YD.download("Vhd6Kc4TZls");
  if (url && audioFile) {
    const [_, videoId] = url.replace("\\", "").split("v=");
    YD.download(videoId, audioFile);
    console.log(`Downloading ${audioFile}...`)
    progressBar.start(100, 0)

    YD.on("progress", function ({ videoId, progress }) {
      const { percentage } = progress;
      progressBar.update(parseInt(percentage))
    });

    YD.on("finished", function (err, data) {
      progressBar.stop()
      console.log(`Done. Downloaded ${output}`);
    });

    YD.on("error", function (error) {
      progressBar.stop()
      console.log(error);
    });

  }
}
