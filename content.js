let keyPressed = false;
let delta = 500;
let lastKeypressTime = 0;

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 16) {
        let thisKeypressTime = Date.now();
        if ( thisKeypressTime - lastKeypressTime <= delta ) {
            startEffect(event.target);
            thisKeypressTime = 0;
        }
        lastKeypressTime = thisKeypressTime;
    }
});

function startEffect(eventTarget) {
    if (['TEXTAREA', 'INPUT'].includes(eventTarget.tagName) && eventTarget.value) {
        const newStr = translate(eventTarget.value);
        eventTarget.value = newStr;
    }
}

function translate(str) {
    let res = '';
    let engChar;
    str = str.toLowerCase();
    for (const char of str) {
        if (lang[char]) {
            res += lang[char].HE;
        } else if (engChar = findHeChar(char)) {
            res += engChar;
        } else {
            res += char;
        }
    }
    return res;
}

function findHeChar(char) {
    for (const engChar in lang) {
        if (lang[engChar].HE === char) {
            return engChar;
        }
    }
}