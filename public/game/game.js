const MAX_WALKING_SPEED = 50;
const FOOD_ADD_COUNT = 10;
const HUNGER_VALUE = 5;
const AFFECTION_VALUE = 4;
const HEALTH_VALUE = 10;
const TIME_HEALTHCHECK = 4000 * 1000;
const TIME_AFFECTIONCHECK = 3000 * 1000;
const TIME_HUNGERCHECK = 3000 * 1000;
const TIME_OVERWEIGHTCHECK = 10 * 1000;
const TIME_POOPCHECK = 5000 * 1000;
const TOPMOST_ELEMENT = 9999;
const DRAG_TOLERANCE_THRESHOLD = 20;

class KrepagotchiGame extends Phaser.Scene {
      biome_list = [
                  {
                        ident: "grass",
                        name: "Grass",
                        background: "background.png",
                        raincolor: 0x65ccff,
                        theme: "theme.ogg",
                        ambience: ["chirp.wav", "goldfinch1.wav", "goldfinch2.wav", "peacock.wav", "quail.wav"],
                        objects: [
                              {
                                    asset: "plant1.png",
                                    pos: {
                                          x: 100,
                                          y: 105
                                    },
                                    size: {
                                          w: 34,
                                          h: 32
                                    },
                                    scale: {
                                          x: 0.8,
                                          y: 1.2
                                    }
                              },
                              {
                                    asset: "plant1.png",
                                    pos: {
                                          x: 250,
                                          y: 200
                                    },
                                    size: {
                                          w: 34,
                                          h: 32
                                    },
                                    scale: {
                                          x: 0.8,
                                          y: 1.2
                                    }
                              },
                              {
                                    asset: "plant1.png",
                                    pos: {
                                          x: 111,
                                          y: 450
                                    },
                                    size: {
                                          w: 34,
                                          h: 32
                                    },
                                    scale: {
                                          x: 0.8,
                                          y: 1.2
                                    }
                              },
                              {
                                    asset: "plant1.png",
                                    pos: {
                                          x: 200,
                                          y: 492
                                    },
                                    size: {
                                          w: 34,
                                          h: 32
                                    },
                                    scale: {
                                          x: 0.8,
                                          y: 1.2
                                    }
                              },
                              {
                                    asset: "plant2.png",
                                    pos: {
                                          x: 200,
                                          y: 300
                                    },
                                    size: {
                                          w: 47,
                                          h: 30
                                    },
                                    scale: {
                                          x: 0.8,
                                          y: 1.2
                                    }
                              },
                              {
                                    asset: "plant3.png",
                                    pos: {
                                          x: 300,
                                          y: 400
                                    },
                                    size: {
                                          w: 39,
                                          h: 35
                                    },
                                    scale: {
                                          x: 0.8,
                                          y: 1.2
                                    }
                              },
                              {
                                    asset: "plant4.png",
                                    pos: {
                                          x: 50,
                                          y: 270
                                    },
                                    size: {
                                          w: 41,
                                          h: 35
                                    },
                                    scale: {
                                          x: 0.8,
                                          y: 1.2
                                    }
                              },
                        ]
                  },
                  {
                        ident: "foliage",
                        name: "Foliage",
                        background: "background.png",
                        raincolor: 0xf0e68c,
                        theme: "theme.ogg",
                        ambience: ["crow.wav", "loon.wav", "seagull1.wav", "seagull2.wav", "vulture.wav"],
                        objects: [
                              {
                                    asset: "rock1.png",
                                    pos: {
                                          x: 100,
                                          y: 105
                                    },
                                    size: {
                                          w: 32,
                                          h: 32
                                    },
                                    scale: null
                              },
                              {
                                    asset: "rock2.png",
                                    pos: {
                                          x: 250,
                                          y: 200
                                    },
                                    size: {
                                          w: 33,
                                          h: 32
                                    },
                                    scale: null
                              },
                              {
                                    asset: "rock3.png",
                                    pos: {
                                          x: 111,
                                          y: 450
                                    },
                                    size: {
                                          w: 34,
                                          h: 29
                                    },
                                    scale: null
                              },
                              {
                                    asset: "rock4.png",
                                    pos: {
                                          x: 200,
                                          y: 492
                                    },
                                    size: {
                                          w: 30,
                                          h: 24
                                    },
                                    scale: null
                              },
                              {
                                    asset: "rock4.png",
                                    pos: {
                                          x: 200,
                                          y: 300
                                    },
                                    size: {
                                          w: 30,
                                          h: 24
                                    },
                                    scale: null
                              },
                              {
                                    asset: "rock3.png",
                                    pos: {
                                          x: 300,
                                          y: 400
                                    },
                                    size: {
                                          w: 34,
                                          h: 29
                                    },
                                    scale: null
                              },
                              {
                                    asset: "rock4.png",
                                    pos: {
                                          x: 50,
                                          y: 270
                                    },
                                    size: {
                                          w: 30,
                                          h: 24
                                    },
                                    scale: null
                              },
                        ]
                  },
                  {
                        ident: "glowath",
                        name: "Glowath",
                        background: "background.png",
                        raincolor: 0x39ff14,
                        theme: "theme.ogg",
                        ambience: ["bubble1.wav", "bubble2.wav", "bubble3.wav", "bubble4.wav", "bubble5.wav"],
                        objects: [
                              {
                                    asset: "bamboo.png",
                                    pos: {
                                          x: 100,
                                          y: 105
                                    },
                                    size: {
                                          w: 256,
                                          h: 128,
                                          scale: 0.5
                                    },
                                    scale: {
                                          x: 0.45,
                                          y: 0.55
                                    }
                              },
                              {
                                    asset: "tropical1.png",
                                    pos: {
                                          x: 250,
                                          y: 200
                                    },
                                    size: {
                                          w: 256,
                                          h: 128,
                                          scale: 0.5
                                    },
                                    scale: {
                                          x: 0.45,
                                          y: 0.55
                                    }
                              },
                              {
                                    asset: "tropical1.png",
                                    pos: {
                                          x: 111,
                                          y: 450
                                    },
                                    size: {
                                          w: 256,
                                          h: 128,
                                          scale: 0.5
                                    },
                                    scale: {
                                          x: 0.45,
                                          y: 0.55
                                    }
                              },
                              {
                                    asset: "bush.png",
                                    pos: {
                                          x: 200,
                                          y: 492
                                    },
                                    size: {
                                          w: 256,
                                          h: 128,
                                          scale: 0.5
                                    },
                                    scale: {
                                          x: 0.45,
                                          y: 0.55
                                    }
                              },
                              {
                                    asset: "tropical2.png",
                                    pos: {
                                          x: 200,
                                          y: 300
                                    },
                                    size: {
                                          w: 256,
                                          h: 128,
                                          scale: 0.5
                                    },
                                    scale: {
                                          x: 0.45,
                                          y: 0.55
                                    }
                              },
                              {
                                    asset: "bamboo.png",
                                    pos: {
                                          x: 300,
                                          y: 400
                                    },
                                    size: {
                                          w: 256,
                                          h: 128,
                                          scale: 0.5
                                    },
                                    scale: {
                                          x: 0.45,
                                          y: 0.55
                                    }
                              },
                              {
                                    asset: "tropical2.png",
                                    pos: {
                                          x: 50,
                                          y: 270
                                    },
                                    size: {
                                          w: 256,
                                          h: 128,
                                          scale: 0.5
                                    },
                                    scale: {
                                          x: 0.45,
                                          y: 0.55
                                    }
                              },
                        ]
                  }
            ];

      biome_data = null;
      current_max_speed = MAX_WALKING_SPEED;

