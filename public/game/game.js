class MyGame extends Phaser.Scene {
      preload()
      {
            this.load.image('background', 'game/assets/sprites/background.png');
            this.load.image('fence_h', 'game/assets/sprites/fence-horizontal.png');
            this.load.image('fence_v', 'game/assets/sprites/fence-vertical.png');
            this.load.image('slot', 'game/assets/sprites/slot.png');
            this.load.image('tnt', 'game/assets/sprites/tnt.png');
            this.load.image('hand', 'game/assets/sprites/hand.png');
            this.load.image('brush', 'game/assets/sprites/brush.png');
            this.load.image('pill', 'game/assets/sprites/pill.png');
            this.load.spritesheet('krepa', 'game/assets/sprites/krepa.png', { frameWidth: 1024, frameHeight: 1536 });
            this.load.spritesheet('krepa_foot_left', 'game/assets/sprites/krepa_foot_left.png', { frameWidth: 334, frameHeight: 400 });
            this.load.spritesheet('krepa_foot_right', 'game/assets/sprites/krepa_foot_right.png', { frameWidth: 334, frameHeight: 400 });
            this.load.spritesheet('plant1', 'game/assets/sprites/plant1.png', { frameWidth: 34, frameHeight: 32 });
            this.load.spritesheet('plant2', 'game/assets/sprites/plant2.png', { frameWidth: 47, frameHeight: 30 });
            this.load.spritesheet('plant3', 'game/assets/sprites/plant3.png', { frameWidth: 39, frameHeight: 35 });
            this.load.spritesheet('plant4', 'game/assets/sprites/plant4.png', { frameWidth: 41, frameHeight: 35 });
            
            this.cursors = this.input.keyboard.createCursorKeys();
      }

      create()
      {
            let self = this;

            this.krepaName = this.getConfigValue('krepa_name', 'Krepa');

            this.add.image(0, 0, 'background').setOrigin(0, 0);

            this.add.image(100, 105, 'plant1');
            this.add.image(250, 200, 'plant1');
            this.add.image(111, 450, 'plant1');
            this.add.image(200, 492, 'plant1');
            this.add.image(200, 300, 'plant2');
            this.add.image(300, 400, 'plant3');
            this.add.image(50, 270, 'plant4');

            this.loadMenu();

            this.fence_v_left = this.add.tileSprite(0, 0, 14, gameconfig.scale.height - 90, 'fence_v').setOrigin(0, 0);
            this.fence_v_right = this.add.tileSprite(gameconfig.scale.width - 14, 0, 14, gameconfig.scale.height - 90, 'fence_v').setOrigin(0, 0);
            this.fence_h_top = this.add.tileSprite(0, 0, gameconfig.scale.width, 30, 'fence_h').setOrigin(0, 0);
            this.fence_h_bottom = this.add.tileSprite(0, gameconfig.scale.height - 111, gameconfig.scale.width, 30, 'fence_h').setOrigin(0, 0);

            this.krepa_body = this.add.sprite(0, 0, 'krepa');
            this.krepa_foot_left = this.add.sprite(-190, this.krepa_body.height - 990, 'krepa_foot_left');
            this.krepa_foot_right = this.add.sprite(190, this.krepa_body.height - 990, 'krepa_foot_right');

            this.krepa = this.add.container(Phaser.Math.Between(50, 300), Phaser.Math.Between(50, 450), [this.krepa_body, this.krepa_foot_left, this.krepa_foot_right]);
            this.krepa.setScale(0.05);
            this.physics.world.enable(this.krepa);
            this.krepa.body.setCollideWorldBounds(true);
            this.krepa.body.setOffset(-640, -590);

            this.txtKrepaName = this.add.text(0, 0, this.krepaName, {
                  fontSize: '12px',
                  color: 'rgb(250, 250, 250)',
                  fontFamily: 'Pixel, monospace'
            });

            this.krepaSpeed = 0;
            this.krepaRotation = 10.0;

            this.krepaTweenFootLeft = this.tweens.add({
                  targets: this.krepa_foot_left,
                  rotation: Phaser.Math.DegToRad(25),
                  yoyo: true,
                  repeat: -1,
                  duration: 150,
                  ease: 'Sine.easeInOut',
                  paused: true
            });

            this.krepaTweenFootRight = this.tweens.add({
                  targets: this.krepa_foot_right,
                  rotation: Phaser.Math.DegToRad(-25),
                  yoyo: true,
                  repeat: -1,
                  duration: 150,
                  ease: 'Sine.easeInOut',
                  paused: true
            });

            this.tmrKrepaRotationChange = this.time.addEvent({
                  delay: Phaser.Math.Between(2000, 4500),
                  loop: true,
                  callback: function() {
                        self.krepaRotation = Phaser.Math.Between(0, 360);
                  },
                  callbackScope: self
            });

            this.tmrKrepaSpeedChange = this.time.addEvent({
                  delay: Phaser.Math.Between(2000, 4500),
                  loop: true,
                  callback: function() {
                        self.krepaSpeed = Phaser.Math.Between(0, 50);
                  },
                  callbackScope: self
            });
      }

      update()
      {
            this.moveKrepa();
      }

      loadMenu()
      {
            let self = this;

            let iMenuStartX = 83;
            for (let i = 0; i < 4; i++) {
                  this.add.image(iMenuStartX + i * 64, gameconfig.scale.height - 40, 'slot').setScale(0.5);
            }

            const food = this.add.image(iMenuStartX, gameconfig.scale.height - 40 + 1, 'tnt').setScale(0.05).setInteractive();
            food.on('pointerdown', function() {
                  console.log('Feeding...');
            });
            food.on('pointerover', function() { food.setScale(0.055); });
            food.on('pointerout', function() { food.setScale(0.05); });

            const hand = this.add.image(iMenuStartX + 64 * 1, gameconfig.scale.height - 40 + 1, 'hand').setInteractive();
            hand.on('pointerdown', function() {
                  console.log('Petting...');
            });
            hand.on('pointerover', function() { hand.setScale(1.1); });
            hand.on('pointerout', function() { hand.setScale(1.0); });

            const brush = this.add.image(iMenuStartX + 64 * 2, gameconfig.scale.height - 40 + 1, 'brush').setInteractive();
            brush.on('pointerdown', function() {
                  console.log('Cleaning...');
            });
            brush.on('pointerover', function() { brush.setScale(1.1); });
            brush.on('pointerout', function() { brush.setScale(1.0); });
            
            const pill = this.add.image(iMenuStartX + 64 * 3, gameconfig.scale.height - 40 + 1, 'pill').setRotation(320).setInteractive();
            pill.on('pointerdown', function() {
                  console.log('Giving meds...');
            });
            pill.on('pointerover', function() { pill.setScale(1.1); });
            pill.on('pointerout', function() { pill.setScale(1.0); });
      }

      moveKrepa()
      {
            if (this.krepaSpeed > 0) {
                  const angleRad = Phaser.Math.DegToRad(Phaser.Math.Angle.WrapDegrees(this.krepaRotation));

                  this.krepa.body.setVelocity(
                        Math.cos(angleRad) * this.krepaSpeed,
                        Math.sin(angleRad) * this.krepaSpeed
                  );

                  if (this.krepaTweenFootLeft.isPaused()) {
                        this.krepaTweenFootLeft.resume();
                  }

                  if (this.krepaTweenFootRight.isPaused()) {
                        this.krepaTweenFootRight.resume();
                  }
            } else {
                  this.krepa.body.setVelocity(0, 0);

                  if (!this.krepaTweenFootLeft.isPaused()) {
                        this.krepaTweenFootLeft.pause();
                  }

                  if (!this.krepaTweenFootRight.isPaused()) {
                        this.krepaTweenFootRight.pause();
                  }
            }

            this.txtKrepaName.setPosition(this.krepa.body.x + this.krepa.body.width / 2 - this.txtKrepaName.width / 2, this.krepa.body.y - 25);
      }

      getConfigValue(item, defval = null)
      {
            let result = localStorage.getItem(item);

            if (result === null) {
                  result = defval;
            }

            return result;
      }

      setConfigValue(item, value)
      {
            localStorage.setItem(item, value);
      }
}

const gameconfig = {
       type: Phaser.AUTO,
       scene: MyGame,
       physics: {
          default: 'arcade',
          arcade: {
                gravity: { y: 0 },
                debug: true
           }
       },
        scale: {
           mode: Phaser.Scale.FIT,
           autoCenter: Phaser.Scale.CENTER_BOTH,
           width: 360,
           height: 640
     }
};
