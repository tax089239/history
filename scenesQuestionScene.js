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

        // 對話框外框
        const bg = this.add.graphics();
        bg.fillStyle(0x000000, 0.85);
        bg.fillRect(50, 100, 700, 400);
        bg.lineStyle(4, 0xffd700);
        bg.strokeRect(50, 100, 700, 400);

        // 標題
        this.add.text(80, 130, `📜 ${this.npcName} 的考驗`, {
            fontSize: '24px',
            color: '#ffd700',
            fontStyle: 'bold'
        });

        // 題目
        this.add.text(80, 180, qData.question, {
            fontSize: '20px',
            color: '#ffffff',
            wordWrap: { width: 640 }
        });

        // 選項按鈕
        qData.options.forEach((opt, idx) => {
            const btnY = 280 + idx * 60;
            const btn = this.add.text(100, btnY, `${idx + 1}. ${opt}`, {
                fontSize: '18px',
                color: '#ffffff',
                backgroundColor: '#333344',
                padding: { x: 15, y: 10 }
            }).setInteractive();

            btn.on('pointerover', () => btn.setStyle({ color: '#ffea00' }));
            btn.on('pointerout', () => btn.setStyle({ color: '#ffffff' }));
            btn.on('pointerdown', () => this.checkAnswer(idx, qData.answer, qData.explanation));
        });
    }

    getQuestionData(id) {
        const questions = {
            elder: {
                question: '買東西時索取統一發票，最主要的用途是什麼呢？',
                options: [
                    '可以參加定期對獎',
                    '證明交易並幫助國家掌握稅收',
                    '以上皆是'
                ],
                answer: 2,
                explanation: '答對了！發票不僅能對獎，也是維護交易誠實納稅的重要憑證！'
            },
            baby: {
                question: '國家收到的稅金，大部分會用在哪些地方？',
                options: [
                    '建設公園、學校與鋪設道路',
                    '買零食給族長吃',
                    '藏在神殿底下的寶箱'
                ],
                answer: 0,
                explanation: '太棒了！稅金會用在公共建設、教育醫療等大家都能享受到的福利上！'
            },
            cloud: {
                question: '使用「雲端發票（載具）」有什麼優點？',
                options: [
                    '減紙環保又不會弄丟',
                    '系統會自動幫你對獎',
                    '以上都是優點'
                ],
                answer: 2,
                explanation: '完全正確！雲端發票方便又環保，還有雲端專屬獎項喔！'
            }
        };
        return questions[id];
    }

    checkAnswer(selectedIndex, correctIndex, explanation) {
        if (selectedIndex === correctIndex) {
            this.game.gameState.badges[this.npcId] = true;
            alert(`✨ 正確！\n\n${explanation}\n\n獲得了徽章！`);
            
            const mapScene = this.scene.get('MapScene');
            mapScene.updateBadgeUI();
            
            this.scene.stop();
            this.scene.resume('MapScene');
        } else {
            alert('❌ 答錯囉！再仔細想一想，再試一次吧！');
        }
    }
}