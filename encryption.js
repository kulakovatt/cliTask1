function getValue(flag) {
    const flagIndex = process.argv.indexOf(flag);
    return flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
}
const fs = require("fs");
const type = getValue('-c');
const readFile = getValue('-i');
const writeFile = getValue('-o');
let arr = type.split("-");
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; //исходный алфавит
var alphabet1 = 'abcdefghijklmnopqrstuvwxyz';
let symbols = new RegExp("[^A-Za-z]");
let readableStream = fs.readFileSync(readFile, 'utf8');
var encryptedMessage = '';
function shiftAlphabet(shift=1) {
    var shiftedAlphabet = ''; //новый алфавит
    for (var i = 0; i < alphabet.length; i++) {
        currentLetter = (alphabet[i + shift] === undefined) ? (alphabet[i + shift - alphabet.length]) : (alphabet[i + shift]);
        shiftedAlphabet = shiftedAlphabet.concat(currentLetter);

    }
    return shiftedAlphabet;
}

function shiftAlphabet1(shift=1) {
    var shiftedAlphabet1 = ''; //новый алфавит
    for (var i = 0; i < alphabet1.length; i++) {
        currentLetter1 = (alphabet1[i + shift] === undefined) ? (alphabet1[i + shift - alphabet1.length]) : (alphabet1[i + shift]);
        shiftedAlphabet1 = shiftedAlphabet1.concat(currentLetter1);
    }
    return shiftedAlphabet1;
}

function encryptCesar() {
    encryptedMessage = '';
    var shiftedAlphabet = shiftAlphabet(1);
    var shiftedAlphabet1 = shiftAlphabet1(1);
    for (var i = 0; i < readableStream.length; i++) {
        if (readableStream[i] == symbols.exec(readableStream[i])) {
            encryptedMessage = encryptedMessage.concat(symbols.exec(readableStream[i]));
            continue};
        if (readableStream[i].toUpperCase() == readableStream[i]){
            var indexOfLetter = alphabet.indexOf(readableStream[i]);
            encryptedMessage = encryptedMessage.concat(shiftedAlphabet[indexOfLetter]);
        } else {
            var indexOfLetter = alphabet1.indexOf(readableStream[i]);
            encryptedMessage = encryptedMessage.concat(shiftedAlphabet1[indexOfLetter]);
        }

    }
    readableStream = encryptedMessage;
    console.log(readableStream);
}

function decryptCesar() {
    encryptedMessage = '';
    var shiftedAlphabet = shiftAlphabet(1);
    var shiftedAlphabet1 = shiftAlphabet1(1);
    for (var i = 0; i < readableStream.length; i++) {
        if (readableStream[i] == symbols.exec(readableStream[i])) {
            encryptedMessage = encryptedMessage.concat(symbols.exec(readableStream[i]));
            continue};
        if (readableStream[i].toUpperCase() == readableStream[i]) {
            var indexOfLetter = shiftedAlphabet.indexOf(readableStream[i]);
            encryptedMessage = encryptedMessage.concat(alphabet[indexOfLetter]);
        } else {
            var indexOfLetter = shiftedAlphabet1.indexOf(readableStream[i]);
            encryptedMessage = encryptedMessage.concat(alphabet1[indexOfLetter]);
        }

    }
    readableStream = encryptedMessage;
    console.log(readableStream);
}

function encryptRot8() {
    encryptedMessage = '';
    var shiftedAlphabet = shiftAlphabet(8);
    var shiftedAlphabet1 = shiftAlphabet1(8);
    for (var i = 0; i < readableStream.length; i++) {
        if (readableStream[i] == symbols.exec(readableStream[i])) {
            encryptedMessage = encryptedMessage.concat(symbols.exec(readableStream[i]));
            continue};
        if (readableStream[i].toUpperCase() == readableStream[i]){
            var indexOfLetter = alphabet.indexOf(readableStream[i]);
            encryptedMessage = encryptedMessage.concat(shiftedAlphabet[indexOfLetter]);
        } else {
            var indexOfLetter = alphabet1.indexOf(readableStream[i]);
            encryptedMessage = encryptedMessage.concat(shiftedAlphabet1[indexOfLetter]);
        }

    }
    readableStream = encryptedMessage;
    console.log(readableStream);
}

function decryptRot8() {
    encryptedMessage = '';
    var shiftedAlphabet = shiftAlphabet(8);
    var shiftedAlphabet1 = shiftAlphabet1(8);
    for (var i = 0; i < readableStream.length; i++) {
        if (readableStream[i] == symbols.exec(readableStream[i])) {
            encryptedMessage = encryptedMessage.concat(symbols.exec(readableStream[i]));
            continue};
        if (readableStream[i].toUpperCase() == readableStream[i]) {
            var indexOfLetter = shiftedAlphabet.indexOf(readableStream[i]);
            encryptedMessage = encryptedMessage.concat(alphabet[indexOfLetter]);
        } else {
            var indexOfLetter = shiftedAlphabet1.indexOf(readableStream[i]);
            encryptedMessage = encryptedMessage.concat(alphabet1[indexOfLetter]);
        }

    }
    readableStream = encryptedMessage;
    console.log(readableStream);
}

function encryptAttbash (){
    encryptedMessage = '';
    var shiftedAlphabet = alphabet.split("").reverse().join("");
    var shiftedAlphabet1 = alphabet1.split("").reverse().join("");
    for (var i = 0; i < readableStream.length; i++) {
        if (readableStream[i] == symbols.exec(readableStream[i])) {
            encryptedMessage = encryptedMessage.concat(symbols.exec(readableStream[i]));
            continue};
        if (readableStream[i].toUpperCase() == readableStream[i]){
            var indexOfLetter = alphabet.indexOf(readableStream[i]);
            encryptedMessage = encryptedMessage.concat(shiftedAlphabet[indexOfLetter]);
        } else {
            var indexOfLetter = alphabet1.indexOf(readableStream[i]);
            encryptedMessage = encryptedMessage.concat(shiftedAlphabet1[indexOfLetter]);
        }

    }
    readableStream = encryptedMessage;
    console.log(readableStream);
}

arr.forEach(function(item, i, arr) {
    if (item.charAt(0) == 'C' || item.charAt(0) == 'c'){
        if(item.charAt(1)==1){
            encryptCesar();
        } else if (item.charAt(1)==0){
            decryptCesar();
        }
    }
    else if (item.charAt(0) == 'R' || item.charAt(0) == 'r'){
        if(item.charAt(1)==1){
            encryptRot8();
        } else {
            decryptRot8();
        }
    }
    else if (item.charAt(0) == 'A' || item.charAt(0) == 'a'){
        encryptAttbash();
    }

    let writeableStream = fs.createWriteStream(writeFile);
    writeableStream.write(encryptedMessage);
    writeableStream.end();
});