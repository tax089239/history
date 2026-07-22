const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    pixelArt: true,
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

// 跨 Scene 遊戲狀態記錄
game.gameState = {
    badges: {
        elder: false,    // 石器族長 (發票)
        baby: false,     // 釋迦寶寶 (稅金用途)
        cloud: false     // 雲端精靈 (雲端發票)
    }
};