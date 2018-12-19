const Watcher = require('./watcher');
const fs = require('fs');

const watchDir = './watch';
const processDir = './done';
const watcher = new Watcher(watchDir, processDir);
watcher.on('process', (file) => {
  const watchFile = `${watchDir}/${file}`;
  const processFile = `${processDir}/${file.toLowerCase()}`;
  fs.rename(watchFile, processFile, (err) => {
    if (err) throw err;
  });
});

watcher.start();