const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#101827',
    pixelArt: false,
    antialias: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, MenuScene, MapScene, QuestionScene, EndScene]
};

const game = new Phaser.Game(config);

game.gameState = {
    badges: {
        elder: false,
        baby: false,
        cloud: false
    }
};