      preload()
      {
            this.precacheBiome();

            this.load.image('fence_h', 'game/assets/sprites/fence-horizontal.png');
            this.load.image('fence_v', 'game/assets/sprites/fence-vertical.png');
            this.load.image('slot', 'game/assets/sprites/slot.png');
            this.load.image('tnt', 'game/assets/sprites/tnt.png');
            this.load.image('hand', 'game/assets/sprites/hand.png');
            this.load.image('brush', 'game/assets/sprites/brush.png');
            this.load.image('pill', 'game/assets/sprites/pill.png');
            this.load.image('affection', 'game/assets/sprites/heart.png');
            this.load.image('food', 'game/assets/sprites/food.png');
            this.load.image('health', 'game/assets/sprites/health.png');
            this.load.image('btn_circle', 'game/assets/sprites/btn_circle.png');
            this.load.image('sym_help', 'game/assets/sprites/sym_help.png');
            this.load.image('biome', 'game/assets/sprites/biome.png');

            this.load.image('biome_grass', 'game/assets/sprites/biome_grass.png');
            this.load.image('biome_foliage', 'game/assets/sprites/biome_foliage.png');
            this.load.image('biome_glowath', 'game/assets/sprites/biome_glowath.png');
            
            this.load.spritesheet('krepa', 'game/assets/sprites/krepa.png', { frameWidth: 1024, frameHeight: 1536 });
            this.load.spritesheet('krepa_foot_left', 'game/assets/sprites/krepa_foot_left.png', { frameWidth: 334, frameHeight: 400 });
            this.load.spritesheet('krepa_foot_right', 'game/assets/sprites/krepa_foot_right.png', { frameWidth: 334, frameHeight: 400 });
            this.load.spritesheet('tntfood', 'game/assets/sprites/tnt.png', { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('explosion', 'game/assets/sprites/explosion.png', { frameWidth: 192, frameHeight: 192 });
            this.load.spritesheet('poop', 'game/assets/sprites/poop.png', { frameWidth: 16, frameHeight: 16 });
            this.load.spritesheet('poopsplash', 'game/assets/sprites/poop-splash.png', { frameWidth: 16, frameHeight: 16 });
            this.load.spritesheet('particle', 'game/assets/sprites/heart.png', { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('burst', 'game/assets/sprites/burst.png', { frameWidth: 192, frameHeight: 192 });
            this.load.spritesheet('smoke', 'game/assets/sprites/smoke.png', { frameWidth: 256, frameHeight: 256 });
            this.load.spritesheet('ball', 'game/assets/sprites/ball.png', { frameWidth: 76, frameHeight: 76 });
            this.load.spritesheet('butterfly', 'game/assets/sprites/butterfly.png', { frameWidth: 16, frameHeight: 16 });
            this.load.spritesheet('frog', 'game/assets/sprites/frog.png', { frameWidth: 64, frameHeight: 64 });
            this.load.spritesheet('mailbox_closed', 'game/assets/sprites/mailbox-closed.png', { frameWidth: 64, frameHeight: 64 });
            this.load.spritesheet('mailbox_open', 'game/assets/sprites/mailbox-open.png', { frameWidth: 64, frameHeight: 64 });
            this.load.spritesheet('envelope', 'game/assets/sprites/envelope.png', { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('pencil', 'game/assets/sprites/pencil.png', { frameWidth: 64, frameHeight: 64 });
            this.load.spritesheet('archive', 'game/assets/sprites/archive.png', { frameWidth: 120, frameHeight: 73 });
            this.load.spritesheet('cake', 'game/assets/sprites/cake.png', { frameWidth: 39, frameHeight: 34 });
            this.load.spritesheet('fireworks', 'game/assets/sprites/fireworks.png', { frameWidth: 256, frameHeight: 256 });
            this.load.spritesheet('happynewyear', 'game/assets/sprites/happynewyear.png', { frameWidth: 400, frameHeight: 100 });

            for (let j = 0; j < 5; j++) {
                  this.load.spritesheet('bird' + (j + 1).toString(), 'game/assets/sprites/bird' + (j + 1).toString() + '.png', { frameWidth: 32, frameHeight: 32 });
            }

            this.load.audio('click', 'game/assets/sounds/click.wav');
            this.load.audio('eating', 'game/assets/sounds/eating.wav');
            this.load.audio('tntspawn', 'game/assets/sounds/tntspawn.wav');
            this.load.audio('fuse', 'game/assets/sounds/fuse.wav');
            this.load.audio('explosion', 'game/assets/sounds/explosion.wav');
            this.load.audio('poopsplash', 'game/assets/sounds/poop-splash.wav');
            this.load.audio('burst', 'game/assets/sounds/burst.wav');
            this.load.audio('hurt', 'game/assets/sounds/hurt.wav');
            this.load.audio('purr', 'game/assets/sounds/purr.wav');
            this.load.audio('refreshed', 'game/assets/sounds/refreshed.wav');
            this.load.audio('noaction', 'game/assets/sounds/noaction.wav');
            this.load.audio('boing', 'game/assets/sounds/boing.wav');
            this.load.audio('rain_1', 'game/assets/sounds/rain_1.wav');
            this.load.audio('rain_2', 'game/assets/sounds/rain_2.wav');
            this.load.audio('thunder_1', 'game/assets/sounds/thunder_1.wav');
            this.load.audio('thunder_2', 'game/assets/sounds/thunder_2.wav');
            this.load.audio('thunder_3', 'game/assets/sounds/thunder_3.wav');
            this.load.audio('thunder_4', 'game/assets/sounds/thunder_4.wav');
            this.load.audio('thunder_5', 'game/assets/sounds/thunder_5.wav');
            this.load.audio('sneeze', 'game/assets/sounds/sneeze.wav');
            this.load.audio('frog', 'game/assets/sounds/frog.wav');
            this.load.audio('mailbox', 'game/assets/sounds/mailbox.wav');
            this.load.audio('success', 'game/assets/sounds/success.wav');
            this.load.audio('fireworks1', 'game/assets/sounds/fireworks1.wav');
            this.load.audio('fireworks2', 'game/assets/sounds/fireworks2.wav');
            this.load.audio('fireworks3', 'game/assets/sounds/fireworks3.wav');
            this.load.audio('fireworks4', 'game/assets/sounds/fireworks4.wav');

            for (let i = 1; i <= 10; i++) {
                  this.load.audio('step' + i, 'game/assets/sounds/step' + i + '.wav');
            }
      }

      create()
      {
            let self = this;

            this.krepaName = this.getConfigValue('krepa_name', 'Krepa');

            this.loadBiome();

            this.fence_v_left = this.add.tileSprite(0, 50, 14, gameconfig.scale.height - 140, 'fence_v').setOrigin(0, 0);
            this.fence_v_right = this.add.tileSprite(gameconfig.scale.width - 14, 50, 14, gameconfig.scale.height - 140, 'fence_v').setOrigin(0, 0);
            this.fence_h_top = this.add.tileSprite(0, 50, gameconfig.scale.width, 30, 'fence_h').setOrigin(0, 0);
            this.fence_h_bottom = this.add.tileSprite(0, gameconfig.scale.height - 120, gameconfig.scale.width, 30, 'fence_h').setOrigin(0, 0);

            this.krepa_body = this.add.sprite(0, 0, 'krepa');
            this.krepa_foot_left = this.add.sprite(-190, this.krepa_body.height - 990, 'krepa_foot_left');
            this.krepa_foot_right = this.add.sprite(190, this.krepa_body.height - 990, 'krepa_foot_right');

            this.physics.world.enable(this.krepa_body);

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

            this.smoke = this.physics.add.sprite(0, 0, 'smoke').setOrigin(0, 0).setScale(0.5, 0.5).setVisible(false);

            this.ball = this.physics.add.sprite(100, 100, 'ball').setOrigin(0, 0).setScale(0.4, 0.4).setVisible(false);
            this.ballDragStart = { x: 0, y: 0 };

            this.txtKrepaName = this.add.text(0, 0, this.krepaName, {
                  fontSize: '12px',
                  color: 'rgb(250, 250, 250)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  fontFamily: 'Pixel, monospace',
                  padding: { x: 5, y: 2 }
            }).setDepth(TOPMOST_ELEMENT);

            this.mailbox_closed = this.add.image(gameconfig.scale.width - 45, gameconfig.scale.height - 159, 'mailbox_closed');
            this.mailbox_open = this.add.image(gameconfig.scale.width - 45, gameconfig.scale.height - 159, 'mailbox_open').setInteractive();
            this.mailbox_open.on('pointerdown', function() {
                  self.sndClick.play();

                  window.openLetter('A letter from <strong>' + window.currentLetter.from + '</strong>', window.currentLetter.message, function() {
                        self.mailbox_glow.active = false;
                        self.mailbox_open.setVisible(false);
                        self.mailbox_closed.setVisible(true);

                        window.addToArchive(window.currentLetter.from, window.currentLetter.message, window.currentLetter.date);
                  });
            });
            this.mailbox_open.setVisible(false);

            this.mailbox_glow = this.mailbox_open.preFX.addGlow();
            this.mailbox_glow.active = false;

            this.tweens.add({
                  targets: this.mailbox_glow,
                  outerStrength: 10,
                  yoyo: true,
                  loop: -1,
                  ease: 'sine.inout'
            });

            this.draftLetter = this.add.image(gameconfig.scale.width - 105, gameconfig.scale.height - 135, 'pencil').setInteractive();
            this.draftLetter.setScale(0.3);
            this.draftLetter.setFlipX(true);
            this.draftLetter.on('pointerdown', function() {
                  window.draftLetter('Send a letter to someone', 'Enter a friendly message...', function(event) {
                        if (event === 'sent') {
                              self.sndSuccess.play();

                              self.draftLetter.setVisible(false);
                        }
                  });

                  self.sndClick.play();
            });
            this.draftLetter.setVisible(false);

            this.tweens.add({
                  targets: this.draftLetter,
                  scaleY: 0.39,
                  scaleX: 0.39,
                  duration: 700,
                  yoyo: true,
                  repeat: -1,
                  ease: 'Sine.easeInOut'
            });

            this.letterArchive = this.add.image(gameconfig.scale.width - 105, gameconfig.scale.height - 170, 'archive').setInteractive();
            this.letterArchive.setScale(0.5);
            this.letterArchive.on('pointerdown', function() {
                  window.openArchive();
                  
                  self.sndClick.play();
            });

            this.krepaSpeed = 0;
            this.krepaSpeedBeforeDrag = 0;
            this.krepaRotation = 10.0;
            this.krepaBlink = 0;
            this.krepaThoughts = [];
            this.krepaSick = false;
            this.krepaInDragging = false;
            this.krepaDragTime = 0;

            this.txtThoughtBubble = this.add.text(0, 0, '', {
                  fontSize: '12px',
                  fontStyle: 'italic',
                  color: 'rgb(250, 250, 250)',
                  fontFamily: 'Pixel, monospace',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  align: 'center',
                  padding: { x: 10, y: 5 }
            }).setDepth(TOPMOST_ELEMENT).setVisible(false);

            this.txtKrepaEmoji = this.add.text(0, 0, '', {
                  fontSize: '20px',
                  color: 'rgb(250, 250, 250)',
                  fontFamily: 'Pixel, monospace',
                  padding: { x: 10, y: 5 }
            }).setDepth(TOPMOST_ELEMENT).setVisible(false);

            this.krepaStats = {
                  full: Number(self.getConfigValue('krepa_stats_full', 100)),
                  health: Number(self.getConfigValue('krepa_stats_health', 100)),
                  affection: Number(self.getConfigValue('krepa_stats_affection', 100))
            };

            this.foods = [];
            this.poops = [];

            this.krepaPlayful = false;
            this.krepaBallHit = false;

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
                        self.krepaSpeed = Phaser.Math.Between(0, self.current_max_speed);
                  },
                  callbackScope: self
            });

            this.tmrKrepaHealthCheck = this.time.addEvent({
                  delay: TIME_HEALTHCHECK,
                  loop: true,
                  callback: function() {
                        self.krepaHealthCheck();
                  },
                  callbackScope: self
            });

            this.tmrKrepaAffection = this.time.addEvent({
                  delay: TIME_AFFECTIONCHECK,
                  loop: true,
                  callback: function() {
                        self.krepaAffectionCheck();
                  },
                  callbackScope: self
            });

            this.tmrKrepaHunger = this.time.addEvent({
                  delay: TIME_HUNGERCHECK,
                  loop: true,
                  callback: function() {
                        self.krepaHungerCheck();
                  },
                  callbackScope: self
            });

            this.tmrKrepaOverweight = this.time.addEvent({
                  delay: TIME_OVERWEIGHTCHECK,
                  loop: true,
                  callback: function() {
                        self.krepaOverweightCheck();
                  },
                  callbackScope: self
            });

            this.tmrKrepaStepSound = this.time.addEvent({
                  delay: 590,
                  loop: true,
                  callback: function() {
                        self.playStepSound();
                        self.tmrKrepaStepSound.paused = true;
                  },
                  callbackScope: self
            });

            this.tmrKrepaStepSound.paused = true;

            this.krepaWobble = this.tweens.add({
                  targets: this.krepa_body,
                  scaleY: 1.0,
                  scaleX: 1.6,
                  duration: 500,
                  yoyo: true,
                  repeat: -1,
                  ease: 'Sine.easeInOut'
            }).pause();

            this.tmrPoopCheck = this.time.addEvent({
                  delay: TIME_POOPCHECK,
                  loop: true,
                  callback: function() {
                        self.krepaPoopCheck();
                  },
                  callbackScope: self
            });

            this.hissingCount = 0;
            this.tmrHissing = this.time.addEvent({
                  delay: 300,
                  loop: true,
                  callback: function() {
                        if (self.hissingCount % 2 == 0) {
                              self.krepa.iterate(child => { child.setTintFill(0xffffff); });
                        } else {
                              self.krepa.iterate(child => { child.clearTint(); });
                        }

                        self.hissingCount++;
                  },
                  paused: true,
                  callbackScope: self
            });

            this.tmrThoughtBubbles = this.time.addEvent({
                  delay: Phaser.Math.Between(20000, 30000),
                  loop: true,
                  callback: function() {
                        self.krepaThoughtBubble();
                  },
                  callbackScope: self
            });

            this.tmrSneezing = this.time.addEvent({
                  delay: Phaser.Math.Between(5500, 12000),
                  loop: true,
                  paused: true,
                  callback: function() {
                        this.tweens.add({
                              targets: self.krepa_body,
                              scaleX: 1.2,
                              scaleY: 0.8,
                              duration: 200,
                              yoyo: false,
                              ease: 'Sine.easeIn',
                              onComplete: function() {
                                    self.tweens.add({
                                          targets: self.krepa_body,
                                          scaleX: 0.8,
                                          scaleY: 1.2,
                                          duration: 100,
                                          ease: 'Back.easeOut',
                                          yoyo: true,
                                          onComplete: function() {
                                                if (!self.inDetonation) {
                                                      self.cameras.main.shake(100, 0.005);

                                                      self.krepa_body.setScale(1.0);
                                                      
                                                      self.sound.play('sneeze', {
                                                            rate: Phaser.Math.FloatBetween(1.8, 2.4)
                                                      });

                                                      for (let i = 0; i < 3; i++) {
                                                            self.spawnFusedTNT(self.krepa.body.x + Phaser.Math.Between(0, 200) - 100, self.krepa.body.y + Phaser.Math.Between(0, 200) - 100);
                                                      }
                                                }
                                          }
                                    });
                              }
                        });
                  },
                  callbackScope: self
            });

            this.tmrButterfly = this.time.addEvent({
                  delay: Phaser.Math.Between(15000, 25000),
                  loop: true,
                  paused: self.rainy,
                  callback: function() {
                        let chance = Phaser.Math.Between(1, 2);
                        if (chance === 1) {
                              let quantity = Phaser.Math.Between(1, 9);
                              for (let i = 0; i < quantity; i++) {
                                    self.spawnButterfly();
                              }
                        } else if (chance === 2) {
                              let quantity = Phaser.Math.Between(1, 3);
                              for (let i = 0; i < quantity; i++) {
                                    self.spawnBird();
                              }
                        }
                        
                  },
                  callbackScope: self
            });

            this.tmrLetterPick = this.time.addEvent({
                  delay: Phaser.Math.Between(5000, 10000),
                  loop: false,
                  callback: function() {
                        window.pickLetter(function(name, message, date) {
                              window.currentLetter = {
                                    from: name,
                                    message: message,
                                    date: date
                              };

                              self.mailbox_closed.setVisible(false);
                              self.mailbox_open.setVisible(true);
                              self.mailbox_glow.active = true;

                              self.sndMailbox.play();
                        });
                  },
                  callbackScope: self
            });

            this.tmrDraftCheck = this.time.addEvent({
                  delay: 2000,
                  loop: false,
                  callback: function() {
                        window.checkLetter('add', function(status) {
                              if (status) {
                                    self.draftLetter.setVisible(true);
                              }
                        });
                  },
                  callbackScope: self
            });

            this.tmrObjectStorage = this.time.addEvent({
                  delay: 2000,
                  loop: true,
                  callback: function() {
                        self.storeObjectData();
                  },
                  callbackScope: self
            });

            this.tmrUpdateTimestamp = this.time.addEvent({
                  delay: 2000,
                  loop: true,
                  callback: function() {
                        this.updateTime();
                  },
                  callbackScope: self
            });

            this.anims.create({
                  key: 'explosion',
                  frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
                  frameRate: 25,
                  repeat: 0
            });

            this.anims.create({
                  key: 'poopsplash',
                  frames: this.anims.generateFrameNumbers('poopsplash', { start: 0, end: 3 }),
                  frameRate: 25,
                  repeat: 0
            });

            this.anims.create({
                  key: 'burst',
                  frames: this.anims.generateFrameNumbers('burst', { start: 0, end: 15 }),
                  frameRate: 25,
                  repeat: 0
            });

            this.anims.create({
                  key: 'smoke',
                  frames: this.anims.generateFrameNumbers('smoke', { start: 0, end: 29 }),
                  frameRate: 15,
                  repeat: -1
            });

            this.anims.create({
                  key: 'butterfly',
                  frames: this.anims.generateFrameNumbers('butterfly', { start: 0, end: 3 }),
                  frameRate: 25,
                  repeat: -1
            });

            for (let j = 0; j < 5; j++) {
                  this.anims.create({
                        key: 'bird' + (j + 1).toString(),
                        frames: this.anims.generateFrameNumbers('bird' + (j + 1).toString(), { start: 0, end: 2 }),
                        frameRate: 5,
                        repeat: -1
                  });
            }

            this.anims.create({
                  key: 'frog',
                  frames: this.anims.generateFrameNumbers('frog', { start: 0, end: 7 }),
                  frameRate: 50,
                  repeat: 1
            });

            this.anims.create({
                  key: 'fireworks',
                  frames: this.anims.generateFrameNumbers('fireworks', { start: 0, end: 29 }),
                  frameRate: 50,
                  repeat: 0
            });

            this.input.setDraggable(this.krepa);
            this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
                  if (gameObject === self.krepa) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                        
                        if (self.getDragThresholdTime() >= DRAG_TOLERANCE_THRESHOLD) {
                              self.explodeKrepa();
                        }
                  } else if (gameObject === self.ball) {
                        gameObject.setPosition(dragX, dragY);
                  }
            });
            this.input.on('dragstart', function(pointer, gameObject) {
                  if (gameObject === self.krepa) {
                        self.krepaSpeedBeforeDrag = self.krepaSpeed;
                        self.krepaSpeed = self.current_max_speed;

                        self.krepaTweenFootLeft.timeScale = 4;
                        self.krepaTweenFootRight.timeScale = 4;
                        
                        self.sndHiss.play();

                        self.hissingCount = 0;
                        self.tmrHissing.paused = false;

                        self.krepaInDragging = true;
                        self.krepaDragTime = Date.now();
                  } else if (gameObject === self.ball) {
                        self.ballDragStart = { x: pointer.worldX, y: pointer.worldY };
                        gameObject.body.setVelocity(0);
                  }
            });
            this.input.on('dragend', function(pointer, gameObject) {
                  if (gameObject === self.krepa) {
                        self.krepaTweenFootLeft.timeScale = 1;
                        self.krepaTweenFootRight.timeScale = 1;

                        self.krepaSpeed = self.krepaSpeedBeforeDrag;

                        self.sndHiss.stop();
                        self.tmrHissing.paused = true;
                        self.krepa.iterate(child => { child.clearTint(); });

                        self.krepaInDragging = false;
                        self.krepaDragTime = 0;
                  } else if (gameObject === self.ball) {
                        const dx = self.ballDragStart.x - pointer.worldX;
                        const dy = self.ballDragStart.y - pointer.worldY;
                        const throwStrength = 3;

                        gameObject.body.setVelocity(dx * throwStrength, dy * throwStrength);

                        self.sound.play('boing', {
                              rate: Phaser.Math.Clamp(gameObject.body.velocity.length() / 200, 0.8, 2.0),
                              volume: 0.5
                        });
                  }
            });

            this.sndClick = this.sound.add('click');
            this.sndEating = this.sound.add('eating');
            this.sndHiss = this.sound.add('fuse');
            this.sndTntSpawn = this.sound.add('tntspawn');
            this.sndFuse = this.sound.add('fuse');
            this.sndExplosion = this.sound.add('explosion');
            this.sndPoopSplash = this.sound.add('poopsplash');
            this.sndBurst = this.sound.add('burst');
            this.sndHurt = this.sound.add('hurt');
            this.sndPurr = this.sound.add('purr');
            this.sndRefreshed = this.sound.add('refreshed');
            this.sndNoAction = this.sound.add('noaction');
            this.sndBoing = this.sound.add('boing');
            this.sndMailbox = this.sound.add('mailbox');
            this.sndSuccess = this.sound.add('success');

            this.sndFireworks = [];
            for (let i = 1; i < 5; i++) {
                  this.sndFireworks.push(this.sound.add('fireworks' + i.toString()));
            }
            
            this.sndSteps = [];
            for (let i = 1; i <= 10; i++) {
                  const step = this.sound.add('step' + i).setVolume(0.5);
                  this.sndSteps.push(step);
            }

            this.loadHelp();
            this.loadBiomeAction();
            this.loadStats();
            this.loadMenu();
            this.loadThoughtBubbles();

            this.inDetonation = false;
            this.isDetonated = false;

            this.sndHiss.loop = true;
            this.sndHiss.setVolume(0.5);

            this.sndMailbox.setVolume(0.5);
            this.sndSuccess.setVolume(0.5);

            this.restoreObjectsFromData();
            this.adjustStatsTimeGap();

            this.krepaBirthdayCheck();
            this.newYearsEveCheck();

            if (this.getConfigValue('krepa_initmsg') != 1) {
                  this.sndClick.play();
                  this.loadInitInfo();
                  this.setConfigValue('krepa_initmsg', '1');
                  this.setConfigValue('krepa_agecount', '0');

                  const datetoday = new Date();
                  this.setConfigValue('krepa_agecheck', Date.parse(new Date(datetoday.getFullYear(), datetoday.getMonth(), datetoday.getDate(), 0, 0, 0)).toString())
            } else {
                  const illness = ((this.getConfigValue('krepa_sick') == 1) || (Phaser.Math.Between(1, 5) === 1));
                  if (illness) {
                        this.setKrepaSick();
                  }

                  if (!illness) {
                        const playful = Phaser.Math.Between(1, 2);
                        if ((playful === 1) && (this.krepaStats.affection < 100)) {
                              this.krepaPlayful = true;
                              this.initBall();
                        }

                        const chance = Phaser.Math.Between(1, 4);
                        if (chance === 1) {
                              this.krepaThoughtBubble();
                        }
                  }
            }

            this.krepaOverweightCheck();
      }

