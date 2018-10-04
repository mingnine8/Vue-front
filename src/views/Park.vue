<template>
    <canvas ref="ball"></canvas>
</template>
<style>
    canvas {
        width: 480px;
        height: 320px;
        background: #eee;
    }
</style>

<script>
export default {
    data () {
        return {
            canvas: null,
            ctx: null,
                ball: {
                ballRadius: 10,
                x: 0,
                y: 0,
                dx: 2,
                dy: 2,
            },
            paddle: {
                width: 0,
                height: 0,
                x: 0,
            },
            paddleAction: {
                leftPressed: false,
                rightPressed: false,
            },
            brickSpec: {
                brickRowCount: 3,
                    brickColumnCount: 5,
                    brickWidth: 75,
                    brickHeight: 20,
                    brickPadding: 10,
                    brickOffsetTop: 30,
                    brickOffsetLeft: 30,
            },
            bricks: [],
            score: 0,
            live: 3,            
        };
    },
    created () {
        /* TODO 마우스로 움직이는 기능 추가 */    
        window.addEventListener('keydown',(event) => {
            let move = event.keyCode;
                if (move === 37) {
            this.paddleAction.leftPressed = true;
            } else {
            this.paddleAction.rightPressed = true;
            }
        },false);
        
        window.addEventListener('keyup',(event) => {
            let move = event.keyCode;
        if (move === 37) {
            this.paddleAction.leftPressed = false;
            } else {
            this.paddleAction.rightPressed = false;
            }
        }, false);
        
        this.initBricks();

    },
    mounted () {
        /* 초기값 설정 */
        this.canvas = this.$refs.ball; 
        this.ctx = this.$refs.ball.getContext('2d');
        /* init ball */
        this.ball.x = this.canvas.width/2;
        this.ball.y = this.canvas.height - 30;
        /* init paddle */
        this.paddle.width = 75;
        this.paddle.height = 10;
        this.paddle.x = (this.canvas.width-this.paddle.width)/2;
        
        this.draw();
    },
    methods: {
        drawBall () {
        this.ctx.beginPath();
            this.ctx.arc(this.ball.x, this.ball.y, this.ball.ballRadius, 0, Math.PI*2);
            this.ctx.fillStyle = "#0095DD";
            this.ctx.fill();
            this.ctx.closePath();
        },
        drawPaddle () {
            this.ctx.beginPath();
            this.ctx.rect(this.paddle.x, this.canvas.height-this.paddle.height, this.paddle.width, this.paddle.height);
            this.ctx.fillStyle = "#0095DD";
            this.ctx.fill();
            this.ctx.closePath();
        },
        drawBricks () {
            for(let c = 0; c < this.brickSpec.brickColumnCount; c++) {

                for(let r = 0; r < this.brickSpec.brickRowCount; r++) {

                let brickX = (c*(this.brickSpec.brickWidth+this.brickSpec.brickPadding))+this.brickSpec.brickOffsetLeft;
                let brickY = (r*(this.brickSpec.brickHeight+this.brickSpec.brickPadding))+this.brickSpec.brickOffsetTop;
                
                    if (this.bricks[c][r].status === 1) {
                        this.bricks[c][r].x = brickX;
                        this.bricks[c][r].y = brickY;
                        this.ctx.beginPath();
                        this.ctx.rect(brickX, brickY, this.brickSpec.brickWidth, this.brickSpec.brickHeight);
                        this.ctx.fillStyle = "#0095DD";
                        this.ctx.fill();
                        this.ctx.closePath();        
                    }
                }
            }
        },
        draw () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawScore();
            this.drawBall();
            this.drawPaddle();
            this.drawBricks();
            this.collisionDetection();
            /* 공이 화면에 끝에 닿을시 */
            if (this.ball.x + this.ball.dx < this.ball.ballRadius || this.ball.x + this.ball.dx > this.canvas.width - this.ball.ballRadius) {
                this.ball.dx = -this.ball.dx;
            }
            
            if (this.ball.y + this.ball.dy < this.ball.ballRadius) {
                this.ball.dy = -this.ball.dy;
            } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.ballRadius) {

                if (this.paddle.x < this.ball.x && this.ball.x < this.paddle.x + this.paddle.width) {
                    this.ball.dy = -this.ball.dy;
                } else {
                    this.live--;

                    if(!this.live) {
                        alert("GAME OVER");
                        document.location.reload();
                    }	else {
                        this.ball.x = this.canvas.width/2;
                        this.ball.y = this.canvas.height-30;
                        this.ball.dx = 2;
                        this.ball.dy = -2;
                        this.paddle.x = (this.canvas.width-this.paddle.width)/2;
                    }
                }
            }
            /* 패들이 움직일때 */
            if (this.paddleAction.leftPressed && this.paddle.x > 0) {
                this.paddle.x -= 7;
            } else if (this.paddleAction.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
                this.paddle.x += 7;
            }
            
            this.ball.x += this.ball.dx;
                this.ball.y += this.ball.dy;
            
            requestAnimationFrame(this.draw);
        },
        initBricks () {
            for(let c = 0; c < this.brickSpec.brickColumnCount; c++) {
                this.bricks[c] = [];
                for(let r = 0; r < this.brickSpec.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }
        },
        collisionDetection () {

            for(let c=0; c<this.brickSpec.brickColumnCount; c++) {
                
                for(let r=0; r<this.brickSpec.brickRowCount; r++) {
                    
                    let b = this.bricks[c][r];
                    
                    if (b.status === 1) {
                        if(this.ball.x > b.x && this.ball.x < b.x+this.brickSpec.brickWidth && this.ball.y > b.y && this.ball.y < b.y+this.brickSpec.brickHeight) {
                        b.status = 0;
                        this.score++;
                        this.ball.dy = -this.ball.dy;
                        }              
                    }
                }
            }
        },
        drawScore ()  {
            this.ctx.font = "16px Arial";
            this.ctx.fillStyle = "#0095DD";
            this.ctx.fillText("Score: "+this.score, 8, 20);
        },
        drawLive () {
            this.ctx.font = "16px Arial";
                this.ctx.fillStyle = "#0095DD";
                this.ctx.fillText("Lives: "+ this.lives, this.canvas.width-65, 20);
        }
    },
    computed: {
    },
    beforeMount () {
        this.initBricks();
    },
};
</script>