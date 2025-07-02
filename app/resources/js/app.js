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