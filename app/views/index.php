<script>
    document.addEventListener('DOMContentLoaded', function() {
        gameconfig.physics.arcade.debug = {{ env('APP_DEBUG') ? 'true' : 'false' }};
        const game = new Phaser.Game(gameconfig);
    });
</script>
