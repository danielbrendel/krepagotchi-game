<script>
    window.startGame = function() {
        gameconfig.about.name = '{{ env('APP_NAME') }}';
        gameconfig.about.version = '{{ env('APP_VERSION') }}';
        gameconfig.about.author = '{{ env('APP_AUTHOR') }}';
        gameconfig.about.contact = '{{ env('APP_CONTACT') }}';
        gameconfig.about.description = '{{ env('APP_DESCRIPTION') }}';
        gameconfig.about.info = 'This project is a fan-made game\nand is not affiliated with\nMojang, Microsoft, Bandai,\nor any of their properties.';
        gameconfig.physics.arcade.debug = window.appDebugMode;
        gameconfig.scale.width = {{ env('APP_GAMERESX') }};
        gameconfig.scale.height = {{ env('APP_GAMERESY') }};
        
        const game = new Phaser.Game(gameconfig);
    };
</script>
