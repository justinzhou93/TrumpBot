var Promise = require('bluebird');
var readFile = Promise.promisify(require('fs').readFile);
var writeFile = Promise.promisify(require('fs').writeFile);

// misses the intro and conclusion of the file. don't re-run if possible
function pullfile(filename){
  readFile('/Users/JustinZhou/Documents/Programming/Projects/TrumpBot/speechSamples/' + filename, 'utf8')
  .then(contents => {
    var contentarr = contents.split('\nTrump: ');
    var modifiedcontentarr = contentarr.map(string => string.slice(0, string.indexOf(':') + 1));
    var outputcontent = modifiedcontentarr.join('').replace(/Reporter:/g, '').replace(/ *\([^)]*\) */g, '');
    console.log(outputcontent);
    writeFile('../speechSamples/modifiedTexts/' + filename.slice(0, 16) + 'modified.txt', outputcontent)
    .then(() => console.log('DONE with ' + filename))
  });
}

pullfile('pressConference1.txt');
