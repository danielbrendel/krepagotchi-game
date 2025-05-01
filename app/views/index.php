<script>
    window.startGame = function() {
        gameconfig.physics.arcade.debug = {{ env('APP_DEBUG') ? 'true' : 'false' }};
        gameconfig.scale.width = {{ env('APP_GAMERESX') }};
        gameconfig.scale.height = {{ env('APP_GAMERESY') }};
        
        const game = new Phaser.Game(gameconfig);
    };
</script>
