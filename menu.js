class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('fundoSapos', 'assets/fundosapos.jpg');  
    }

    create() {
        // Fundo expandido para cobrir toda a tela
        this.add.image(400, 300, 'fundoSapos').setDepth(-10).setDisplaySize(800, 600);

        // Texto do título com cor preta e negrito
        this.add.text(400, 200, 'Tartaruga e Maçã', { 
            fontSize: '48px', 
            fill: '#000', 
            fontWeight: 'bold' 
        }).setOrigin(0.5);

        // Botão para iniciar o jogo
        let playButton = this.add.text(400, 350, 'Jogar', { 
            fontSize: '32px', 
            fill: '#000', 
            fontWeight: 'bold', 
            backgroundColor: '#ddd' // Cor de fundo mais clara para contraste
        })
        .setOrigin(0.5)
        .setPadding(10)
        .setInteractive();

        // Iniciar o jogo ao clicar
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene'); 
        });

        // Efeito de hover no botão
        playButton.on('pointerover', () => {
            playButton.setStyle({ fill: '#444' }); // Cinza escuro ao passar o mouse
        });

        playButton.on('pointerout', () => {
            playButton.setStyle({ fill: '#000' });
        });
    }
}
