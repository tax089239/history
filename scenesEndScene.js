class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    create() {
        const bg = this.add.graphics();
        bg.fillStyle(0x1a237e);
        bg.fillRect(0, 0, 800, 600);

        this.add.text(400, 180, '✨ 恭喜通關！✨', {
            fontSize: '42px',
            color: '#ffd700',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 270, '🏛 神殿重新綻放了光彩！\n你已通過所有考驗，獲頒稱號：', {
            fontSize: '22px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(400, 360, '🏆【 史前稅務勇者 】🏆', {
            fontSize: '32px',
            color: '#00e676',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const restartBtn = this.add.text(400, 480, '🔄 重玩一次', {
            fontSize: '20px',
            color: '#ffffff',
            backgroundColor: '#d32f2f',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        restartBtn.on('pointerdown', () => {
            this.game.gameState.badges = { elder: false, baby: false, cloud: false };
            this.scene.start('MenuScene');
        });
    }
}