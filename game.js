const config = {
    type: Phaser.AUTO,

    parent: "game-container",

    width: 1920,
    height: 1080,

    backgroundColor: "#1b3b2f",

    scale: {
        mode: Phaser.Scale.FIT,          // 自動縮放
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    scene: [
        BootScene,
        MenuScene,
        MapScene,
        QuestionScene,
        EndScene
    ]
};

const game = new Phaser.Game(config);

game.gameState = {
    badges: {
        elder: false,
        baby: false,
        cloud: false
    }
};

const game = new Phaser.Game(config);

game.gameState = {
    badges: {
        elder: false,
        baby: false,
        cloud: false
    }
};
