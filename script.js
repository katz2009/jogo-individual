class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('sapo', 'assets/sapo.png');  
        this.load.image('apple', 'assets/maca.png');  
        this.load.image('fundo', 'assets/fundo.jpg');
        this.load.image('cogumelo', 'assets/cogumelo.png');
    }

    create() {
        this.gameOverFlag = false; // Reseta a flag do game over

        // Fundo
        this.fundo = this.add.image(400, 300, 'fundo').setDepth(-10);
        this.fundo.setScale(1.5);

        // Criando o sapo
        this.sapo = this.physics.add.image(400, 300, 'sapo')
            .setOrigin(0.5, 0.5)
            .setCollideWorldBounds(true);
        this.sapo.setScale(0.5);

        // Configurar colisão com borda
        this.sapo.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', () => {
            this.gameOver();
        });

        // Criando o cogumelo (barreira)
        this.cogumelo = this.physics.add.image(100, 500, 'cogumelo');
        this.cogumelo.setScale(0.5);
        this.cogumelo.setImmovable(true);

        // 🔥 **Recria os controles** para garantir que funcionem após restart
        this.cursors = this.input.keyboard.createCursorKeys();

        // Criando a maçã
        this.apple = this.physics.add.image(Phaser.Math.Between(50, 750), Phaser.Math.Between(50, 550), 'apple');
        this.apple.setScale(0.2);

        // Pontuação
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Pontuação: 0', { fontSize: '32px', fill: '#fff' });

        // Colisão entre o sapo e a maçã
        this.physics.add.overlap(this.sapo, this.apple, this.collectApple, null, this);

        // Colisão entre o sapo e o cogumelo (não faz nada)
        this.physics.add.collider(this.sapo, this.cogumelo);
    }

    update() {
        if (this.gameOverFlag) return; // Impede movimentação após perder

        let velocity = 160;
        this.sapo.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.sapo.setVelocityX(-velocity);
        } else if (this.cursors.right.isDown) {
            this.sapo.setVelocityX(velocity);
        }

        if (this.cursors.up.isDown) {
            this.sapo.setVelocityY(-velocity);
        } else if (this.cursors.down.isDown) {
            this.sapo.setVelocityY(velocity);
        }
    }

    collectApple(sapo, apple) {
        // Muda a posição da maçã para um novo local
        apple.setPosition(Phaser.Math.Between(50, 750), Phaser.Math.Between(50, 550));
    
        // Aumenta a pontuação
        this.score += 1;
        this.scoreText.setText('Pontuação: ' + this.score);
    
        // Aumenta o tamanho do sapo
        let newScale = this.sapo.scale + 0.03; // Aumenta um pouco a cada maçã
        if (newScale < 2) { // Limite para evitar crescimento infinito
            this.sapo.setScale(newScale);
        }
    }

    gameOver() {
        this.gameOverFlag = true;
        this.sapo.setVelocity(0);

        // Exibir "Game Over" e botão de reiniciar
        this.add.text(400, 250, 'Game Over', { fontSize: '48px', fill: '#ff0000' }).setOrigin(0.5);

        let restartButton = this.add.text(400, 350, 'Reiniciar', { 
            fontSize: '32px', 
            fill: '#0f0', 
            backgroundColor: '#222' 
        })
        .setOrigin(0.5)
        .setPadding(10)
        .setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.restart(); // Reinicia a cena corretamente
        });

        restartButton.on('pointerover', () => {
            restartButton.setStyle({ fill: '#ff0' });
        });

        restartButton.on('pointerout', () => {
            restartButton.setStyle({ fill: '#0f0' });
        });
    }
}

// Configuração do jogo
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [GameScene]
};

const game = new Phaser.Game(config);
