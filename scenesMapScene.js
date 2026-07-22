class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MapScene' });
    }

    create() {
        this.cameras.main.fadeIn(300, 16, 28, 46);
        this.drawWorld();

        this.temple = this.physics.add.staticSprite(400, 103, 'temple_door').setScale(1.08);
        this.add.text(400, 151, '封印神殿', {
            fontFamily: 'Microsoft JhengHei', fontSize: '15px', color: '#5b3219', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.npcs = this.physics.add.staticGroup();
        this.npcElder = this.makeNpc(154, 270, 'npc_elder', 'elder', '石器族長', '統一發票', 0xffc857);
        this.npcBaby = this.makeNpc(646, 270, 'npc_baby', 'baby', '釋迦寶寶', '稅金用途', 0x9ccc65);
        this.npcCloud = this.makeNpc(400, 450, 'npc_cloud', 'cloud', '雲端精靈', '雲端發票', 0x64b5f6);

        this.player = this.physics.add.sprite(400, 300, 'player').setScale(1.05);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(5);
        this.tweens.add({ targets: this.player, scaleY: 1.1, duration: 430, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        this.createHud();
        this.physics.add.collider(this.player, this.temple, this.handleTempleTouch, null, this);
    }

    drawWorld() {
        const bg = this.add.graphics();
        bg.fillGradientStyle(0x8fd3a8, 0x8fd3a8, 0x65a97e, 0x5c9a73, 1);
        bg.fillRect(0, 0, 800, 600);

        // 地圖道路
        bg.fillStyle(0xe7d4a7, 0.92);
        bg.fillRoundedRect(365, 145, 70, 360, 30);
        bg.fillRoundedRect(140, 236, 520, 72, 32);
        bg.lineStyle(2, 0xffffff, 0.22);
        bg.strokeRoundedRect(365, 145, 70, 360, 30);
        bg.strokeRoundedRect(140, 236, 520, 72, 32);

        // 河流
        bg.fillStyle(0x63b6d5, 0.75);
        bg.fillRoundedRect(-30, 505, 860, 105, 40);
        bg.lineStyle(3, 0xbfeaf6, 0.55);
        for (let x = 10; x < 800; x += 70) {
            bg.beginPath();
            bg.arc(x, 538, 18, 0.1, Math.PI - 0.1);
            bg.strokePath();
        }

        const trees = [[68,92],[118,165],[708,105],[748,190],[78,400],[705,410],[230,520],[590,530]];
        trees.forEach(([x,y], i) => this.add.image(x,y,'tree').setScale(i % 2 ? 0.95 : 1.15).setAlpha(0.9));
        [[210,105],[600,170],[110,500],[690,500]].forEach(([x,y]) => this.add.image(x,y,'rock').setScale(0.85).setAlpha(0.8));
    }

    makeNpc(x, y, texture, id, name, topic, color) {
        const npc = this.npcs.create(x, y, texture).setData({ id, name, topic });
        npc.setDepth(4);

        const card = this.add.graphics();
        card.fillStyle(0xffffff, 0.92);
        card.fillRoundedRect(x - 72, y + 34, 144, 50, 15);
        card.lineStyle(2, color, 0.55);
        card.strokeRoundedRect(x - 72, y + 34, 144, 50, 15);
        card.setDepth(3);

        this.add.text(x, y + 48, name, {
            fontFamily: 'Microsoft JhengHei', fontSize: '16px', color: '#263238', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(4);
        this.add.text(x, y + 69, topic, {
            fontFamily: 'Microsoft JhengHei', fontSize: '12px', color: '#607d6f'
        }).setOrigin(0.5).setDepth(4);

        this.tweens.add({ targets: npc, y: y - 5, duration: 900 + x, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
        return npc;
    }

    createHud() {
        const top = this.add.graphics().setDepth(10);
        top.fillStyle(0x10213a, 0.92);
        top.fillRoundedRect(18, 16, 764, 70, 18);
        top.lineStyle(1, 0xffffff, 0.15);
        top.strokeRoundedRect(18, 16, 764, 70, 18);

        this.add.text(40, 33, '🏛 史前稅務神殿', {
            fontFamily: 'Microsoft JhengHei', fontSize: '19px', color: '#fff2c6', fontStyle: 'bold'
        }).setDepth(11);
        this.add.text(40, 59, '完成守護者考驗，解開神殿封印', {
            fontFamily: 'Microsoft JhengHei', fontSize: '12px', color: '#a9c7c0'
        }).setDepth(11);

        this.uiText = this.add.text(745, 50, '', {
            fontFamily: 'Microsoft JhengHei', fontSize: '14px', color: '#ffffff', align: 'right'
        }).setOrigin(1, 0.5).setDepth(11);
        this.updateBadgeUI();

        const bottom = this.add.graphics().setDepth(10);
        bottom.fillStyle(0x10213a, 0.92);
        bottom.fillRoundedRect(85, 535, 630, 48, 20);
        bottom.lineStyle(1, 0xffffff, 0.13);
        bottom.strokeRoundedRect(85, 535, 630, 48, 20);

        this.promptText = this.add.text(400, 559, '移動前往考驗地點，收集三枚徽章！', {
            fontFamily: 'Microsoft JhengHei', fontSize: '16px', color: '#f8f6e8', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(11);
    }

    update() {
        const speed = 185;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown || this.wasd.left.isDown) this.player.setVelocityX(-speed);
        else if (this.cursors.right.isDown || this.wasd.right.isDown) this.player.setVelocityX(speed);
        if (this.cursors.up.isDown || this.wasd.up.isDown) this.player.setVelocityY(-speed);
        else if (this.cursors.down.isDown || this.wasd.down.isDown) this.player.setVelocityY(speed);

        this.player.body.velocity.normalize().scale(speed);

        let nearNPC = null;
        this.npcs.getChildren().forEach(npc => {
            if (Phaser.Math.Distance.BetweenPoints(this.player, npc) < 62) nearNPC = npc;
        });

        if (nearNPC) {
            const badgeKey = nearNPC.getData('id');
            const hasBadge = this.game.gameState.badges[badgeKey];
            if (hasBadge) {
                this.promptText.setText(`✅ ${nearNPC.getData('name')}：你已通過考驗！`);
            } else {
                this.promptText.setText(`按【空白鍵】接受 ${nearNPC.getData('name')} 的考驗`);
                if (Phaser.Input.Keyboard.JustDown(this.cursors.space) || Phaser.Input.Keyboard.JustDown(this.wasd.space)) {
                    this.scene.pause();
                    this.scene.launch('QuestionScene', { npcId: badgeKey, npcName: nearNPC.getData('name') });
                }
            }
        } else {
            this.promptText.setText('方向鍵 / WASD 移動　・　靠近守護者按空白鍵');
        }
    }

    updateBadgeUI() {
        const b = this.game.gameState.badges;
        const earned = [b.elder, b.baby, b.cloud].filter(Boolean).length;
        const icons = `${b.elder ? '📜' : '◯'}　${b.baby ? '🍍' : '◯'}　${b.cloud ? '☁️' : '◯'}`;
        this.uiText.setText(`徽章進度 ${earned} / 3\n${icons}`);
    }

    handleTempleTouch() {
        const b = this.game.gameState.badges;
        if (b.elder && b.baby && b.cloud) {
            this.scene.start('EndScene');
        } else {
            this.promptText.setText('🔒 神殿仍被封印，需要集滿三枚徽章！');
            this.cameras.main.shake(140, 0.004);
        }
    }
}
