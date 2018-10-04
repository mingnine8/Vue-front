<template>
    <div id="container">
        <div id="userChatt">
            Chatt
        </div>
        <ul>
            <li v-for="(msg, index) in messages" :key="`msg-${index}`">
                <div id="userList">
                    익명
                </div>
                {{msg}}
            </li>
        </ul>
        <input type="text" name="" v-model="message">
        <button @click="sendMessage">전송</button>
    </div>
</template>

<script>
import socket from '../../plugins/socket.io';

export default {
    name: 'Chatt',
    data() {
        return {
            messages: [
                '', '', '환영합니다! 함께 문제를 풀어요!', '', '즐거운 시간 되세요.', ''
            ],
            message: ''
        };
    },
    methods: {
        sendMessage() {
            if (this.message === '' || this.message === ' ') return;
            if(this.message.length > 15) {
                this.message = '15자 미만으로 적어주세요.';
                return;
            }
            socket.emit('message', this.message);
            this.message = '';
        },
        keyupEvent(event) {
            if (event.keyCode === 13) {
                this.sendMessage();
            }
        }
    },
    beforeCreate() {
        socket.on('message', (msg) => {
            if (this.messages.length > 5) this.messages.shift();
            this.messages.push(`${msg}`);
        });
    },
    created() {
        window.addEventListener('keyup', this.keyupEvent);
    }
};
</script>

<style scoped>
#container {
    position: absolute;
    width: 50%;
    border: 1px solid black;
    margin-left: 25%;
}

#userList {
    width: 100%;
    margin-right: 5px;
    padding: 1px;
    background-color: #00B7FF;
    color: white;
    border-right: 3px solid black;
    display: inline;
}

#userChatt {
    width: 100%;
    margin: 5px;
    padding: 5px;
    display: inline;
}

ul{
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    margin: 0px;
    text-align: left;
}
</style>