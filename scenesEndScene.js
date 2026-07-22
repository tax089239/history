class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    create() {
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x14233b, 0x14233b, 0x1c6b63, 0x154944, 1);
        bg.fillRect(0, 0, 800, 600);

        for (let i = 0; i < 55; i++) {
            const p = this.add.circle(
                Phaser.Math.Between(80, 720),
                Phaser.Math.Between(50, 540),
                Phaser.Math.Between(2, 5),
                Phaser.Utils.Array.GetRandom([0xffd166, 0x66d9a6, 0x64b5f6, 0xff8a9a]),
                0.7
            );
            this.tweens.add({
                targets: p,
                y: p.y + Phaser.Math.Between(35, 90),
                x: p.x + Phaser.Math.Between(-25, 25),
                alpha: 0,
                duration: Phaser.Math.Between(1200, 2600),
                repeat: -1,
                delay: Phaser.Math.Between(0, 1200)
            });
        }

        const panel = this.add.graphics();
        panel.fillStyle(0x0d1829, 0.84);
        panel.fillRoundedRect(95, 75, 610, 445, 30);
        panel.lineStyle(2, 0xffd166, 0.58);
        panel.strokeRoundedRect(95, 75, 610, 445, 30);

        this.add.image(400, 145, 'temple_door').setScale(1.3);
        this.add.text(400, 223, '神殿封印解除！', {
            fontFamily: 'Microsoft JhengHei', fontSize: '39px', color: '#fff2c6', fontStyle: 'bold',
            stroke: '#4b3315', strokeThickness: 5
        }).setOrigin(0.5);

        this.add.text(400, 286, '你已完成三項租稅考驗', {
            fontFamily: 'Microsoft JhengHei', fontSize: '19px', color: '#d5eee8'
        }).setOrigin(0.5);

        this.add.text(400, 346, '🏆 史前稅務勇者 🏆', {
            fontFamily: 'Microsoft JhengHei', fontSize: '30px', color: '#66d9a6', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 398, '📜 統一發票　　🍍 稅金用途　　☁️ 雲端發票', {
            fontFamily: 'Microsoft JhengHei', fontSize: '17px', color: '#ffffff'
        }).setOrigin(0.5);

        const restartBtn = this.add.text(400, 466, '再玩一次  ↻', {
            fontFamily: 'Microsoft JhengHei', fontSize: '19px', color: '#263238', fontStyle: 'bold',
            backgroundColor: '#ffd166', padding: { x: 28, y: 13 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        restartBtn.on('pointerover', () => restartBtn.setScale(1.05));
        restartBtn.on('pointerout', () => restartBtn.setScale(1));
        restartBtn.on('pointerdown', () => {
            this.game.gameState.badges = { elder: false, baby: false, cloud: false };
            this.scene.start('MenuScene');
        });
    }
}
