class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        this.add.text(400, 180, '🏛 史前稅務神殿大冒險 🏛', {
            fontSize: '36px',
            color: '#ffd700',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const storyText = 
            '史前部落的「稅務神殿」失去了三枚稅務徽章！\n\n' +
            '只有通過三位部落守護者的考驗，\n' +
            '收集完整徽章，才能重新開啟神殿。';

        this.add.text(400, 300, storyText, {
            fontSize: '18px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5);

        const startBtn = this.add.text(400, 460, '▶ 開始冒險 (按 Enter 或 點擊)', {
            fontSize: '22px',
            color: '#00ffcc',
            backgroundColor: '#222233',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        startBtn.on('pointerdown', () => this.startGame());
        this.input.keyboard.once('keydown-ENTER', () => this.startGame());
    }

    startGame() {
        this.scene.start('MapScene');
    }
}