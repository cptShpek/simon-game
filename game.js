var game = {

    buttonColours: ["red", "blue", "green", "yellow"],
    
    gamePattern: [],

    userClickedPattern: [],

    isGameStarted: false,

    level: 0,

    gameStart: function() {
        
        $('body').on('keydown', () => {
            if (this.isGameStarted) {
                return
            } else {
                this.nextSequence();
                this.clickHandler();
                this.isGameStarted = true;
            }
        });

        $('body').on('click', () => {
            if (this.isGameStarted) {
                return
            } else {
                this.nextSequence();
                this.clickHandler();
                this.isGameStarted = true;
            }
        });

    },

    gameOver: function() {

        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();

        $('#level-title').text('Game Over, Press Any Key to Restart');

        $('body').addClass('game-over');
        setTimeout(() => $('body').removeClass('game-over'), 200);

        this.level = 0;
        this.isGameStarted = false;
        this.userClickedPattern = [];
        this.gamePattern = [];
        
    },

    nextSequence: function() {

        $('h1').text(`Level ${this.level}`);
        this.level++;

        for (let i = 0; i < this.level; i++ ) {
            var randomNumber = Math.floor(Math.random() * 4);
        
            var randomChosenColour = this.buttonColours[randomNumber];
            
            this.gamePattern.push(randomChosenColour);

            this.animationsDelay(randomChosenColour, i);
        }
    },

    animationsDelay: function(color, delay) {

        setTimeout(() => {
            this.flashAnimation(color);
            this.playSound(color)
        }, 500 * delay);

    },

    flashAnimation: function(id) {

        $('#' + id).fadeIn(100).fadeOut(100).fadeIn(100);

    },

    animatePress: function(id) {

        $('#' + id).addClass('pressed');
        setTimeout(() => $('#' + id).removeClass('pressed'), 100);

    },

    playSound: function(name) {

        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
        
    },

    clickHandler: function() {

        $('.btn').on('click', (e) => {
            var userChosenColor = e.target.id;

            this.animatePress(userChosenColor);

            this.playSound(userChosenColor);

            this.userClickedPattern.push(userChosenColor);

            this.chekAnswer(this.userClickedPattern.length - 1);
        })

    },

    chekAnswer: function(currentLevel) {
        if ( this.userClickedPattern[currentLevel] == this.gamePattern[currentLevel]) {
            if (currentLevel + 1 == this.level) {
                this.userClickedPattern = [];
                this.gamePattern = [];
                setTimeout(() => this.nextSequence(), 1000)
            }
        } else {
            this.gameOver();
        }
    },

    init: function() {
        this.gameStart();
    }

}

game.init()