      update()
      {
            this.updateTextPositions();
            this.updateSpritePositions();

            if (this.inDetonation) {
                  return;
            }

            this.moveKrepa();
            this.updateStats();

            if (this.krepaPlayful) {
                  if (this.ball.body.velocity.length() < 20) {
                        this.ball.setVelocity(0, 0);
                  }
            }
      }

      precacheBiomeObjects(biome)
      {
            this.load.image('background', 'game/assets/biomes/' + this.current_biome + '/' + biome.background);
            
            for (let i = 0; i < biome.objects.length; i++) {
                  const obj = biome.objects[i];
                  const ident = obj.asset.substring(0, obj.asset.lastIndexOf('.'));
                  
                  this.load.spritesheet(ident, 'game/assets/biomes/' + this.current_biome + '/' + obj.asset, { frameWidth: obj.size.w, frameHeight: obj.size.h });
            }

            let selected_theme = 'game/assets/biomes/' + this.current_biome + '/' + biome.theme;
            if (this.krepaBirthdayToday()) {
                  selected_theme = 'game/assets/sounds/bday.ogg';
            } else if (this.newYearsEveTimeRange()) {
                  selected_theme = 'game/assets/sounds/party.ogg';
            }

            this.load.audio('theme', selected_theme);

            for (let j = 0; j < biome.ambience.length; j++) {
                  const snd = biome.ambience[j];
                  const ident = snd.substring(0, snd.lastIndexOf('.'));

                  this.load.audio(ident, 'game/assets/biomes/' + this.current_biome + '/' + snd);
            }
      }

