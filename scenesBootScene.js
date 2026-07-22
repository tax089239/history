class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    create() {
        // 使用 Graphics 自動繪製暫代素材 (紋理 generator)
        this.createTextures();
        this.scene.start('MenuScene');
    }

    createTextures() {
        let g = this.add.graphics();

        // 1. 玩家 (綠色小勇者)
        g.clear();
        g.fillStyle(0x4caf50);
        g.fillCircle(16, 16, 14);
        g.fillStyle(0xffffff);
        g.fillCircle(11, 12, 3);
        g.fillCircle(21, 12, 3);
        g.generateTexture('player', 32, 32);

        // 2. 石器族長 (棕色)
        g.clear();
        g.fillStyle(0x795548);
        g.fillRect(2, 2, 28, 28);
        g.generateTexture('npc_elder', 32, 32);

        // 3. 釋迦寶寶 (鮮綠)
        g.clear();
        g.fillStyle(0x8bc34a);
        g.fillCircle(16, 16, 15);
        g.generateTexture('npc_baby', 32, 32);

        // 4. 雲端精靈 (天藍)
        g.clear();
        g.fillStyle(0x2196f3);
        g.fillCircle(16, 16, 12);
        g.generateTexture('npc_cloud', 32, 32);

        // 5. 神殿門口 (金色)
        g.clear();
        g.fillStyle(0xffc107);
        g.fillRect(0, 0, 64, 40);
        g.generateTexture('temple_door', 64, 40);

        g.destroy();
    }
}