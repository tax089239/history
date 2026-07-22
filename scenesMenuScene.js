class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        this.cameras.main.setBackgroundColor('#14233b');
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x132238, 0x132238, 0x1e5a54, 0x244b45, 1);
        bg.fillRect(0, 0, 800, 600);

        // 柔和光暈與星點
        for (let i = 0; i < 45; i++) {
            const dot = this.add.circle(
                Phaser.Math.Between(10, 790),
                Phaser.Math.Between(10, 590),
                Phaser.Math.Between(1, 3),
                0xfff3c4,
                Phaser.Math.FloatBetween(0.12, 0.45)
            );
            this.tweens.add({
                targets: dot,
                alpha: { from: dot.alpha, to: 0.05 },
                duration: Phaser.Math.Between(1200, 2500),
                yoyo: true,
                repeat: -1
            });
        }

        // 頂部品牌膠囊
        const brand = this.add.graphics();
        brand.fillStyle(0x10213a, 0.72);
        brand.fillRoundedRect(278, 34, 244, 42, 21);
        brand.lineStyle(1, 0xffffff, 0.16);
        brand.strokeRoundedRect(278, 34, 244, 42, 21);
        this.add.text(400, 55, '臺東縣稅務局・租稅互動遊戲', {
            fontFamily: 'Microsoft JhengHei',
            fontSize: '15px',
            color: '#dff8ef'
        }).setOrigin(0.5);

        // 主卡片
        const panel = this.add.graphics();
        panel.fillStyle(0x0d1829, 0.76);
        panel.fillRoundedRect(70, 100, 660, 400, 28);
        panel.lineStyle(2, 0xffd166, 0.42);
        panel.strokeRoundedRect(70, 100, 660, 400, 28);

        this.add.image(400, 155, 'temple_door').setScale(1.15);

        this.add.text(400, 225, '史前稅務神殿大冒險', {
            fontFamily: 'Microsoft JhengHei',
            fontSize: '39px',
            color: '#fff4ca',
            fontStyle: 'bold',
            stroke: '#4d3416',
            strokeThickness: 5,
            shadow: { offsetX: 0, offsetY: 5, color: '#000000', blur: 10, fill: true }
        }).setOrigin(0.5);

        this.add.text(400, 283, '穿越史前部落，完成三位守護者的租稅考驗', {
            fontFamily: 'Microsoft JhengHei',
            fontSize: '18px',
            color: '#d8eee8'
        }).setOrigin(0.5);

        const chips = [
            { x: 230, icon: '📜', title: '統一發票' },
            { x: 400, icon: '🍍', title: '稅金用途' },
            { x: 570, icon: '☁️', title: '雲端發票' }
        ];
        chips.forEach((chip, index) => {
            const c = this.add.graphics();
            c.fillStyle(0xffffff, 0.08);
            c.fillRoundedRect(chip.x - 70, 320, 140, 64, 16);
            c.lineStyle(1, 0xffffff, 0.12);
            c.strokeRoundedRect(chip.x - 70, 320, 140, 64, 16);
            this.add.text(chip.x, 337, chip.icon, { fontSize: '22px' }).setOrigin(0.5);
            this.add.text(chip.x, 366, chip.title, {
                fontFamily: 'Microsoft JhengHei', fontSize: '15px', color: '#ffffff'
            }).setOrigin(0.5);
        });

        const buttonBg = this.add.graphics();
        buttonBg.fillStyle(0xffd166, 1);
        buttonBg.fillRoundedRect(255, 420, 290, 62, 31);
        buttonBg.lineStyle(3, 0xffecb3, 0.85);
        buttonBg.strokeRoundedRect(255, 420, 290, 62, 31);

        const startBtn = this.add.text(400, 451, '開始冒險  ▶', {
            fontFamily: 'Microsoft JhengHei',
            fontSize: '23px',
            color: '#263238',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        startBtn.on('pointerover', () => {
            this.tweens.add({ targets: [buttonBg, startBtn], scaleX: 1.04, scaleY: 1.04, duration: 120 });
        });
        startBtn.on('pointerout', () => {
            this.tweens.add({ targets: [buttonBg, startBtn], scaleX: 1, scaleY: 1, duration: 120 });
        });
        startBtn.on('pointerdown', () => this.startGame());
        this.input.keyboard.once('keydown-ENTER', () => this.startGame());

        this.add.text(400, 540, '方向鍵 / WASD 移動　・　空白鍵互動', {
            fontFamily: 'Microsoft JhengHei', fontSize: '14px', color: '#9fc8be'
        }).setOrigin(0.5);
    }

    startGame() {
        this.cameras.main.fadeOut(280, 18, 34, 56);
        this.time.delayedCall(280, () => this.scene.start('MapScene'));
    }
}
