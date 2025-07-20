import './../sass/app.scss';
require('phaser');

const MAX_ARCHIVE_DISPLAY_ITEMS = 15;
const MAX_LETTER_MESSAGE_PREVIEW_LEN = 10;

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

window.pickLetter = function(callback = function(name, message, date) {}) {
    window.ajax('GET', window.krepaBackend + '/letters/pick', null, function(code, response) {
        if ((code == 200) && (response.code == 200)) {
            callback(response.data.pet, response.data.message, response.data.date);
        } else {
            if (window.appDebugMode) {
                console.warn(response);
            }
        }
    });
};

window.addLetter = function(message, callback = function() {}) {
    const pet = localStorage.getItem('krepa_name');

    window.ajax('POST', window.krepaBackend + '/letters/add', { pet: pet, message: message }, function(code, response) {
        if ((code == 200) && (response.code == 200)) {
            callback();
        } else {
            if (window.appDebugMode) {
                console.warn(response);
            }
        }
    });
};

window.checkLetter = function(type, callback = function(status) {}) {
    window.ajax('GET', window.krepaBackend + '/letters/check/' + type, null, function(code, response) {
        if ((code == 200) && (response.code == 200)) {
            callback(response.status);
        } else {
            if (window.appDebugMode) {
                console.warn(response);
            }
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

        let elExtraButton = document.querySelector('#letter-archive-item-delete');
        if ((elExtraButton) && (!elExtraButton.classList.contains('is-hidden'))) {
            elExtraButton.classList.add('is-hidden');
        }

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

window.draftLetter = function(title, message, cb = function(event) {}) {
    let dialog = document.querySelector('.letter-writing-overlay');
    if (dialog) {
        let elTitle = document.querySelector('.letter-writing-title');
        elTitle.innerHTML = title;

        let elMessage = document.querySelector('#letter-writing-message');
        elMessage.placeholder = message;

        window.currentDraftLetterCallback = cb;

        dialog.classList.remove('is-hidden');
    }
};

window.sendLetter = function() {
    let dialog = document.querySelector('.letter-writing-overlay');
    if (dialog) {
        let message = document.querySelector('#letter-writing-message');

        window.addLetter(message.value, function() {
            window.currentDraftLetterCallback('sent');
        });

        dialog.classList.add('is-hidden');
    }
};

window.closeDraft = function() {
    let dialog = document.querySelector('.letter-writing-overlay');
    if (dialog) {
        window.currentDraftLetterCallback('aborted');

        dialog.classList.add('is-hidden');
    }
};

window.addToArchive = function(from, message, date) {
    let data = {
        from: from,
        message: message,
        date: date
    };

    let count = localStorage.getItem('archive.count');
    if (count === null) {
        count = 0;
    }

    count = parseInt(count);

    localStorage.setItem('archive.letter.' + count, JSON.stringify(data));
    localStorage.setItem('archive.count', (count + 1).toString());
};

window.getArchiveCount = function() {
    let count = localStorage.getItem('archive.count');
    if (count === null) {
        return 0;
    }

    return parseInt(count);
};

window.getArchiveItem = function(id) {
    return JSON.parse(localStorage.getItem('archive.letter.' + id));
};

window.getArchiveAll = function() {
    let result = [];

    let letters = Object.entries(localStorage).filter(([key]) => key.startsWith('archive.letter'));
    for (let i = 0; i < letters.length; i++) {
        result.push({
            ident: letters[i][0],
            data: JSON.parse(letters[i][1])
        });
    }

    return result;
};

window.removeArchiveItemByNum = function(num) {
    localStorage.removeItem('archive.letter.' + num);

    let count = window.getArchiveCount();
    if (count > 0) {
        localStorage.setItem('archive.count', count - 1);
    }
};

window.removeArchiveItemByIdent = function(id) {
    localStorage.removeItem(id);

    let count = window.getArchiveCount();
    if (count > 0) {
        localStorage.setItem('archive.count', count - 1);
    }
};

window.clearArchive = function() {
    let letters = Object.entries(localStorage).filter(([key]) => key.startsWith('archive.letter'));

    for (let i = 0; i < letters.length; i++) {
        localStorage.removeItem(letters[i][0]);
    }

    localStorage.setItem('archive.count', 0);
};

window.openArchive = function(title = 'Letter Archive') {
    let dialog = document.querySelector('.letter-archive-overlay');
    if (dialog) {
        let elTitle = document.querySelector('.letter-archive-title');
        elTitle.innerHTML = title;

        let elList = document.querySelector('.letter-archive-list');
        if (elList) {
            const archive = window.getArchiveAll();

            elList.innerHTML = '';

            let maxiter = 0;

            if (archive.length > 0) {
                for (let i = 0; i < archive.length; i++) {
                    elList.innerHTML += `
                        <div class="archive-item">
                            <textarea class="is-hidden" id="archive-vault-from-${i}">${archive[i].data.from}</textarea>
                            <textarea class="is-hidden" id="archive-vault-message-${i}">${archive[i].data.message}</textarea>

                            <div class="archive-item-from">${archive[i].data.from}</div>

                            <div class="archive-item-preview">
                                <a href="javascript:void(0);" onclick="let btndel = document.getElementById('letter-archive-item-delete'); btndel.dataset.target = '${archive[i].ident}'; window.openLetter(document.getElementById('archive-vault-from-${i}').value, document.getElementById('archive-vault-message-${i}').value); btndel.classList.remove('is-hidden'); document.querySelector('.letter-archive-overlay').classList.add('is-hidden')">${archive[i].data.message.substr(0, MAX_LETTER_MESSAGE_PREVIEW_LEN) + '...'}</a>
                            </div>

                            <div class="archive-item-date">${archive[i].data.date}</div>
                        </div>
                    `;

                    maxiter++;

                    if (maxiter >= MAX_ARCHIVE_DISPLAY_ITEMS) {
                        break;
                    }
                }
            } else {
                elList.innerHTML = `<div class="archive-empty">You don't have any saved letters.</div>`
            }
        }

        dialog.classList.remove('is-hidden');
    }
};

window.closeArchive = function() {
    let dialog = document.querySelector('.letter-archive-overlay');
    if (dialog) {
        dialog.classList.add('is-hidden');
    }
};