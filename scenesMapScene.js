class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MapScene' });
    }

    create() {
        // 背景地圖網格繪製
        const bg = this.add.graphics();
        bg.fillStyle(0x2e7d32);
        bg.fillRect(0, 0, 800, 600);
        
        // 裝飾點綴 (樹木/草地)
        bg.fillStyle(0x1b5e20);
        for(let i = 0; i < 40; i++) {
            bg.fillCircle((i * 97) % 800, (i * 131) % 600, 10);
        }

        // 建立 NPC 與物件
        this.temple = this.physics.add.staticSprite(400, 80, 'temple_door');
        
        this.npcs = this.physics.add.staticGroup();
        this.npcElder = this.npcs.create(150, 250, 'npc_elder').setData({
            id: 'elder',
            name: '👴 石器族長',
            topic: '統一發票'
        });
        this.npcBaby = this.npcs.create(650, 250, 'npc_baby').setData({
            id: 'baby',
            name: '🍍 釋迦寶寶',
            topic: '稅金用途'
        });
        this.npcCloud = this.npcs.create(400, 450, 'npc_cloud').setData({
            id: 'cloud',
            name: '☁️ 雲端精靈',
            topic: '雲端發票'
        });

        // 玩家建立
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);

        // 鍵盤輸入
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        // UI 介面：顯示徽章進度
        this.uiText = this.add.text(16, 16, '', {
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: { x: 10, y: 8 }
        });
        this.updateBadgeUI();

        // 互動提示字樣
        this.promptText = this.add.text(400, 560, '方向鍵/WASD移動，靠近NPC按 [空格鍵] 對話', {
            fontSize: '16px',
            color: '#ffff00',
            backgroundColor: '#000000',
            padding: { x: 8, y: 4 }
        }).setOrigin(0.5);

        // 碰撞與近距離觸發設定
        this.physics.add.collider(this.player, this.temple, this.handleTempleTouch, null, this);
    }

    update() {
        // 玩家移動邏輯
        const speed = 180;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.player.setVelocityX(speed);
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.player.setVelocityY(speed);
        }

        // 檢查與 NPC 的距離
        let nearNPC = null;
        this.npcs.getChildren().forEach(npc => {
            const dist = Phaser.Math.Distance.BetweenPoints(this.player, npc);
            if (dist < 48) {
                nearNPC = npc;
            }
        });

        if (nearNPC) {
            const badgeKey = nearNPC.getData('id');
            const hasBadge = this.game.gameState.badges[badgeKey];
            
            if (hasBadge) {
                this.promptText.setText(`${nearNPC.getData('name')}：你已經通過考驗了！`);
            } else {
                this.promptText.setText(`[空白鍵] 與 ${nearNPC.getData('name')} 對話`);
                if (Phaser.Input.Keyboard.JustDown(this.cursors.space) || Phaser.Input.Keyboard.JustDown(this.wasd.space)) {
                    this.scene.pause();
                    this.scene.launch('QuestionScene', { npcId: badgeKey, npcName: nearNPC.getData('name') });
                }
            }
        } else {
            this.promptText.setText('移動前往考驗地點，收集三枚徽章！');
        }
    }

    updateBadgeUI() {
        const b = this.game.gameState.badges;
        const eStr = b.elder ? '📜發票徽章 ✓' : '📜發票徽章 ✗';
        const bStr = b.baby ? '🍍用途徽章 ✓' : '🍍用途徽章 ✗';
        const cStr = b.cloud ? '☁️雲端徽章 ✓' : '☁️雲端徽章 ✗';

        this.uiText.setText(`收集進度：\n${eStr} | ${bStr} | ${cStr}`);
    }

    handleTempleTouch() {
        const b = this.game.gameState.badges;
        if (b.elder && b.baby && b.cloud) {
            this.scene.start('EndScene');
        } else {
            this.promptText.setText('🏛 神殿被封印中！需要三枚徽章才能開啟！');
        }
    }
}