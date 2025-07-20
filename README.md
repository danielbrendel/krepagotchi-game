<h1 align="center">
    <img src="public/img/logo.png" width="256"/><br/>
    Krepagotchi
</h1>

<p align="center">
    A pixelated, adorable virtual pet<br/>
    (C) 2025 by Daniel Brendel
</p>

<p align="center">
    <img src="https://img.shields.io/badge/web-php-green" alt="web-php"/>
    <img src="https://img.shields.io/badge/engine-phaser-orange" alt="engine-phaser"/>
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="license-mit"/>
    <img src="https://img.shields.io/badge/maintained-yes-violet" alt="maintained-yes"/>
</p>

<p align="center">
    <img src="public/img/screenshot-game.png" />
</p>

## Author

__Author__: Daniel Brendel\
__Contact__: dbrendel1988(at)gmail(dot)com\
__GitHub__: https://github.com/danielbrendel

## Description

Krepagotchi is a virtual pet game where you take care of your own little Krepa. You can feed it, clean its home and provide medical treatment when sick.
You can also pet it or play with it using the ball in order to provide affection. Full hunger and zero affection levels as well as a dirty home will impact your pets health. If health reaches zero, your Krepa will fuse and detonate. When that happens you will be prompted with an info dialogue showing some text as well as date of birth and date of detonation, and the opportunity to restart with a new pet. The game has many cozy features and specials. It can be played as a web game or bundled as a standalone executable.

## Disclaimer

This project is a fan-made game and is not affiliated with Mojang, Microsoft, Bandai, or any of their properties.

## Features
- Krepa pet
- Personal name
- Feeding
- Petting
- Playing
- Cleaning
- Treatment
- Health conditions
- Thought bubbles
- Send/recieve letters
- Biome selection
- Birthday celebration
- New Year's Eve Party
- Weather effects
- Dynamic environment
- Cute pixel art
- PWA support

## Run locally

In order to run the game locally during development process, issue one of the following commands.

Use Asatru CLI to run development server
```sh
php asatru serve
```

Use AquaShell to run development server
```sh
aquashell launch.dnys
```

## Make a shippable game build

Make a release build
```sh
php asatru game:release [platform]
```

Make a debug build
```sh
php asatru game:debug [platform]
```

`platform` can be one of the following:
- html5 (default)
- windows
- linux
- macos

The ready-packaged game builds are stored in the `/public/builds` directory
