var Promise = require('bluebird');
var readFile = Promise.promisify(require('fs').readFile);
var writeFile = Promise.promisify(require('fs').writeFile);

function pullfile(filename){
  readFile('/Users/JustinZhou/Documents/Programming/Projects/TrumpBot/speechSamples/' + filename, 'utf8')
  .then(contents => {
    var contentarr = contents.split('\nTRUMP: ');
    var modifiedcontentarr = contentarr.map(string => string.slice(0, string.indexOf(':') + 1));
    var outputcontent = modifiedcontentarr.slice(1).join('').replace(/CLINTON:/g, '').replace(/HOLT:/g, '')
    .replace(/WALLACE:/g, '').replace(/COOPER:/g, '').replace(/RADDATZ:/g, '').replace(/BROCK:/g, '')
    .replace(/ *\([^)]*\) */g, '').replace(/\n/g, '');
    console.log(outputcontent);
    writeFile('../speechSamples/modifiedTexts/' + filename.slice(0, 7) + 'modified.txt', outputcontent)
    .then(() => console.log('DONE with ' + filename))
  });
}

pullfile('debate1.txt');
pullfile('debate2.txt');
pullfile('debate3.txt');
