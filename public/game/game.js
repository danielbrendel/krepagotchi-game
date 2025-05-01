const MAX_WALKING_SPEED = 50;
const FOOD_ADD_COUNT = 10;

class KrepagotchiGame extends Phaser.Scene {
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
            this.load.image('affection', 'game/assets/sprites/affection.png');
            this.load.image('food', 'game/assets/sprites/food.png');
            this.load.image('health', 'game/assets/sprites/health.png');
            this.load.image('btn_circle', 'game/assets/sprites/btn_circle.png');
            this.load.image('sym_help', 'game/assets/sprites/sym_help.png');
            
            this.load.spritesheet('krepa', 'game/assets/sprites/krepa.png', { frameWidth: 1024, frameHeight: 1536 });
            this.load.spritesheet('krepa_foot_left', 'game/assets/sprites/krepa_foot_left.png', { frameWidth: 334, frameHeight: 400 });
            this.load.spritesheet('krepa_foot_right', 'game/assets/sprites/krepa_foot_right.png', { frameWidth: 334, frameHeight: 400 });
            this.load.spritesheet('plant1', 'game/assets/sprites/plant1.png', { frameWidth: 34, frameHeight: 32 });
            this.load.spritesheet('plant2', 'game/assets/sprites/plant2.png', { frameWidth: 47, frameHeight: 30 });
            this.load.spritesheet('plant3', 'game/assets/sprites/plant3.png', { frameWidth: 39, frameHeight: 35 });
            this.load.spritesheet('plant4', 'game/assets/sprites/plant4.png', { frameWidth: 41, frameHeight: 35 });
            this.load.spritesheet('tntfood', 'game/assets/sprites/tntfood.png', { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('explosion', 'game/assets/sprites/explosion.png', { frameWidth: 256, frameHeight: 256 });

            this.load.audio('theme', 'game/assets/sounds/theme.wav');
            this.load.audio('eating', 'game/assets/sounds/eating.wav');
            this.load.audio('afraid', 'game/assets/sounds/afraid.wav');
            this.load.audio('fuse', 'game/assets/sounds/fuse.wav');
            this.load.audio('explosion', 'game/assets/sounds/explosion.wav');
            
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

            this.fence_v_left = this.add.tileSprite(0, 50, 14, gameconfig.scale.height - 140, 'fence_v').setOrigin(0, 0);
            this.fence_v_right = this.add.tileSprite(gameconfig.scale.width - 14, 50, 14, gameconfig.scale.height - 140, 'fence_v').setOrigin(0, 0);
            this.fence_h_top = this.add.tileSprite(0, 50, gameconfig.scale.width, 30, 'fence_h').setOrigin(0, 0);
            this.fence_h_bottom = this.add.tileSprite(0, gameconfig.scale.height - 120, gameconfig.scale.width, 30, 'fence_h').setOrigin(0, 0);

            this.krepa_body = this.add.sprite(0, 0, 'krepa');
            this.krepa_foot_left = this.add.sprite(-190, this.krepa_body.height - 990, 'krepa_foot_left');
            this.krepa_foot_right = this.add.sprite(190, this.krepa_body.height - 990, 'krepa_foot_right');

            this.krepa = this.add.container(Phaser.Math.Between(30, 320), Phaser.Math.Between(200, 450), [this.krepa_body, this.krepa_foot_left, this.krepa_foot_right]);
            this.krepa.setScale(0.05);
            this.physics.world.enable(this.krepa);
            this.krepa.body.setCollideWorldBounds(true);
            this.krepa.body.setOffset(-150, 50);
            this.krepa.setSize(this.krepa_body.width, this.krepa_body.height);
            this.krepa.setInteractive();

            this.fenceColliderTop = this.physics.add.staticImage(0, 65, null).setSize(gameconfig.scale.width * 2, 32).setVisible(false);
            this.physics.add.collider(this.krepa, this.fenceColliderTop);
            this.fenceColliderBottom = this.physics.add.staticImage(0, gameconfig.scale.height - 105, null).setSize(gameconfig.scale.width * 2, 32).setVisible(false);
            this.physics.add.collider(this.krepa, this.fenceColliderBottom);

            this.txtKrepaName = this.add.text(0, 0, this.krepaName, {
                  fontSize: '12px',
                  color: 'rgb(250, 250, 250)',
                  fontFamily: 'Pixel, monospace'
            });

            this.krepaSpeed = 0;
            this.krepaSpeedBeforeDrag = 0;
            this.krepaRotation = 10.0;
            this.krepaBlink = 0;

            this.krepaStats = {
                  full: self.getConfigValue('krepa_stats_full'),
                  health: self.getConfigValue('krepa_stats_health'),
                  affection: self.getConfigValue('krepa_stats_affection')
            };

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
                        self.krepaSpeed = Phaser.Math.Between(0, MAX_WALKING_SPEED);
                  },
                  callbackScope: self
            });

            this.tmrKrepaHealthCheck = this.time.addEvent({
                  delay: 100,
                  loop: true,
                  callback: function() {
                        if ((self.krepaStats.full <= 0) || (self.krepaStats.affection <= 0)) {
                              self.krepaStats.health--;
                        }

                        if (self.krepaStats.health <= 0) {
                              self.explodeKrepa();
                              self.tmrKrepaHealthCheck.paused = true;
                        }
                  },
                  callbackScope: self
            });

            this.anims.create({
                  key: 'explosion',
                  frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 63 }),
                  frameRate: 25,
                  repeat: 0
            });

            this.input.setDraggable(this.krepa);
            this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
                  if (gameObject === self.krepa) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                  }
            });
            this.input.on('dragstart', function(pointer, gameObject) {
                  self.krepaSpeedBeforeDrag = self.krepaSpeed;
                  self.krepaSpeed = MAX_WALKING_SPEED;

                  self.krepaTweenFootLeft.timeScale = 4;
                  self.krepaTweenFootRight.timeScale = 4;
                  
                  self.sndAfraid.play();
            });
            this.input.on('dragend', function(pointer, gameObject) {
                  self.krepaTweenFootLeft.timeScale = 1;
                  self.krepaTweenFootRight.timeScale = 1;

                  self.krepaSpeed = self.krepaSpeedBeforeDrag;
            });

            this.sndTheme = this.sound.add('theme');
            this.sndEating = this.sound.add('eating');
            this.sndAfraid = this.sound.add('afraid');
            this.sndFuse = this.sound.add('fuse');
            this.sndExplosion = this.sound.add('explosion');

            this.loadHelp();
            this.loadStats();
            this.loadMenu();

            this.inDetonation = false;

            this.sndTheme.loop = true;
            //this.sndTheme.play();
      }

      update()
      {
            if (this.inDetonation) {
                  return;
            }

            this.moveKrepa();
            this.updateStats();
      }

      loadHelp()
      {
            const infoText = this.add.text(0, 0, gameconfig.about.name + " v" + gameconfig.about.version + "\nBy " + gameconfig.about.author + "\n\n" + gameconfig.about.contact + "\n\n" + gameconfig.about.description + "\n\n" + gameconfig.about.info, {
                  fontSize: '20px',
                  color: 'rgb(250, 250, 25)',
                  fontFamily: 'Pixel, monospace',
                  backgroundColor: 'rgb(50, 50, 50)',
                  padding: { x: 10, y: 5 }
            });
            infoText.setInteractive();
            infoText.on('pointerdown', function() {
                  infoText.setVisible(false);
            });
            infoText.setPosition(gameconfig.scale.width / 2 - infoText.width / 2, gameconfig.scale.height / 2 - infoText.height / 2);
            infoText.setVisible(false);

            this.add.image(gameconfig.scale.width - 25, 25, 'btn_circle').setScale(0.8);

            const helpAction = this.add.image(gameconfig.scale.width - 25, 25, 'sym_help').setScale(0.8).setInteractive();
            helpAction.on('pointerdown', function() {
                  if (infoText.visible) {
                        infoText.setVisible(false);
                  } else {
                        infoText.setVisible(true);
                  }
                  
            });
            helpAction.on('pointerover', function() { helpAction.setScale(1.01); });
            helpAction.on('pointerout', function() { helpAction.setScale(0.8); });
      }

      loadStats()
      {
            this.add.image(20, 25, 'affection').setScale(0.8);
            this.txtAffectionValue = this.add.text(40, 17, this.krepaStats.affection);

            this.add.image(100, 25, 'food');
            this.txtFoodValue = this.add.text(120, 17, this.krepaStats.full);

            this.add.image(180, 25, 'health');
            this.txtHealthValue = this.add.text(200, 17, this.krepaStats.health);
      }

      loadMenu()
      {
            let self = this;

            let iMenuStartX = 83;
            for (let i = 0; i < 4; i++) {
                  this.add.image(iMenuStartX + i * 64, gameconfig.scale.height - 45, 'slot').setScale(0.5);
            }

            const food = this.add.image(iMenuStartX, gameconfig.scale.height - 45 + 1, 'tnt').setScale(0.05).setInteractive();
            food.on('pointerdown', function() {
                  self.spawnFood();
            });
            food.on('pointerover', function() { food.setScale(0.055); });
            food.on('pointerout', function() { food.setScale(0.05); });

            const hand = this.add.image(iMenuStartX + 64 * 1, gameconfig.scale.height - 45 + 1, 'hand').setInteractive();
            hand.on('pointerdown', function() {
                  console.log('Petting...');
            });
            hand.on('pointerover', function() { hand.setScale(1.1); });
            hand.on('pointerout', function() { hand.setScale(1.0); });

            const brush = this.add.image(iMenuStartX + 64 * 2, gameconfig.scale.height - 45 + 1, 'brush').setInteractive();
            brush.on('pointerdown', function() {
                  console.log('Cleaning...');
            });
            brush.on('pointerover', function() { brush.setScale(1.1); });
            brush.on('pointerout', function() { brush.setScale(1.0); });
            
            const pill = this.add.image(iMenuStartX + 64 * 3, gameconfig.scale.height - 45 + 1, 'pill').setRotation(320).setInteractive();
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

      updateStats()
      {
            this.txtAffectionValue.text = this.krepaStats.affection;
            this.txtFoodValue.text = this.krepaStats.full;
            this.txtHealthValue.text = this.krepaStats.health;
      }

      spawnFood()
      {
            let self = this;

            let posx = this.krepa.body.x + Phaser.Math.Between(0, 200) - 50;
            let posy = this.krepa.body.y + Phaser.Math.Between(0, 200) - 50;

            let food = this.physics.add.sprite(posx, posy, 'tntfood').refreshBody();
            food.setCollideWorldBounds(true);

            food.setInteractive();
            food.on('pointerdown', function() {
                  food.destroy();
            });

            this.physics.add.collider(this.krepa, food, function() {
                  if (self.krepaStats.full < 100) {
                        self.krepaStats.full += FOOD_ADD_COUNT;

                        if (self.krepaStats.full > 100) {
                              self.krepaStats.full = 100;
                        }

                        self.sndEating.play();

                        food.destroy();
                  }
            });

            this.physics.add.collider(food, this.fenceColliderTop);
            this.physics.add.collider(food, this.fenceColliderBottom);
      }

      explodeKrepa()
      {
            let self = this;

            if (this.inDetonation) {
                  return;
            }

            this.krepaBlink = 3 + 1;

            this.time.addEvent({
                  delay: 200,
                  repeat: self.krepaBlink * 2,
                  callback: function() {
                        if (self.krepaBlink % 2 == 0) {
                              self.krepa.iterate(child => { child.setTintFill(0xffffff); });
                        } else {
                              self.krepa.iterate(child => { child.clearTint(); });
                        }

                        self.krepaBlink--;
                  },
                  callbackScope: self
            });

            this.sndFuse.once('complete', function() {
                  self.krepa.setVisible(false);
                  self.txtKrepaName.setVisible(false);

                  self.sndExplosion.play();
                  
                  let explosion = self.physics.add.sprite(self.krepa.x, self.krepa.y, 'explosion').setScale(1.5);
                  explosion.anims.play('explosion', true);
                  explosion.on('animationcomplete', function() {
                        explosion.destroy();

                        const restartAction = self.add.text(0, 0, self.krepaName + ' is now at a better place.\n\nBorn: ' + self.getReadableDate(Number(self.getConfigValue('krepa_birthdate'))) + '\nDetonated: ' + self.getReadableDate(Date.now()) + '\n\nClick or tap to restart', {
                              fontSize: '20px',
                              color: 'rgb(250, 50, 0)',
                              fontFamily: 'Pixel, monospace',
                              backgroundColor: 'rgb(50, 50, 50)',
                              padding: { x: 10, y: 5 }
                        });
                        restartAction.setInteractive();
                        restartAction.on('pointerdown', function() {
                              self.restartGame();
                        });
                        restartAction.setPosition(gameconfig.scale.width / 2 - restartAction.width / 2, gameconfig.scale.height / 2 - restartAction.height / 2);
                        restartAction.setVisible(true);
                  });
            });
            this.sndFuse.play();
      }

      restartGame()
      {
            this.krepaStats.affection = 100;
            this.krepaStats.full = 100;
            this.krepaStats.health = 100;

            this.setConfigValue('krepa_stats_affection', this.krepaStats.affection);
            this.setConfigValue('krepa_stats_full', this.krepaStats.full);
            this.setConfigValue('krepa_stats_health', this.krepaStats.health);
            this.setConfigValue('krepa_birthdate', Date.now());

            location.reload();
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

      getReadableDate(timestamp)
      {
            const date = new Date(timestamp);

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
      }
}

const gameconfig = {
      type: Phaser.AUTO,
      scene: KrepagotchiGame,
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
      },
      about: {
            name: 'Krepagotchi',
            version: '1.0',
            author: 'Daniel Brendel',
            contact: '',
            description: 'Keep your Krepa as a pet',
            info: ''
      }
};
