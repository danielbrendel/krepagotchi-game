import './../sass/app.scss';
require('phaser');

window.currentPromptCallback = function(text) {};

window.showPrompt = function(title, label, cb = function(text) {}, deftext = '') {
    let prompt = document.querySelector('.prompt-overlay');
    if (prompt) {
        let elTitle = document.querySelector('.prompt-title');
        elTitle.innerHTML = title;

        let elLabel = document.querySelector('.prompt-label');
        elLabel.innerHTML = label;

        let elText = document.querySelector('#txtInputValue');
        elText.value = deftext;

        window.currentPromptCallback = cb;

        prompt.classList.remove('is-hidden');
    }
};

window.promptAction = function() {
    let prompt = document.querySelector('.prompt-overlay');
    if (prompt) {
        prompt.classList.add('is-hidden');

        let eltext = document.querySelector('#txtInputValue');

        window.currentPromptCallback(eltext.value);
    }
};

window.setBodyInitStyle = function() {
    let body = document.querySelector('body');
    if (body) {
        body.classList.add('background-overlay');
        body.style.backgroundImage = 'url("img/background.png")';
    }
};

window.clearBodyInitStyle = function() {
    let body = document.querySelector('body');
    if (body) {
        body.classList.remove('background-overlay');
        body.style.backgroundImage = 'unset';
    }
};

window.playSound = function(url) {
    try {
        const audio = new Audio(url);
        audio.play();
    } catch (error) {
        console.error(error);
    }
};

window.ajax = function(method, url, data = null, callback = function(code, response){}) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            callback(req.status, JSON.parse(req.response));
        }
    };

    req.open(method, url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send((data !== null) ? JSON.stringify(data) : null);
};

window.pickLetter = function(callback = function(name, message) {}) {
    window.ajax('GET', window.krepaBackend + '/letters/pick', null, function(code, response) {
        if ((code == 200) && (response.code == 200)) {
            callback(response.data.pet, response.data.message);
        } else {
            console.warn(response);
        }
    });
};

window.addLetter = function(message, callback = function() {}) {
    const pet = localStorage.getItem('krepa_name');

    window.ajax('POST', window.krepaBackend + '/letters/add', { pet: pet, message: message }, function(code, response) {
        if ((code == 200) && (response.code == 200)) {
            callback();
        } else {
            console.warn(response);
        }
    });
};

window.openLetter = function(title, message, cb = function() {}) {
    let dialog = document.querySelector('.letter-reading-overlay');
    if (dialog) {
        let elTitle = document.querySelector('.letter-reading-title');
        elTitle.innerHTML = title;

        let elMessage = document.querySelector('.letter-reading-message');
        elMessage.innerHTML = message.replaceAll('\n', '<br/>');

        window.currentOpenLetterCallback = cb;

        dialog.classList.remove('is-hidden');
    }
};

window.closeOpenLetter = function() {
    let dialog = document.querySelector('.letter-reading-overlay');
    if (dialog) {
        dialog.classList.add('is-hidden');

        window.currentOpenLetterCallback();
    }
};