      precacheBiome()
      {
            try {
                  this.current_biome = this.getConfigValue('current_biome', 'grass');
                  
                  for (let i = 0; i < this.biome_list.length; i++) {
                        this.biome_data = this.biome_list[i];
                        
                        if (this.biome_data.ident === this.current_biome) {
                              this.precacheBiomeObjects(this.biome_data);

                              break;
                        }
                  }
            } catch (error) {
                  console.error(error);
            }
      }

      loadBiome()
      {
            try {
                  let self = this;

                  this.add.image(0, 0, 'background').setOrigin(0, 0);
                  
                  for (let i = 0; i < this.biome_data.objects.length; i++) {
                        const obj = this.biome_data.objects[i];
                        const ident = obj.asset.substring(0, obj.asset.lastIndexOf('.'));
                        
                        const image = this.add.image(obj.pos.x, obj.pos.y, ident);

                        if (typeof obj.size.scale !== 'undefined') {
                              image.setScale(obj.size.scale);
                        }

                        if ((typeof obj.scale !== 'undefined') && (obj.scale !== null)) {
                              this.tweens.add({
                                    targets: image,
                                    scaleX: obj.scale.x,
                                    scaleY: obj.scale.y,
                                    duration: 500,
                                    yoyo: true,
                                    repeat: -1,
                                    ease: 'Sine.easeInOut'
                              });
                        }
                  }

                  this.sndTheme = this.sound.add('theme');
                  this.sndTheme.loop = true;
                  this.sndTheme.setVolume(0.22);
                  this.sndTheme.play();

                  this.tmrAmbience = this.time.addEvent({
                        delay: Phaser.Math.Between(12500, 15000),
                        paused: true,
                        loop: true,
                        callback: function() {
                              const snd = self.biome_data.ambience[Phaser.Math.Between(0, self.biome_data.ambience.length - 1)];
                              const ident = snd.substring(0, snd.lastIndexOf('.'));

                              self.sound.play(ident, {
                                    volume: Phaser.Math.FloatBetween(1.2, 1.5)
                              });
                        },
                        callbackScope: self
                  });

                  this.rainy = false;
                  const chance = Phaser.Math.Between(1, 5);
                  if (chance === 1) {
                        this.spawnRain();
                        this.spawnFrogs();
                  } else {
                        this.tmrAmbience.paused = false;
                  }
            } catch (error) {
                  console.error(error);
            }
      }

      spawnRain()
      {
            const graphics = this.make.graphics({ x: 0, y: 0, add: false });
            graphics.fillStyle(this.biome_data.raincolor, 0.8);
            graphics.fillRect(0, 0, 2, 10);
            graphics.generateTexture('raindrop', 2, 10);

            this.rainParticles = this.add.particles(0, 0, 'raindrop', {
                  frame: 'raindrop',
                  x: { min: -150, max: gameconfig.scale.width + 50 },
                  y: 0,
                  lifespan: 2000,
                  speedX: 100,
                  speedY: 400,
                  quantity: 10,
                  frequency: 50,
                  angle: 95,
                  scale: { start: 1, end: 1 },
                  alpha: { start: 0.9, end: 0.2 },
                  blendMode: 'ADD'
            }).setDepth(99);

            this.sndRain = this.sound.add('rain_' + Phaser.Math.Between(1, 2));
            this.sndRain.loop = true;
            this.sndRain.setVolume(0.5);
            this.sndRain.play();

            this.lightning = this.add.rectangle(0, 0, gameconfig.scale.width, gameconfig.scale.height, 0xffffff);
            this.lightning.setOrigin(0);
            this.lightning.setDepth(100);
            this.lightning.setAlpha(0);

            const chance = Phaser.Math.Between(1, 4);
            if (chance === 1) {
                  this.add.rectangle(0, 0, gameconfig.scale.width, gameconfig.scale.height, 0x000000)
                        .setOrigin(0)
                        .setDepth(100)
                        .setAlpha(0.5);

                  this.rainParticles.x -= 50;
                  this.rainParticles.frequency = 25;
                  this.rainParticles.quantity = 30;
                  this.rainParticles.speedX = 123;

                  this.tmrLightning = this.time.addEvent({
                        delay: Phaser.Math.Between(5000, 10000),
                        loop: true,
                        callback: this.spawnLightning,
                        callbackScope: this
                  });
            }

            this.rainy = true;
      }

      spawnFrogs()
      {
            const configs = [
                  { x: 100, y: 200, flip: false },
                  { x: 300, y: 150, flip: true },
                  { x: 123, y: 350, flip: false },
                  { x: 250, y: 430, flip: true }
            ];
            
            for (let i = 0; i < configs.length; i++) {
                  this.spawnFrog(configs[i].x, configs[i].y, configs[i].flip);
            }
      }

      spawnFrog(x, y, flip)
      {
            let self = this;

            let frog = this.physics.add.sprite(x, y, 'frog').refreshBody();
            frog.setScale(0.7);
            frog.setCollideWorldBounds(true);
            this.physics.add.collider(frog, this.fenceColliderTop);
            this.physics.add.collider(frog, this.fenceColliderBottom);
            frog.setInteractive();
            frog.on('pointerdown', function() {
                  self.frogJump(frog, 100, 1.2, 1.5);
            });

            if (flip) {
                  frog.angle = Math.PI * 2;
                  frog.flipX = true;
            }

            this.tweens.add({
                  targets: frog,
                  scaleY: 0.8,
                  scaleX: 0.6,
                  duration: 500,
                  yoyo: true,
                  repeat: -1,
                  ease: 'Sine.easeInOut'
            });

            this.time.addEvent({
                  delay: Phaser.Math.Between(5000, 10000),
                  loop: true,
                  callback: function() {
                        self.frogJump(frog);
                  },
                  callbackScope: self
            });
      }

      frogJump(frog, speed = 40, rate = 1.0, volume = 1.0)
      {
            let self = this;

            frog.angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            frog.flipX = Math.cos(frog.angle) < 0;

            frog.setVelocity(
                  Math.cos(frog.angle) * speed,
                  Math.sin(frog.angle) * speed
            );

            self.sound.play('frog', {
                  rate: rate,
                  volume: volume
            });

            frog.anims.play('frog', true);
            frog.on('animationcomplete', function(anim, frame) {
                  frog.setVelocity(0);
                  frog.setFrame(anim.frames[0].frame.name);
            });
      }

      spawnLightning()
      {
            let self = this;

            this.lightning.setAlpha(1);

            this.tweens.add({
                  targets: this.lightning,
                  alpha: 0,
                  duration: 250,
                  ease: 'Cubic.easeOut'
            });

            this.sound.play('thunder_' + Phaser.Math.Between(1, 5));

            this.tmrLightning.remove();

            this.tmrLightning = this.time.addEvent({
                  delay: Phaser.Math.Between(5000, 10000),
                  loop: true,
                  callback: self.spawnLightning,
                  callbackScope: self
            });
      }

      loadBiomeSelectionMenu() 
      {
            let self = this;

            const dialog = this.add.container(0, 0).setDepth(TOPMOST_ELEMENT);

            const bg = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0)
                  .setOrigin(0)
                  .setInteractive();

            dialog.add(bg);

