<!doctype html>
<html lang='{{ getLocale() }}'>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-with, initial-scale=1.0'>

        <meta name="author" content="{{ env('APP_AUTHOR') }}">
        <meta name="description" content="{{ env('APP_DESCRIPTION') }}">
        
        <title>{{ env('APP_NAME') }}</title>

        <link rel="icon" type="image/png" href="{{ asset('img/logo.png') }}"/>

        <script src='{{ asset('js/app.js') }}'></script>
        <script src='{{ asset('game/game.js') }}'></script>
    </head>

    <body>
        {%yield%}
    </body>
</html>
