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
    const isInput = ['TEXTAREA', 'INPUT'].includes(eventTarget.tagName);
    // eventTarget.contentEditable is a string
    const isContentEditable = eventTarget.contentEditable === "true";
    if ((eventTarget.value || eventTarget.innerText) && (isInput || isContentEditable)) {
        const newStr = translate(eventTarget.value || eventTarget.innerText);
        if (isInput) {
            eventTarget.value = newStr;
        } else if(isContentEditable) {
            eventTarget.innerText = newStr;
        }
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