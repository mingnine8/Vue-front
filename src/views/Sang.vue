<template>
    <div>
        <h3>랜덤 OX 퀴즈 게임 <button @click="getQuiz">퀴즈 바꾸기</button></h3>
        <div id="socketData">
            <h1> :: {{quiz}} :: </h1>
            <div id="trueOrFalse"></div>
        </div>
        <div class="backback">
            <div class="back">
                <div class="button_base b05_3d_roll" id="trueButton" @click="isAnswer(1)">
                    <div>True!</div>
                    <div>O</div>
                </div>
            </div>
            <div class="back" >
                <div class="button_base b05_3d_roll" id="falseButton" @click="isAnswer(0)">
                    <div>False!</div>
                    <div>X</div>
                </div>
            </div>
        </div>
        <h3></h3>
        <Chatt></Chatt>
    </div>
</template>

<script>
import Chatt from '../components/sang/Chatt';
import socket from '../plugins/socket.io';

export default {
    name: 'Sang',
    components: {
        Chatt
    },
    data() {
        return {
            quiz: `물고기는 색을 구분할 수 있다`,
            quizAns: 1,
            description: `물고기는 신호등 정도의 색을 구별할 수 있습니다!`
        };
    },
    methods: {
        isAnswer (ans) {
            let node = document.getElementById('trueOrFalse');
            document.getElementById('trueButton').style.visibility = 'hidden';
            document.getElementById('falseButton').style.visibility = 'hidden';
            if(ans === this.quizAns) {
                node.innerHTML = `<h2>정답입니다!</h2><h3>${this.description}</h3>`;
            }
            else {
                node.innerHTML = `<h2>틀렸습니다!</h2><h3>${this.description}</h3>`;
            }
        },
        async getQuiz () {
            document.getElementById('trueOrFalse').innerHTML = '';
            document.getElementById('trueButton').style.visibility = 'visible';
            document.getElementById('falseButton').style.visibility = 'visible';

            // TODO
            // fetch DB (await)
            // get Query `quiz` and `quizAns`
        }
    },
    beforeUpdate () {
        this.getQuiz();
    },
    beforeMount() {
        if(socket.disconnected === true) socket.connect();
        socket.emit('join');
    },
    beforeDestroy() {
        // 소켓해제 안해줘도 되는지? 직접 해제하게 될 경우 메모리 릭 경고
        // https://mcculloughwebservices.com/2016/10/30/possible-eventemitter-memory-leak-detected/
        socket.disconnect();
        //socket.emit('disconnect');
    },

};
</script>

<style scoped>
h1{
    text-decoration-line: underline;
}
#socketData {
    margin-top: 5%;
}
.backback {
    width: 100%;
    padding: 5%;
    margin-left: 25%;
}

.back {
    width: 20%;
    height: 0px;
    float: left;
    background-color: #eeeeee;
    border: 10px;
    border-color: #ffffff;
    border-style: solid;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    padding: 0px 5px 5px 5px;
}

.back:before {
    padding: 10px;
}

.button_base {
    margin: 0;
    border: 0;
    font-size: 18px;
    position: relative;
    top: 50%;
    left: 50%;
    margin-top: -25px;
    margin-left: -100px;
    width: 200px;
    height: 50px;
    text-align: center;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-user-select: none;
    cursor: default;
}

.button_base:hover {
    cursor: pointer;
}

.b05_3d_roll {
    perspective: 500px;
    -webkit-perspective: 500px;
    -moz-perspective: 500px;
}

.b05_3d_roll div {
    position: absolute;
    text-align: center;
    width: 100%;
    height: 50px;
    padding: 10px;
    border: #000000 solid 1px;
    pointer-events: none;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}

.b05_3d_roll div:nth-child(1) {
    color: #000000;
    background-color: #000000;
    transform: rotateX(90deg);
    -webkit-transform: rotateX(90deg);
    -moz-transform: rotateX(90deg);
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    transform-origin: 50% 50% -25px;
    -webkit-transform-origin: 50% 50% -25px;
    -moz-transform-origin: 50% 50% -25px;
}

.b05_3d_roll div:nth-child(2) {
    color: #000000;
    background-color: #ffffff;
    transform: rotateX(0deg);
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    transform-origin: 50% 50% -25px;
    -webkit-transform-origin: 50% 50% -25px;
    -moz-transform-origin: 50% 50% -25px;
}

.b05_3d_roll:hover div:nth-child(1) {
    color: #ffffff;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    transform: rotateX(0deg);
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
}

.b05_3d_roll:hover div:nth-child(2) {
    background-color: #000000;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    transform: rotateX(-90deg);
    -webkit-transform: rotateX(-90deg);
    -moz-transform: rotateX(-90deg);
}
</style>