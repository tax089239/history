class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    create() {
        this.createTextures();
        this.scene.start('MenuScene');
    }

    createTextures() {
        const g = this.add.graphics();

        // 玩家：圓潤的史前小勇者
        g.clear();
        g.fillStyle(0x2f855a);
        g.fillCircle(24, 25, 18);
        g.fillStyle(0xf6c177);
        g.fillCircle(24, 18, 11);
        g.fillStyle(0x3b2f2f);
        g.fillCircle(20, 17, 2);
        g.fillCircle(28, 17, 2);
        g.lineStyle(2, 0x3b2f2f);
        g.beginPath();
        g.arc(24, 20, 5, 0.25, Math.PI - 0.25);
        g.strokePath();
        g.fillStyle(0xffd166);
        g.fillTriangle(11, 10, 18, 2, 23, 11);
        g.fillTriangle(25, 11, 31, 2, 37, 12);
        g.generateTexture('player', 48, 48);

        // 族長
        g.clear();
        g.fillStyle(0x6d4c41);
        g.fillCircle(24, 25, 19);
        g.fillStyle(0xf2c6a0);
        g.fillCircle(24, 19, 12);
        g.fillStyle(0xffffff);
        g.fillCircle(19, 18, 3);
        g.fillCircle(29, 18, 3);
        g.fillStyle(0x3e2723);
        g.fillCircle(19, 18, 1.4);
        g.fillCircle(29, 18, 1.4);
        g.fillStyle(0xffffff);
        g.fillTriangle(15, 27, 24, 38, 33, 27);
        g.fillStyle(0xffc107);
        g.fillTriangle(8, 10, 17, 1, 22, 12);
        g.fillTriangle(26, 12, 32, 1, 40, 10);
        g.generateTexture('npc_elder', 48, 48);

        // 釋迦寶寶
        g.clear();
        g.fillStyle(0x8bc34a);
        g.fillCircle(24, 25, 19);
        g.fillStyle(0xaed581);
        [[16,17],[24,14],[32,17],[14,25],[24,23],[34,25],[18,32],[29,32]].forEach(p => g.fillCircle(p[0], p[1], 4));
        g.fillStyle(0x263238);
        g.fillCircle(20, 22, 2);
        g.fillCircle(29, 22, 2);
        g.lineStyle(2, 0x263238);
        g.beginPath();
        g.arc(24, 26, 5, 0.2, Math.PI - 0.2);
        g.strokePath();
        g.fillStyle(0x558b2f);
        g.fillTriangle(18, 8, 24, 0, 27, 10);
        g.fillTriangle(24, 9, 33, 2, 31, 13);
        g.generateTexture('npc_baby', 48, 48);

        // 雲端精靈
        g.clear();
        g.fillStyle(0xe3f2fd);
        g.fillCircle(17, 26, 12);
        g.fillCircle(28, 20, 15);
        g.fillCircle(38, 27, 11);
        g.fillRoundedRect(11, 24, 34, 16, 8);
        g.fillStyle(0x1565c0);
        g.fillCircle(23, 25, 2);
        g.fillCircle(33, 25, 2);
        g.lineStyle(2, 0x1565c0);
        g.beginPath();
        g.arc(28, 29, 5, 0.15, Math.PI - 0.15);
        g.strokePath();
        g.generateTexture('npc_cloud', 52, 48);

        // 神殿
        g.clear();
        g.fillStyle(0x4e342e);
        g.fillRoundedRect(0, 14, 88, 50, 8);
        g.fillStyle(0x795548);
        g.fillTriangle(0, 18, 44, 0, 88, 18);
        g.fillStyle(0xffd54f);
        g.fillRoundedRect(31, 27, 26, 37, 8);
        g.fillStyle(0x5d4037);
        g.fillCircle(49, 45, 3);
        g.lineStyle(3, 0xffecb3);
        g.strokeRoundedRect(31, 27, 26, 37, 8);
        g.generateTexture('temple_door', 88, 64);

        // 小樹與岩石
        g.clear();
        g.fillStyle(0x6d4c41);
        g.fillRect(18, 30, 8, 18);
        g.fillStyle(0x2e7d32);
        g.fillCircle(22, 22, 18);
        g.fillStyle(0x43a047);
        g.fillCircle(15, 18, 9);
        g.generateTexture('tree', 44, 50);

        g.clear();
        g.fillStyle(0x78909c);
        g.fillEllipse(20, 14, 36, 24);
        g.fillStyle(0xb0bec5);
        g.fillEllipse(15, 10, 14, 7);
        g.generateTexture('rock', 40, 28);

        g.destroy();
    }
}
