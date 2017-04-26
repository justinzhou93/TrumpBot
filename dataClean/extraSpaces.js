var Promise = require('bluebird');
var readFile = Promise.promisify(require('fs').readFile);
var writeFile = Promise.promisify(require('fs').writeFile);

// misses the intro and conclusion of the file. don't re-run if possible
function pullfile(filename){
  readFile('/Users/JustinZhou/Documents/Programming/Projects/TrumpBot/speechSamples/' + filename, 'utf8')
  .then(contents => {
    var newcontents = contents.split('\n').join(' ');
    writeFile('../speechSamples/modifiedTexts/' + filename.slice(0, 15) + 'modified.txt', newcontents)
    .then(() => console.log('DONE with ' + filename));
  });
}

pullfile('augPhoenixRally.txt');
// pullfile('augWilmingtonRally.txt');
pullfile('febFloridaRally.txt');
pullfile('inauguralSpeech.txt');
