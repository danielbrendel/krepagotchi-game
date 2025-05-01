import './../sass/app.scss';
require('phaser');

window.currentPromptCallback = function(text) {};

window.showPrompt = function(label, cb = function(text) {}, deftext = '') {
    let prompt = document.querySelector('.prompt-overlay');
    if (prompt) {
        let title = document.querySelector('.prompt-title');
        title.innerText = label;

        let eltext = document.querySelector('#txtInputValue');
        eltext.value = deftext;

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

window.playSound = function(url) {
    const audio = new Audio(url);
    audio.play();
};