            const panel = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, 300, 240, 0x323232, 1)
                  .setStrokeStyle(2, 0x505050)
                  .setOrigin(0.5)
                  .setDepth(TOPMOST_ELEMENT);
            dialog.add(panel);

            const title = this.add.text(this.scale.width / 2, this.scale.height / 2 - 90, 'Choose a biome', {
                  fontSize: '20px',
                  fontFamily: 'sans-serif',
                  color: 'rgb(250, 250, 250)'
            }).setOrigin(0.5);
            dialog.add(title);

            const cancel = this.add.text(80, 415, 'Cancel', {
                  fontSize: '14px',
                  fill: '#ff6666',
                  backgroundColor: '#222222',
                  padding: { x: 10, y: 5 }
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });
            cancel.on('pointerdown', function() {
                  self.sndClick.play();
                  dialog.destroy();
            });
            cancel.on('pointerover', function() { cancel.setScale(1.05); });
            cancel.on('pointerout', function() { cancel.setScale(1.0); });
            dialog.add(cancel);

            const biomeTypes = [
                  { key: 'grass', label: 'Grass' },
                  { key: 'glowath', label: 'Glowath' },
                  { key: 'foliage', label: 'Foliage' },
            ];

            const startX = this.scale.width / 2 - 90;
            const startY = this.scale.height / 2 - 5;

            biomeTypes.forEach((biome, i) => {
                  const preview = self.add.image(startX + i * 90, startY, 'biome_' + biome.key).setDisplaySize(64, 64).setInteractive();
                  const label = self.add.text(startX + i * 90, startY + 40, biome.label, {
                        fontSize: '14px',
                        color: 'rgb(220, 220, 220)'
                  }).setOrigin(0.5, 0);

                  preview.on('pointerdown', () => {
                        self.sndClick.play();
                        self.setConfigValue('current_biome', biome.key);
                        dialog.destroy();
                        location.reload();
                  });
                  preview.on('pointerover', function() { preview.setScale(1.1); });
                  preview.on('pointerout', function() { preview.setScale(1.0); });

                  dialog.add(preview);
                  dialog.add(label);
            });

            this.children.bringToTop(dialog);

            return dialog;
      }

      loadHelp()
      {
            let self = this;

            const infoText = this.add.text(0, 0, gameconfig.about.name + " v" + gameconfig.about.version + "\nBy " + gameconfig.about.author + "\n\n" + gameconfig.about.contact + "\n\n" + gameconfig.about.description + "\n\n" + gameconfig.about.info, {
                  fontSize: '15px',
                  color: 'rgb(250, 250, 25)',
                  fontFamily: 'Pixel, monospace',
                  backgroundColor: 'rgb(50, 50, 50)',
                  padding: { x: 10, y: 5 }
            }).setDepth(TOPMOST_ELEMENT);
            infoText.setInteractive();
            infoText.on('pointerdown', function() {
                  infoText.setAlpha(1);
                  self.tweens.add({
                        targets: infoText,
                        alpha: 0,
                        duration: 250,
                        onComplete: function() {
                              infoText.setVisible(false);
                        }
                  });

                  self.sndClick.play();
            });
            infoText.setPosition(gameconfig.scale.width / 2 - infoText.width / 2, gameconfig.scale.height / 2 - infoText.height / 2);
            infoText.setAlpha(0);
            infoText.setVisible(false);

            this.add.image(gameconfig.scale.width - 25, 25, 'btn_circle').setScale(0.8);

            const helpAction = this.add.image(gameconfig.scale.width - 25, 25, 'sym_help').setScale(0.8).setInteractive();
            helpAction.on('pointerdown', function() {
                  if (infoText.visible) {
                        infoText.setAlpha(1);
                        self.tweens.add({
                              targets: infoText,
                              alpha: 0,
                              duration: 250,
                              onComplete: function() {
                                    infoText.setVisible(false);
                              }
                        });
                  } else {
                        infoText.setVisible(true);
                        infoText.setAlpha(0);
                        self.tweens.add({
                              targets: infoText,
                              alpha: 1,
                              duration: 250,
                        });
                  }

                  self.sndClick.play();
                  
            });
            helpAction.on('pointerover', function() { helpAction.setScale(1.01); });
            helpAction.on('pointerout', function() { helpAction.setScale(0.8); });
      }

      loadBiomeAction()
      {
            let self = this;

            const helpAction = this.add.image(gameconfig.scale.width - 65, 25, 'biome').setScale(0.4).setInteractive();
            helpAction.on('pointerdown', function() {
                  self.loadBiomeSelectionMenu();

                  self.sndClick.play();
                  
            });
            helpAction.on('pointerover', function() { helpAction.setScale(0.45); });
            helpAction.on('pointerout', function() { helpAction.setScale(0.4); });
      }

      loadInitInfo()
      {
            let self = this;

            const init_info = 'Hello fellow Krepa owner! 👋\n\nToday ' + this.krepaName + ' was born. 💚\n\nPlease take care of it:\n⭐ Feed it\n⭐ Clean it\n⭐ Give it affection\n⭐ Heal it if required\n\nThe journey has just begun! 🚀';

            const initText = this.add.text(0, 0, init_info, {
                  fontSize: '15px',
                  color: 'rgb(250, 250, 250)',
                  fontFamily: 'Pixel, monospace',
                  backgroundColor: 'rgb(50, 50, 50)',
                  padding: { x: 10, y: 5 }
            }).setDepth(TOPMOST_ELEMENT);
            initText.setInteractive();
            initText.setAlpha(1);
            initText.on('pointerdown', function() {
                  self.tweens.add({
                        targets: initText,
                        alpha: 0,
                        duration: 500,
                        onComplete: function() {
                              initText.setVisible(false);
                        }
                  });

                  self.sndClick.play();
            });
            initText.setPosition(gameconfig.scale.width / 2 - initText.width / 2, gameconfig.scale.height / 2 - initText.height / 2);
            initText.setVisible(true);
      }

      loadStats()
      {
            const depth = 105;

            this.add.image(20, 25, 'affection').setScale(0.8).setDepth(depth);
            this.txtAffectionValue = this.add.text(40, 17, this.krepaStats.affection).setDepth(depth);

            this.add.image(100, 25, 'food').setDepth(depth);
            this.txtFoodValue = this.add.text(120, 17, this.krepaStats.full).setDepth(depth);

            this.add.image(180, 25, 'health').setDepth(depth);
            this.txtHealthValue = this.add.text(200, 17, this.krepaStats.health).setDepth(depth);
      }

      loadMenu()
      {
            let self = this;

            const depth = 105;

            let iMenuStartX = 83;
            for (let i = 0; i < 4; i++) {
                  this.add.image(iMenuStartX + i * 64, gameconfig.scale.height - 45, 'slot').setDepth(depth).setScale(0.5);
            }

            const food = this.add.image(iMenuStartX, gameconfig.scale.height - 45 + 1, 'tnt').setDepth(depth).setInteractive();
            food.on('pointerdown', function() {
                  self.spawnFood();
            });
            food.on('pointerover', function() { food.setScale(1.1); });
            food.on('pointerout', function() { food.setScale(1.0); });

            const hand = this.add.image(iMenuStartX + 64 * 1, gameconfig.scale.height - 45 + 1, 'hand').setDepth(depth).setInteractive();
            hand.on('pointerdown', function() {
                  if (!self.krepaSick) {
                        if (!self.krepaPlayful) {
                              self.addAffection(AFFECTION_VALUE);
                        } else {
                              self.sndNoAction.play();
                              self.ball.setTintFill(0xffffff);
                              self.time.addEvent({
                                    delay: 100,
                                    loop: false,
                                    callback: function() {
                                          self.ball.clearTint();
                                    },
                                    callbackScope: self
                              });
                        }
                  }
            });
            hand.on('pointerover', function() { hand.setScale(1.1); });
            hand.on('pointerout', function() { hand.setScale(1.0); });

            const brush = this.add.image(iMenuStartX + 64 * 2, gameconfig.scale.height - 45 + 1, 'brush').setDepth(depth).setInteractive();
            brush.on('pointerdown', function() {
                  if (self.poops.length > 0) {
                        let pindex = Phaser.Math.Between(0, self.poops.length - 1);

                        self.poopSplash(self.poops[pindex].x, self.poops[pindex].y);
                        self.removePoopById(pindex);
                  } else {
                        self.sndNoAction.play();
                  }
            });
            brush.on('pointerover', function() { brush.setScale(1.1); });
            brush.on('pointerout', function() { brush.setScale(1.0); });
            
            const pill = this.add.image(iMenuStartX + 64 * 3, gameconfig.scale.height - 45 + 1, 'pill').setRotation(Phaser.Math.DegToRad(132)).setDepth(depth).setInteractive();
            pill.on('pointerdown', function() {
                  if (self.krepaStats.health < 100) {
                        self.krepaStats.health += HEALTH_VALUE;
                        if (self.krepaStats.health > 100) {
                              self.krepaStats.health = 100;
                        }

                        if ((self.krepaSick) && (self.krepaStats.health >= 100)) {
                              self.cureKrepa();
                        }

                        self.txtHealthValue.setColor('rgb(50, 250, 50)');
                        self.time.delayedCall(500, () => {
                              self.txtHealthValue.setColor('rgb(250, 250, 250)');
                        });

                        self.sndRefreshed.play();
                  } else {
                        self.sndNoAction.play();
                  }
            });
            pill.on('pointerover', function() { pill.setScale(1.1); });
            pill.on('pointerout', function() { pill.setScale(1.0); });
      }

      krepaBirthdayToday()
      {
            const birthday = new Date(parseInt(this.getConfigValue('krepa_birthdate')));
            const today = new Date();

            const check_bday = Date.parse(new Date(birthday.getFullYear(), birthday.getMonth(), birthday.getDate(), 0, 0, 0));
            const check_today = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));

            return (birthday.getDate() === today.getDate()) && (check_bday !== check_today);
      }

      krepaBirthdayAgeCounting()
      {
            const lastcheck = parseInt(this.getConfigValue('krepa_agecheck'));
            const datetoday = new Date();
            const checktoday = Date.parse(new Date(datetoday.getFullYear(), datetoday.getMonth(), datetoday.getDate(), 0, 0, 0));

            if (checktoday !== lastcheck) {
                  this.setConfigValue('krepa_agecount', (this.krepaBirthdayAge() + 1).toString());
                  this.setConfigValue('krepa_agecheck', checktoday.toString());
            }
      }

      krepaBirthdayAge()
      {
            const value = this.getConfigValue('krepa_agecount');
            if (value === null) {
                  return 0;
            }

            return parseInt(value);
      }

      krepaBirthdayCheck()
      {
            let self = this;

            if (!this.krepaBirthdayToday()) {
                  return;
            }

            this.krepaBirthdayAgeCounting();
            let agecount = this.krepaBirthdayAge();

            const bdaytext = this.add.text(0, 0, `Happy birthday, ${this.krepaName}!\nYou turned ${agecount} today.`, {
                  fontSize: '15px',
                  color: 'rgb(250, 250, 250)',
                  fontFamily: 'Pixel, monospace',
                  backgroundColor: 'rgb(50, 50, 50)',
                  padding: { x: 10, y: 5 }
            });
            bdaytext.setAlign('center');
            bdaytext.setDepth(TOPMOST_ELEMENT);
            bdaytext.setPosition(gameconfig.scale.width / 2 - bdaytext.width / 2, 50);

            this.tmrBirthdayTextEffect = this.time.addEvent({
                  delay: 500,
                  loop: true,
                  callback: function() {
                        const red = Phaser.Math.Between(0, 255);
                        const green = Phaser.Math.Between(0, 255);
                        const blue = Phaser.Math.Between(0, 255);

                        bdaytext.setColor(`rgb(${red}, ${green}, ${blue})`);
                  },
                  callbackScope: self
            });

            this.tmrBirthdayConfetti = this.time.addEvent({
                  delay: 250,
                  loop: true,
                  callback: function() {
                        self.spawnConfetti(Phaser.Math.Between(20, gameconfig.scale.width - 20), Phaser.Math.Between(20, gameconfig.scale.height - 50));
                  },
                  callbackScope: self
            });
      }

      spawnConfetti(x, y)
      {
            let self = this;

            const red = Phaser.Math.Between(0, 255);
            const green = Phaser.Math.Between(0, 255);
            const blue = Phaser.Math.Between(0, 255);

            const chunk = self.make.graphics({ x: 0, y: 0, add: false });
            chunk.fillStyle(self.rgbToHex(red, green, blue), 0.8);
            chunk.fillRect(0, 0, 3, 3);
            chunk.generateTexture('chunk', 3, 3);
            let emitter = self.add.particles(x, y, 'chunk', {
                  speed: 100,
                  lifespan: 3000,
                  frequency: 50,
                  quantity: 1,
                  gravityY: 200
            });
            let interval = setInterval(function() {
                  emitter.x = x;
                  emitter.y = y;
            }, 10);
            self.time.addEvent({
                  delay: 1000,
                  loop: false,
                  callback: function() {
                        clearInterval(interval);
                        emitter.destroy();
                  },
                  callbackScope: self
            });
      }

      spawnFirework(x, y)
      {
            let burst = this.physics.add.sprite(x, y, 'fireworks');
            burst.anims.play('fireworks', true);
            burst.on('animationcomplete', function() {
                  burst.destroy();
            });

            const fwsnd = this.sndFireworks[Phaser.Math.Between(0, this.sndFireworks.length - 1)];
            fwsnd.play();
      }

      newYearsEveTimeRange()
      {
            let date = new Date();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            return (((month === 12) && (day === 31)) || ((month === 1) && (day === 1)));
      }

      newYearsEveCheck()
      {
            let self = this;

            if (!this.newYearsEveTimeRange()) {
                  return;
            }

            const banner_width = 400;
            const banner_scale = 0.9;

            let banner = this.add.image(gameconfig.scale.width / 2 - (banner_width * banner_scale) / 2 + 180, 63, 'happynewyear');
            banner.setScale(banner_scale);

            this.tmrFireworks = this.time.addEvent({
                  delay: 2000,
                  loop: true,
                  callback: function() {
                        self.spawnFirework(Phaser.Math.Between(20, gameconfig.scale.width - 20), Phaser.Math.Between(20, gameconfig.scale.height / 2 - 150));
                  },
                  callbackScope: self
            });
      }

      initBall()
      {
            if (this.ball) {
                  this.ball.setBounce(1);
                  this.ball.setDamping(true);
                  this.ball.setDrag(0.7);
                  this.ball.setCollideWorldBounds(true);
                  this.physics.add.collider(this.ball, this.fenceColliderTop);
                  this.physics.add.collider(this.ball, this.fenceColliderBottom);
                  this.ball.setPosition(30, 100);
                  this.ball.setInteractive();
                  this.ball.setVisible(true);

                  this.input.setDraggable(this.ball);
            }
      }

      moveKrepa()
      {
            let self = this;

            if (this.krepaStats.health <= 0) {
                  this.krepaSpeed = 0;
                  return;
            }
            
            let nearestFood = null;

            if (!this.krepaSick) {
                  if (this.krepaStats.full < 100) {
                        nearestFood = this.findNearestFood();
                        if (nearestFood) {
                              this.krepaSpeed = this.current_max_speed * 2;

                              this.krepaRotation = Phaser.Math.Angle.Between(this.krepa.x, this.krepa.y, nearestFood.x, nearestFood.y);
                        }
                  } 
                  
                  if (this.krepaStats.affection < 100) {
                        if (this.ball.body.velocity.length() >= 40) {
                              this.krepaSpeed = this.current_max_speed * 2;

                              this.krepaRotation = Phaser.Math.Angle.Between(this.krepa.x, this.krepa.y, this.ball.x, this.ball.y);

                              const dist = Phaser.Math.Distance.Between(
                                    this.krepa.body.x, this.krepa.body.y,
                                    this.ball.x, this.ball.y
                              );

                              if (dist < 50) {
                                    if (!this.krepaBallHit) {
                                          this.krepaBallHit = true;
                                          this.addAffection(AFFECTION_VALUE);

                                          this.krepaStats.full -= HUNGER_VALUE;

                                          this.time.addEvent({
                                                delay: 3000,
                                                loop: false,
                                                callback: function() {
                                                      self.krepaBallHit = false;
                                                },
                                                callbackScope: self
                                          });
                                    }
                              }
                        }
                  }
            }

            if (this.krepaSpeed > 0) {
                  this.processKrepaMovement();
            } else {
                  this.stopKrepaMovement();
            }
      }

      processKrepaMovement()
      {
            this.krepa.body.setVelocity(
                  Math.cos(this.krepaRotation) * this.krepaSpeed,
                  Math.sin(this.krepaRotation) * this.krepaSpeed
            );

            if (this.krepaTweenFootLeft.isPaused()) {
                  this.krepaTweenFootLeft.resume();
            }

            if (this.krepaTweenFootRight.isPaused()) {
                  this.krepaTweenFootRight.resume();
            }

            if (this.tmrKrepaStepSound.paused) {
                  this.tmrKrepaStepSound.paused = false;
            }
      }

      stopKrepaMovement()
      {
            this.krepa.body.setVelocity(0, 0);

            if (!this.krepaTweenFootLeft.isPaused()) {
                  this.krepaTweenFootLeft.pause();
            }

            if (!this.krepaTweenFootRight.isPaused()) {
                  this.krepaTweenFootRight.pause();
            }

            if (!this.tmrKrepaStepSound.paused) {
                  this.tmrKrepaStepSound.paused = true;
            }
      }

      updateTextPositions()
      {
            this.txtKrepaName.setPosition(this.krepa.body.x + this.krepa.body.width / 2 - this.txtKrepaName.width / 2, this.krepa.body.y - 25);

            if (this.txtThoughtBubble.visible) {
                  let txtgap = 55;

                  if (this.txtThoughtBubble.text.includes('\n')) {
                        txtgap += 10;
                  }

                  this.txtThoughtBubble.setPosition(this.krepa.body.x + this.krepa.body.width / 2 - this.txtThoughtBubble.width / 2, this.krepa.body.y - txtgap);
            }

            if (this.txtKrepaEmoji.visible) {
                  this.txtKrepaEmoji.setPosition(this.krepa.body.x + this.krepa.body.width / 2 - this.txtKrepaEmoji.width / 2, this.krepa.body.y - 65);
            }
      }

      updateSpritePositions()
      {
            if (this.smoke.visible) {
                  this.smoke.setPosition(this.krepa.body.x + this.krepa.body.width / 2 - 60, this.krepa.body.y - 115);
            }
      }

      updateStats()
      {
            this.setConfigValue('krepa_stats_affection', this.krepaStats.affection);
            this.setConfigValue('krepa_stats_full', this.krepaStats.full);
            this.setConfigValue('krepa_stats_health', this.krepaStats.health);

            this.txtAffectionValue.text = this.krepaStats.affection;
            this.txtFoodValue.text = this.krepaStats.full;
            this.txtHealthValue.text = this.krepaStats.health;
      }

      updateTime()
      {
            this.setConfigValue('updated_timestamp', Date.now());
      }

      spawnFood()
      {
            let self = this;

            let posx = Phaser.Math.Between(55, gameconfig.scale.width - 55);
            let posy = Phaser.Math.Between(90, gameconfig.scale.height - 150);

            const foodident = self.krepaBirthdayToday() ? 'cake' : 'tntfood';

            let food = this.physics.add.sprite(posx, posy, foodident).refreshBody();
            food.setCollideWorldBounds(true);

            food.setInteractive();
            food.on('pointerdown', function() {
                  self.spawnBurst(food.x, food.y);
                  self.addAffection(AFFECTION_VALUE);

                  self.removeFoodbyObj(food);
            });

            this.physics.add.collider(this.krepa_body, food, function() {
                  if (!self.krepaSick) {
                        self.krepaStats.full += FOOD_ADD_COUNT;
                        if (self.krepaStats.full >= 123) {
                              self.krepaStats.health -= FOOD_ADD_COUNT / 2;
                        }

                        self.krepaOverweightCheck();

                        const chunk = self.make.graphics({ x: 0, y: 0, add: false });
                        chunk.fillStyle(0x9a9a9a, 0.8);
                        chunk.fillRect(0, 0, 5, 5);
                        chunk.generateTexture('chunk', 5, 5);
                        let emitter = self.add.particles(self.krepa.x, self.krepa.y - 15, 'chunk', {
                              speed: 100,
                              lifespan: 3000,
                              frequency: 100,
                              quantity: 1,
                              gravityY: 200
                        });
                        let interval = setInterval(function() {
                              emitter.x = self.krepa.x;
                              emitter.y = self.krepa.y - 15;
                        }, 10);
                        self.time.addEvent({
                              delay: 1000,
                              loop: false,
                              callback: function() {
                                    clearInterval(interval);
                                    emitter.destroy();
                              },
                              callbackScope: self
                        });

                        self.sndEating.play();
                        self.spawnPoop();

                        self.removeFoodbyObj(food);
                  }
            });

            this.physics.add.collider(food, this.fenceColliderTop);
            this.physics.add.collider(food, this.fenceColliderBottom);

            this.tweens.add({
                  targets: food,
                  scaleY: 1.2,
                  scaleX: 0.8,
                  duration: 500,
                  yoyo: true,
                  repeat: -1,
                  ease: 'Sine.easeInOut'
            });

            this.foods.push(food);

            this.sndTntSpawn.play();

            return food;
      }

      findNearestFood()
      {
            let nearest = null;
            let shortest = Infinity;

            for (let i = 0; i < this.foods.length; i++) {
                  const target = this.foods[i];
                  const dist = Phaser.Math.Distance.Between(this.krepa.x, this.krepa.y, target.x, target.y);

                  if (dist < shortest) {
                        shortest = dist;
                        nearest = target;
                  }
            }

            return nearest;
      }

      removeFoodbyObj(obj)
      {
            for (let i = 0; i < this.foods.length; i++) {
                  if (this.foods[i] === obj) {
                        this.foods[i].destroy();
                        this.foods.splice(i, 1);

                        break;
                  }
            }
      }

      spawnFusedTNT(x, y)
      {
             let self = this;

            let tnt = this.physics.add.sprite(x, y, 'tntfood').refreshBody();

            this.tweens.add({
                  targets: tnt,
                  scaleY: 1.2,
                  scaleX: 0.8,
                  duration: 500,
                  yoyo: true,
                  repeat: -1,
                  ease: 'Sine.easeInOut'
            });

            this.sndTntSpawn.play();

            tnt.blinkCount = 5;

            this.time.addEvent({
                  delay: 200,
                  repeat: tnt.blinkCount * 2,
                  callback: function() {
                        if (tnt.blinkCount % 2 == 0) {
                              tnt.setTintFill(0xffffff);
                        } else {
                              tnt.clearTint();
                        }

                        tnt.blinkCount--;
                  },
                  callbackScope: self
            });

            this.sndFuse.once('complete', function() {
                  self.spawnBurst(x, y);
                  tnt.destroy();
            });

            this.sndFuse.play();
      }

      spawnPoop()
      {
            let self = this;

            let posx = this.krepa.body.x + 35;
            let posy = this.krepa.body.y + 59;

            let poop = this.physics.add.sprite(posx, posy, 'poop').refreshBody();
            poop.setCollideWorldBounds(true);
            poop.setInteractive();
            poop.on('pointerdown', function() {
                  self.poopSplash(poop.x, poop.y);
                  self.removePoopByObj(poop);
            });

            this.physics.add.collider(poop, this.fenceColliderTop);
            this.physics.add.collider(poop, this.fenceColliderBottom);

            this.tweens.add({
                  targets: poop,
                  scaleY: 1.2,
                  scaleX: 0.8,
                  duration: 500,
                  yoyo: true,
                  repeat: -1,
                  ease: 'Sine.easeInOut'
            });

            this.poops.push(poop);

            return poop;
      }

      poopSplash(x, y)
      {
            let splash = this.physics.add.sprite(x, y, 'poopsplash').setScale(2.0);
            splash.anims.play('poopsplash', true);
            splash.on('animationcomplete', function() {
                  splash.destroy();
            });

            this.sndPoopSplash.play();
      }

      removePoopById(index)
      {
            if (typeof this.poops[index] !== 'undefined') {
                  this.poops[index].destroy();
                  this.poops.splice(index, 1);
            }
      }

      removePoopByObj(obj)
      {
            for (let i = 0; i < this.poops.length; i++) {
                  if (this.poops[i] === obj) {
                        this.poops[i].destroy();
                        this.poops.splice(i, 1);

                        break;
                  }
            }
      }

      spawnButterfly()
      {
            let self = this;

            let butterfly = this.physics.add.sprite(200, 200, 'butterfly').refreshBody();
            butterfly.setCollideWorldBounds(false);
            butterfly.anims.play('butterfly', true);

            let posx = 0;
            let posy = Phaser.Math.Between(50, gameconfig.scale.height - 140);;

            const side = Phaser.Math.Between(1, 2);
            if (side === 1) {
                  posx = gameconfig.scale.width + 50;
                  butterfly.setRotation(Math.PI);
            } else {
                  posx = -50;
                  butterfly.setRotation(Math.PI * 2);
            }

            butterfly.setPosition(posx, posy);

            const speed = Phaser.Math.Between(50, 100);

            butterfly.setVelocity(
                  Math.cos(butterfly.rotation) * speed,
                  Math.sin(butterfly.rotation) * speed
            );

            this.tweens.add({
                  targets: butterfly,
                  scaleY: 1.2,
                  scaleX: 0.8,
                  duration: 500,
                  yoyo: true,
                  repeat: -1,
                  ease: 'Sine.easeInOut'
            });

            this.time.addEvent({
                  delay: 10000,
                  loop: false,
                  callback: function() {
                        butterfly.destroy();
                  },
                  callbackScope: self
            });
      }

      spawnBird()
      {
            let self = this;

            const birdident = 'bird' + (Phaser.Math.Between(1, 5)).toString();
            
            let bird = this.physics.add.sprite(200, 200, birdident).refreshBody();
            bird.setCollideWorldBounds(false);
            bird.anims.play(birdident, true);

            let posx = 0;
            let posy = Phaser.Math.Between(50, gameconfig.scale.height - 140);;

            const side = Phaser.Math.Between(1, 2);
            if (side === 1) {
                  posx = gameconfig.scale.width + 50;
                  bird.setRotation(Math.PI);
                  bird.setFlipY(true);
            } else {
                  posx = -50;
                  bird.setRotation(Math.PI * 2);
            }

            bird.setPosition(posx, posy);

            const speed = Phaser.Math.Between(90, 145);

            bird.setVelocity(
                  Math.cos(bird.rotation) * speed,
                  Math.sin(bird.rotation) * speed
            );

            this.tweens.add({
                  targets: bird,
                  scaleY: 1.2,
                  scaleX: 0.8,
                  duration: 500,
                  yoyo: true,
                  repeat: -1,
                  ease: 'Sine.easeInOut'
            });

            this.time.addEvent({
                  delay: 10000,
                  loop: false,
                  callback: function() {
                        bird.destroy();
                  },
                  callbackScope: self
            });
      }

      spawnBurst(x, y)
      {
            let burst = this.physics.add.sprite(x, y, 'burst');
            burst.anims.play('burst', true);
            burst.on('animationcomplete', function() {
                  burst.destroy();
            });

            this.sndBurst.play();
      }

      addAffection(amount)
      {
            let self = this;

            if (self.krepaStats.affection < 100) {
                  self.krepaStats.affection += amount;
                  if (self.krepaStats.affection > 100) {
                        self.krepaStats.affection = 100;
                  }

                  let emitter = self.add.particles(self.krepa.x, self.krepa.y, 'particle', {
                        speed: 100,
                        lifespan: 3000,
                        frequency: 100,
                        quantity: 1,
                        gravityY: 200
                  }).setScale(0.5);

                  let interval = setInterval(function() {
                        emitter.x = self.krepa.x;
                        emitter.y = self.krepa.y;
                  }, 10);

                  self.time.addEvent({
                        delay: 1000,
                        loop: false,
                        callback: function() {
                              clearInterval(interval);
                              emitter.destroy();
                        },
                        callbackScope: self
                  });

                  self.sndPurr.play();
            } else {
                  self.sndNoAction.play();
            }
      }

      setKrepaSick()
      {
            this.krepaSick = true;

            if (this.krepaStats.health > 20) {
                  this.krepaStats.health = 20;
            }

            if (this.krepaStats.full > 30) {
                  this.krepaStats.full = 30;
            }

            if (this.krepaStats.affection > 40) {
                  this.krepaStats.affection = 40;
            }

            const faces = ['🤒', '😷', '🤕', '🤢', '🤮', '🤧'];
            const face = faces[Phaser.Math.Between(0, faces.length - 1)];

            this.txtKrepaEmoji.setText(face);
            this.txtKrepaEmoji.setVisible(true);

            this.smoke.anims.play('smoke', true);
            this.smoke.setVisible(true);

            this.tmrSneezing.paused = false;

            this.setConfigValue('krepa_sick', 1);
      }

      cureKrepa()
      {
            this.krepaSick = false;

            this.tmrSneezing.paused = true;

            this.txtKrepaEmoji.setVisible(false);
            this.smoke.setVisible(false);

            this.setConfigValue('krepa_sick', 0);
      }

      explodeKrepa()
      {
            let self = this;
            
            if (this.inDetonation) {
                  return;
            }

            this.krepaThoughtBubble();

            this.inDetonation = true;
            this.krepaSpeedBeforeDrag = 0;
            this.krepaSpeed = 0;
            this.stopKrepaMovement();
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
                  
                  let explosion = self.physics.add.sprite(self.krepa.x, self.krepa.y, 'explosion');
                  explosion.anims.play('explosion', true);
                  explosion.on('animationcomplete', function() {
                        explosion.destroy();

                        self.isDetonated = true;

                        const restartAction = self.add.text(0, 0, self.krepaName + ' is now at a better place.\n\nBorn: ' + self.getReadableDate(Number(self.getConfigValue('krepa_birthdate'))) + '\nDetonated: ' + self.getReadableDate(Date.now()) + '\n\nClick or tap to restart', {
                              fontSize: '15px',
                              color: 'rgb(250, 50, 0)',
                              fontFamily: 'Pixel, monospace',
                              backgroundColor: 'rgb(50, 50, 50)',
                              padding: { x: 10, y: 5 }
                        }).setDepth(TOPMOST_ELEMENT);
                        restartAction.setInteractive();
                        restartAction.on('pointerdown', function() {
                              self.restartGame();
                        });
                        restartAction.setPosition(gameconfig.scale.width / 2 - restartAction.width / 2, gameconfig.scale.height / 2 - restartAction.height / 2);
                        restartAction.setVisible(true);
                        restartAction.setAlpha(0);

                        self.tweens.add({
                              targets: restartAction,
                              alpha: 1,
                              duration: 500,
                        });
                  });
            });
            this.sndFuse.play();
      }

      krepaHealthCheck()
      {
            let self = this;

            if ((self.krepaStats.full <= 0) || (self.krepaStats.affection <= 0)) {
                  if (self.krepaStats.health > 0) {
                        self.krepaStats.health--;
                  }

                  self.sndHurt.play();

                  self.txtHealthValue.setColor('rgb(250, 50, 0)');
                  self.krepa.iterate(child => { child.setTintFill(0xff0000); });
                  self.time.delayedCall(250, () => {
                        self.txtHealthValue.setColor('rgb(250, 250, 250)');
                        self.krepa.iterate(child => { child.clearTint(); });
                  });
            }

            if (self.krepaStats.health <= 0) {
                  self.explodeKrepa();
                  self.tmrKrepaHealthCheck.paused = true;
            }
      }

      krepaAffectionCheck()
      {
            let self = this;

            if (self.krepaStats.affection > 0) {
                  self.krepaStats.affection -= AFFECTION_VALUE;

                  if (self.krepaStats.affection < 0) {
                        self.krepaStats.affection = 0;
                  }
            }
      }

      krepaHungerCheck()
      {
            let self = this;

            if (self.krepaStats.full > 0) {
                  self.krepaStats.full -= HUNGER_VALUE;

                  if (self.krepaStats.full < 0) {
                        self.krepaStats.full = 0;
                  }
            }
      }

      krepaOverweightCheck()
      {
            let self = this;

            if (self.krepaStats.full > 100) {
                  self.krepaWobble.play();
                  self.krepa_body.setScale(1.5, 1.0);

                  self.current_max_speed = MAX_WALKING_SPEED / 2;

                  self.krepaStats.health -= 2;
            } else {
                  self.krepaWobble.pause();
                  self.krepa_body.setScale(1.0, 1.0);
                  self.current_max_speed = MAX_WALKING_SPEED;
            }
      }

      krepaPoopCheck()
      {
            let self = this;

            if (self.poops.length > 0) {
                  self.krepaStats.health -= 2 * self.poops.length;
            }
      }

      loadThoughtBubbles()
      {
            this.krepaThoughts = {
                  casual: [
                        'This place is my home! 💚',
                        'I really like my owner.\nI\'m being treated nicely. 😃',
                        'I just saw a pretty flower 🌸',
                        'I enjoy being cuddled 🤗',
                        'What came first?\nThe Krepa or the Big Bang? 🌌',
                        'I saw a butterfly today 🦋\nIt was beautiful!',
                        'Boomingly good weather.\nI like it. 🌞',
                        'I\'m feeling peaceful today\nI like that.',
                        'I like being a Krepa. 💚',
                        'Is it cuddle time yet?\nJust wondering.',
                        'This place is cozy 💚\nPlease don\'t change it.',
                        'I want to learn how to smile. 🌞',
                        'I counted pixels today\nNew highscore: ' + Phaser.Math.Between(20, 50),
                        'I enjoy just existing 💚\nKinda nice.',
                        'Boom-free day!\nI love it! 😃'

                  ],

                  bday: [
                        'Happy birthday to me! 🥳',
                        'Can we have cake today? 🥺',
                        'I\'d love having some cake today! 🍰',
                        'I want to celebrate with my owner today! 💚',
                        'I have a wish... Let\'s have cake?! 😂',
                        'It\'s party time!! 😎',
                        'Whoop, whoop! 🥳',
                        'Let\'s get this party started. 🎉',
                        'This is my day, yaaay! 🎉',
                        'I want cake and lots of fun for today. 😍',
                        'I wished for a giant TNT pie.\nWill it happen? 😃',
                        'This birthday music really rocks! 👏',
                        'Hey owner, can you sing a birthday song? 🎤',
                        'Let\'s have fun and rock to the music. 🎶',
                        'I want to invite all my friends for today. 💚'
                  ],

                  nye: [
                        'Let\'s celebrate tonight! 🎉',
                        'Do you have any new year\'s resolutions? 🤭',
                        'I\'m starting to learn smiling next year. 😁',
                        'These fireworks are so cool! 🎇',
                        'I want to ignite some fireworks! 🎆',
                        'Does TNT count as fireworks, too? 🧨',
                        'Booooooom! 💥💥',
                        'More fireworks, please! 🤩',
                        'You should fuse some TNT. 😂',
                        'How do you spend new year\'s eve?',
                        'I want to celebrate with my owner tonight. 💚',
                        'I\'d like to party tonight! 🎶',
                        'Come on, dance with me tonight. 🥳',
                        'I hope everyone is having a good time. 💚',
                        'Sooo, are you ready to rock tonight?! 👏'
                  ],

                  rainy: [
                        'Not my favorite weather,\nbut it\'s alright...',
                        'Rain hides my footsteps.\nExcellent...',
                        'Moist fuse... again.',
                        'Who sneaks through the rain?\nIt\'s me! 💚',
                        'These frogs are kinda friendly. 🐸',
                        'Are thunderstorms exploding clouds?',
                        'I don\'t mind the rain.\nNature needs water.',
                        'Can we play in puddles\nonce there\'s enough rain?',
                        'Fortunately, water doesn\'t bother me. 😃',
                        'Hey, free beverage from the sky. 😂',
                        'I really like this cozy weather. 😍',
                        'Can I hide in the rain?',
                        'Splish, splash! 😄',
                        'Uh, it\'s kinda slippery here.',
                        'Wow, free water from the sky!'
                  ],

                  hungry: [
                        'Mmmhh... Tasty TNT...',
                        'Last night I dreamed about TNT.',
                        'Can you feed me, please? 🥺',
                        'When is dinner ready?',
                        'I am sooo hungry right now!',
                        'I smell TNT...\nWait, just a day-dream.',
                        'My tummy is rumbling.\nPlease feed me!',
                        'Boom hunger is real 💥\nI need food.',
                        'Starving a little bit...\nOkay, a lot.',
                        'You forgot my snack. 😢\nI noticed!',
                        'TNT for dinner?\nPlease say yes!',
                        'I dreamed of a feast...\nWoke up sad.',
                        'No food. Still alive.\nBarely.',
                        'Feed me soon...\nOr face the boom.',
                        'I\'d really go for a TNT pie!'
                  ],

                  affection: [
                        'I\'m in need of cuddles.',
                        'Can you pet me, please? 🥺',
                        'Do you still love me?',
                        'I feel so lonely today...\nIt makes me sad. 😞',
                        'Have I been abandoned?\nWill anyone take care of me?',
                        'Pet me, please 🥺\nI miss you...',
                        'I\'m still here...\nDo you care...?',
                        'I need affection. 💚\nAnd many cuddles.',
                        'I feel invisible...\nBut I\'m here.',
                        'Cuddle time is the best\nDon\'t skip it!',
                        'Will I be loved again?\nI hope so...',
                        'I miss our good days. 💚\nDo you?',
                        'I\'m sad today 😞\nBut I\'m still here.',
                        'Have I been forgotten?\nHopefully not...',
                        'Everyone needs affection.\nEspecially me.'
                  ],

                  dirty: [
                        'Ugh, I stepped on something...',
                        'I\'m currently not comfortable...',
                        'Ugh, this really smells...',
                        'Can someone help me clean up?',
                        'I wonder what bathing feels like...',
                        'There\'s poop everywhere.\nI stepped in it.',
                        'I\'m stinky and sad. 😷\nPlease help?',
                        'I slipped on my mess...\nEmbarrassing.',
                        'It smells weird here...\nSuspiciously weird.',
                        'I don\'t like that smell. 😢',
                        'I feel gross. 🧼\nCan we clean?',
                        'This place is a mess. 😖',
                        'Something squished. Ew...',
                        'How to deal with\nthat smelly mess?',
                        'I miss being clean...\nIt felt better.'
                  ],

                  unhealthy: [
                        'I really need some care now... 🤒',
                        'I\'m going to blow up... 💥',
                        'Tick... tick... tick... 🕰️',
                        'Am I being neglected? 😢',
                        'Please fix me 😷\nBefore it\'s too late.',
                        'I feel weak today 😔\nKinda fragile.',
                        'I think I\'m fading...\nNeed help quickly.',
                        'I\'m hurting. 💥\nThis isn\'t normal.',
                        'My fuse is short...\nIn every way.',
                        'I need a pill, please. 💊',
                        'I\'m tired... all over.\nEven inside.',
                        'I feel broken...\nAnd not the cute kind.',
                        'I\'m about to burst...\nThis is scary.',
                        'Will I survive?\nIt\'s not looking good.',
                        'Dreaming of a better place... 😡'
                  ],

                  detonation: [
                        'Why are you doing this?',
                        'That has been too much.',
                        'I can\'t do this anymore.',
                        'I thought we were friends...',
                        'This is the end...\nI can feel it.',
                        'Goodbye, my friend...\nIt\'s boom time.',
                        'I\'m done...\nBoomingly done.',
                        'I wanted love...\nBut got neglected.',
                        'I can\'t hold it anymore...\nI\'m so sorry.',
                        'I thought we had something. 💥',
                        'That was my final straw...\nPrepare for a burst.',
                        'Ticking ends now.\nSee you on the other side.',
                        'So this is goodbye...\nThanks anyway.',
                        'You\'ll remember me...\nWon\'t you?',
                        'I\'m going to a better place now.',
                  ]
            };
      }

      krepaPickThought()
      {
            let thought = 'Hey, my name is ' + this.krepaName;

            if (this.krepaStats.health < 90) {
                  thought = this.krepaThoughts.unhealthy[Phaser.Math.Between(0, this.krepaThoughts.unhealthy.length - 1)];
            } else if (this.krepaStats.full < 75) {
                  thought = this.krepaThoughts.hungry[Phaser.Math.Between(0, this.krepaThoughts.hungry.length - 1)];
            } else if (this.krepaStats.affection < 50) {
                  thought = this.krepaThoughts.affection[Phaser.Math.Between(0, this.krepaThoughts.affection.length - 1)];
            } else {
                  if (this.krepaBirthdayToday()) {
                        thought = this.krepaThoughts.bday[Phaser.Math.Between(0, this.krepaThoughts.bday.length - 1)];
                  } else if (this.newYearsEveTimeRange()) {
                        thought = this.krepaThoughts.nye[Phaser.Math.Between(0, this.krepaThoughts.nye.length - 1)];
                  } else if (this.rainy) {
                        thought = this.krepaThoughts.rainy[Phaser.Math.Between(0, this.krepaThoughts.rainy.length - 1)];
                  } else {
                        thought = this.krepaThoughts.casual[Phaser.Math.Between(0, this.krepaThoughts.casual.length - 1)];
                  }
            }

            return thought;
      }

      krepaThoughtBubble()
      {
            if ((this.krepaSick) || (this.isDetonated)) {
                  return;
            }

            let self = this;

            const isDraggingThresholdReached = this.getDragThresholdTime() >= DRAG_TOLERANCE_THRESHOLD;

            if ((this.krepaInDragging) && (!isDraggingThresholdReached)) {
                  return;
            }

            const thought = (isDraggingThresholdReached) ? 
                  this.krepaThoughts.detonation[Phaser.Math.Between(0, this.krepaThoughts.detonation.length - 1)] : 
                  this.krepaPickThought();

            this.txtThoughtBubble.setText(thought);
            this.txtThoughtBubble.setVisible(true);
            this.txtThoughtBubble.setAlpha(0);

            self.tweens.add({
                  targets: this.txtThoughtBubble,
                  alpha: 1,
                  duration: 1000,
                  onComplete: function() {
                        self.time.delayedCall(5000, function() {
                              self.txtThoughtBubble.setAlpha(1);
                              
                              self.tweens.add({
                                    targets: self.txtThoughtBubble,
                                    alpha: 0,
                                    duration: 500,
                                    onComplete: function() {
                                          self.txtThoughtBubble.setVisible(false);
                                    }
                              });
                        });
                  }
            });
      }

      storeFoodData()
      {
            let data = [];

            for (let i = 0; i < this.foods.length; i++) {
                  const food = this.foods[i];

                  data.push({ x: food.x, y: food.y });
            }

            const json_data = JSON.stringify(data);

            this.setConfigValue('food_objects', json_data);
      }

      storePoopData()
      {
            let data = [];

            for (let i = 0; i < this.poops.length; i++) {
                  const poop = this.poops[i];

                  data.push({ x: poop.x, y: poop.y });
            }

            const json_data = JSON.stringify(data);

            this.setConfigValue('poop_objects', json_data);
      }

      storeObjectData()
      {
            this.storeFoodData();
            this.storePoopData();
      }

      restoreFoodObjects()
      {
            let objects = this.getConfigValue('food_objects');
            if (objects.length > 0) {
                  objects = JSON.parse(objects);
                  
                  for (let i = 0; i < objects.length; i++) {
                        let entity = this.spawnFood();
                        if (entity) {
                              entity.setPosition(objects[i].x, objects[i].y);
                        }
                  }
            }
      }

      restorePoopObjects()
      {
            let objects = this.getConfigValue('poop_objects');
            if (objects.length > 0) {
                  objects = JSON.parse(objects);
                  
                  for (let i = 0; i < objects.length; i++) {
                        let entity = this.spawnPoop();
                        if (entity) {
                              entity.setPosition(objects[i].x, objects[i].y);
                        }
                  }
            }
      }

      restoreObjectsFromData()
      {
            this.restoreFoodObjects();
            this.restorePoopObjects();
      }

      getDragThresholdTime()
      {
            if ((typeof this.krepaDragTime !== 'number') || (this.krepaDragTime == 0)) {
                  return 0;
            }

            return Date.now() / 1000 - this.krepaDragTime / 1000;
      }

      adjustStatsTimeGap()
      {
            let time_last = Number(this.getConfigValue('updated_timestamp'));
            let time_now = Date.now();
            let time_diff = time_now - time_last;

            let health_check_diff = Math.round(time_diff / TIME_HEALTHCHECK);
            let affection_check_diff = Math.round(time_diff / TIME_AFFECTIONCHECK);
            let hunger_check_diff = Math.round(time_diff / TIME_HUNGERCHECK);
            let poop_check_diff = Math.round(time_diff / TIME_POOPCHECK);
            
            for (let i = 0; i < affection_check_diff; i++) {
                  this.krepaAffectionCheck();
            }

            for (let i = 0; i < hunger_check_diff; i++) {
                  this.krepaHungerCheck();
            }

            for (let i = 0; i < poop_check_diff; i++) {
                  this.krepaPoopCheck();
            }

            for (let i = 0; i < health_check_diff; i++) {
                  this.krepaHealthCheck();
            }
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
            this.setConfigValue('krepa_name', '');

            location.reload();
      }

      playStepSound()
      {
            const sound = this.sndSteps[Phaser.Math.Between(0, this.sndSteps.length - 1)];
            sound.play();
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

      rgbToHex(r, g, b)
      {
            const convert_value = function(value) {
                  let hex = value.toString(16);
                  return (hex.length === 1) ? '0' + hex : hex;
            };

            return Number('0x' + convert_value(r) + convert_value(g) + convert_value(b));
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
            contact: 'dbrendel1988@gmail.com',
            description: 'A pixelated, adorable virtual pet',
            info: 'This project is a fan-made game\nand is not affiliated with\nMojang, Microsoft, Bandai,\nor any of their properties.'
      }
};
