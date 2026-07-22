class QuestionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'QuestionScene' });
    }

    init(data) {
        this.npcId = data.npcId;
        this.npcName = data.npcName;
    }

    create() {
        const qData = this.getQuestionData(this.npcId);
        this.cameras.main.setBackgroundColor('rgba(0,0,0,0.58)');

        const shade = this.add.rectangle(400, 300, 800, 600, 0x07111f, 0.72).setInteractive();

        const panel = this.add.graphics();
        panel.fillStyle(0x15233a, 0.98);
        panel.fillRoundedRect(70, 70, 660, 470, 28);
        panel.lineStyle(2, 0xffd166, 0.72);
        panel.strokeRoundedRect(70, 70, 660, 470, 28);

        this.add.text(105, 104, '守護者考驗', {
            fontFamily: 'Microsoft JhengHei', fontSize: '14px', color: '#9ec8bd'
        });
        this.add.text(105, 130, this.npcName, {
            fontFamily: 'Microsoft JhengHei', fontSize: '28px', color: '#fff2c6', fontStyle: 'bold'
        });

        this.add.text(105, 188, qData.question, {
            fontFamily: 'Microsoft JhengHei',
            fontSize: '22px',
            color: '#ffffff',
            fontStyle: 'bold',
            lineSpacing: 7,
            wordWrap: { width: 590 }
        });

        qData.options.forEach((opt, idx) => {
            const y = 300 + idx * 68;
            const box = this.add.graphics();
            box.fillStyle(0xffffff, 0.07);
            box.fillRoundedRect(105, y - 23, 590, 52, 16);
            box.lineStyle(1, 0xffffff, 0.14);
            box.strokeRoundedRect(105, y - 23, 590, 52, 16);

            const btn = this.add.text(130, y + 2, `${String.fromCharCode(65 + idx)}　${opt}`, {
                fontFamily: 'Microsoft JhengHei', fontSize: '18px', color: '#f6f8fb'
            }).setOrigin(0, 0.5).setInteractive(new Phaser.Geom.Rectangle(-25, -24, 590, 52), Phaser.Geom.Rectangle.Contains);

            btn.on('pointerover', () => {
                box.clear();
                box.fillStyle(0xffd166, 0.18);
                box.fillRoundedRect(105, y - 23, 590, 52, 16);
                box.lineStyle(2, 0xffd166, 0.75);
                box.strokeRoundedRect(105, y - 23, 590, 52, 16);
                btn.setColor('#fff4c7');
            });
            btn.on('pointerout', () => {
                box.clear();
                box.fillStyle(0xffffff, 0.07);
                box.fillRoundedRect(105, y - 23, 590, 52, 16);
                box.lineStyle(1, 0xffffff, 0.14);
                box.strokeRoundedRect(105, y - 23, 590, 52, 16);
                btn.setColor('#f6f8fb');
            });
            btn.on('pointerdown', () => this.checkAnswer(idx, qData.answer, qData.explanation));
        });

        this.add.text(400, 512, '選擇你認為正確的答案', {
            fontFamily: 'Microsoft JhengHei', fontSize: '13px', color: '#89aaa2'
        }).setOrigin(0.5);
    }

    getQuestionData(id) {
        const questions = {
            elder: {
                question: '買東西時索取統一發票，最主要的用途是什麼呢？',
                options: ['可以參加定期對獎', '證明交易並幫助國家掌握稅收', '以上皆是'],
                answer: 2,
                explanation: '發票不僅能對獎，也是維護交易與誠實納稅的重要憑證！'
            },
            baby: {
                question: '國家收到的稅金，大部分會用在哪些地方？',
                options: ['建設公園、學校與鋪設道路', '買零食給族長吃', '藏在神殿底下的寶箱'],
                answer: 0,
                explanation: '稅金會用於公共建設、教育、醫療等大家共享的服務！'
            },
            cloud: {
                question: '使用「雲端發票（載具）」有什麼優點？',
                options: ['減紙環保又不會弄丟', '系統會自動幫你對獎', '以上都是優點'],
                answer: 2,
                explanation: '雲端發票方便、環保，還能自動對獎並享有專屬獎項！'
            }
        };
        return questions[id];
    }

    checkAnswer(selectedIndex, correctIndex, explanation) {
        if (selectedIndex === correctIndex) {
            this.game.gameState.badges[this.npcId] = true;
            this.showResult(true, '答對了！獲得一枚徽章', explanation);
        } else {
            this.showResult(false, '再想一想', '這個答案還不正確，再試一次吧！');
        }
    }

    showResult(success, title, message) {
        const overlay = this.add.rectangle(400, 300, 800, 600, 0x07111f, 0.72).setDepth(20).setInteractive();
        const card = this.add.graphics().setDepth(21);
        card.fillStyle(success ? 0x173a35 : 0x3b2630, 1);
        card.fillRoundedRect(175, 190, 450, 220, 25);
        card.lineStyle(2, success ? 0x66d9a6 : 0xff8a9a, 0.85);
        card.strokeRoundedRect(175, 190, 450, 220, 25);

        this.add.text(400, 238, success ? '✨' : '💡', { fontSize: '42px' }).setOrigin(0.5).setDepth(22);
        this.add.text(400, 291, title, {
            fontFamily: 'Microsoft JhengHei', fontSize: '25px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(22);
        this.add.text(400, 337, message, {
            fontFamily: 'Microsoft JhengHei', fontSize: '16px', color: '#dceae6', align: 'center',
            wordWrap: { width: 360 }
        }).setOrigin(0.5).setDepth(22);

        const action = this.add.text(400, 385, success ? '回到地圖' : '重新作答', {
            fontFamily: 'Microsoft JhengHei', fontSize: '16px', color: '#17212f', fontStyle: 'bold',
            backgroundColor: success ? '#ffd166' : '#ffb3bd', padding: { x: 24, y: 10 }
        }).setOrigin(0.5).setDepth(22).setInteractive({ useHandCursor: true });

        action.on('pointerdown', () => {
            if (success) {
                const mapScene = this.scene.get('MapScene');
                mapScene.updateBadgeUI();
                this.scene.stop();
                this.scene.resume('MapScene');
            } else {
                overlay.destroy();
                card.destroy();
                this.children.list.filter(obj => obj.depth >= 22).forEach(obj => obj.destroy());
            }
        });
    }
}
