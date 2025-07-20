<!doctype html>
<html lang='{{ getLocale() }}'>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>

        <meta name="author" content="{{ env('APP_AUTHOR') }}">
        <meta name="description" content="{{ env('APP_DESCRIPTION') }}">

        <meta name="og:title" property="og:title" content="{{ env('APP_NAME') }}">
        <meta name="og:description" property="og:description" content="{{ env('APP_DESCRIPTION') }}">
        <meta name="og:url" property="og:url" content="{{ url('/') }}">
        <meta name="og:image" property="og:image" content="{{ asset('img/preview.png') }}">
        
        <title>{{ env('APP_NAME') }}</title>

        <link rel="manifest" href="{{ asset('manifest.json') }}"/>

        <link rel="icon" type="image/png" href="{{ asset('img/logo.png') }}"/>

        <script src='{{ asset('js/app.js') }}'></script>
        <script src='{{ asset('game/game.js') }}'></script>
    </head>

    <body>
        {%content%}

        <div class="prompt-overlay is-hidden">
            <div id="prompt-content" class="prompt-content">
                <div class="prompt-title"></div>

                <div class="prompt-label"></div>

                <div class="prompt-input">
                    <input type="text" id="txtInputValue" value=""/>
                </div>

                <div class="prompt-action">
                    <a class="button button-save" href="javascript:void(0);" onclick="window.promptAction();">Save</a>
                </div>
            </div>
        </div>

        <div class="letter-reading-overlay is-hidden">
            <div id="letter-reading-content" class="letter-reading-content">
                <div class="letter-reading-title"></div>

                <div class="letter-reading-message"></div>

                <div class="letter-reading-action">
                    <span><a class="button button-close" href="javascript:void(0);" onclick="window.closeOpenLetter();">Close</a></span>
                    <span id="letter-archive-item-delete" class="is-hidden" data-target=""><a class="button button-delete" href="javascript:void(0);" onclick="if (confirm('Do you really want to delete this letter?')) { window.removeArchiveItemByIdent(document.getElementById('letter-archive-item-delete').dataset.target); document.querySelector('.letter-reading-overlay').classList.add('is-hidden'); }">Delete</a></span>
                </div>
            </div>
        </div>

        <div class="letter-writing-overlay is-hidden">
            <div id="letter-writing-content" class="letter-writing-content">
                <div class="letter-writing-title"></div>

                <div class="letter-writing-message">
                    <textarea id="letter-writing-message"></textarea>
                </div>

                <div class="letter-writing-action">
                    <span><a class="button button-send" href="javascript:void(0);" onclick="window.sendLetter();">Send</a></span>
                    <span><a class="button button-close" href="javascript:void(0);" onclick="window.closeDraft();">Close</a></span>
                </div>
            </div>
        </div>

        <div class="letter-archive-overlay is-hidden">
            <div id="letter-archive-content" class="letter-archive-content">
                <div class="letter-archive-title"></div>

                <div class="letter-archive-list" id="letter-archive-list"></div>

                <div class="letter-archive-action">
                    <a class="button button-close" href="javascript:void(0);" onclick="window.closeArchive();">Close</a>
                </div>
            </div>
        </div>

        <script>
            window.krepaBackend = '{{ env('APP_BACKEND') }}';

            window.onload = function() {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('./serviceworker.js', { scope: '/' })
                        .then(function(registration){
                            window.serviceWorkerEnabled = true;
                        }).catch(function(err){
                            window.serviceWorkerEnabled = false;
                            console.error(err);
                        });
                }
            };

            document.addEventListener('DOMContentLoaded', function() {
                let krepaName = localStorage.getItem('krepa_name');
                if ((!krepaName) || (!(krepaName.length > 0))) {
                    window.setBodyInitStyle();

                    localStorage.setItem('krepa_name', '');
                    localStorage.setItem('krepa_stats_affection', {{ env('KREPA_INITIAL_AFFECTION', 100) }});
                    localStorage.setItem('krepa_stats_full', {{ env('KREPA_INITIAL_FULLNESS', 100) }});
                    localStorage.setItem('krepa_stats_health', {{ env('KREPA_INITIAL_HEALTH', 100) }});
                    localStorage.setItem('krepa_birthdate', Date.now());
                    localStorage.setItem('krepa_initmsg', 0);
                    localStorage.setItem('krepa_sick', 0);
                    localStorage.setItem('food_objects', JSON.stringify([]));
                    localStorage.setItem('poop_objects', JSON.stringify([]));
                    localStorage.setItem('updated_timestamp', Number(Date.now()));

                    window.showPrompt('<img src="{{ asset('img/logo.png') }}" alt="logo"/>&nbsp;{{ env('APP_NAME') }}', 'Please give your Krepa a name!', function(text) {
                        localStorage.setItem('krepa_name', text);

                        window.clearBodyInitStyle();
                        window.playSound('{{ asset('game/assets/sounds/nameselect.wav') }}');
                        window.startGame();
                    }, 'Krepa');
                } else {
                    window.startGame();
                }
            });
        </script>
    </body>
</html>
