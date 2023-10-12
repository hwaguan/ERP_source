<template>
    <div class="headerFrame">
        <div class="headerLogo">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" style=""
                viewBox="0 0 55 55" xml:space="preserve">
                <path fill="rgb(255, 100, 100)"
                    d="M24.3 8.9c0 0-16.7 1.9-14.4 14.4c0 0-0.8 0.8-2.5-1.7c0 0 1 3.4 4.3 5.5c0 0 6.5 11.9-0.5 17.3c0 0 8.7 1.3 7.6-13.2c0 0 1.7 1.3 5.6 0.6c0 0 5 9.3-12.1 13.7c0 0 20.9 4.9 23.3-17.5c0 0 5.3-3.3 6.5-7.7c0 0-1.9 2.1-3 2.1c0 0 2.3-7.3-7.4-10.2c0 0 8.6 6.1 0.4 13.5c0 0-10.3 6.7-15.6-3.6C16.3 22.1 12.6 13.7 24.3 8.9z" />
            </svg>
            <span class="coName">華冠投顧</span>
            <span class="sysName animated_rainbow_1">ERP</span>
            <span class="sysVersion">V2.0</span>
        </div>
        <div class="headerNav"></div>
        <div class="headerInfo">
            <div class="logOut" title="登出" @click.stop="logout"></div>
            <label class="employeeID">員編 : <span>{{ user.no }}</span></label>
            <label class="employeeName">姓名 : <span class="empName" data-bs-toggle="modal" data-bs-target="#sysDailog" @click.stop="showDailog('checkHist')">{{
                user.name }}</span></label>
            <label class="employeeDEP">部門 : <span>{{ user.department }}</span></label>
            <div class="phoneBook" title="電話表" data-bs-toggle="modal" data-bs-target="#sysDailog" @click.stop="showDailog('phoneBook')"></div>
        </div>
    </div>
    <dailog :dailogType="dailog_type" :sc="showCount" />
</template>

<style scoped lang="scss">
.headerFrame {
    display: grid;
    align-items: center;
    grid-template-columns: auto auto auto;
    background-color: rgb(231, 235, 241);

    .headerLogo {
        padding-left: 30px;
        font-size: 24px;

        .coName {
            color: rgb(17, 96, 185);
            font-weight: bold;
        }

        .sysName {
            margin-left: 10px;
        }

        .sysVersion {
            margin-left: 10px;
            font-size: 12px;
        }

        .animated_rainbow_1 {
            font-size: 24px;
            font-family: Arial Black, Gadget, sans-serif;
            background-image: -webkit-linear-gradient(left, #f00, #ff2b00, #f50, #ff8000, #fa0, #ffd500, #ff0, #d4ff00, #af0, #80ff00, #5f0, #2bff00, #0f0, #00ff2a, #0f5, #00ff80, #0fa, #00ffd5, #0ff, #00d5ff, #0af, #0080ff, #05f, #002aff, #00f, #2b00ff, #50f, #8000ff, #a0f, #d400ff, #f0f, #ff00d4, #f0a, #ff0080, #f05, #ff002b, #f00);
            -webkit-animation: animatedBackground_a 5s linear infinite alternate;
            -webkit-background-clip: text;
            -webkit-text-fill-color: #0000;
            background-clip: text;
        }

        @keyframes animatedBackground_a {
            0% {
                background-position: 0 0
            }

            100% {
                background-position: -500px 0
            }
        }
    }

    .headerInfo {
        padding-right: 20px;
        text-align: right;

        .phoneBook {
            width: 20px;
            height: 20px;
            margin-left: 20px;
            margin-bottom: -5px;
            background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" height="10px" style="" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>') 5px 5px, linear-gradient(45deg, rgb(0, 190, 10) 0 10%, rgb(200, 255, 203) 40% 60%, rgb(0, 190, 10) 90% 100%);
            background-repeat: no-repeat;
            border-radius: 5px;
            box-shadow: 1px 1px 5px rgba(20, 20, 20, .5);
            display: inline-block;
            cursor: pointer;
        }

        .phoneBook:hover {
            background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" height="10px" style="" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>') 5px 5px, linear-gradient(45deg, rgb(190, 170, 0) 0 10%, rgb(255, 247, 172) 40% 60%, rgb(190, 170, 0) 90% 100%);
            background-repeat: no-repeat;
        }

        .logOut {
            width: 20px;
            height: 20px;
            margin-left: 20px;
            margin-bottom: -5px;
            background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>');
            background-repeat: no-repeat;
            border-radius: 5px;
            display: inline-block;
            cursor: pointer;
        }

        .logOut:hover {
            background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" style="fill : rgba(255, 0, 0, .5)" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>');
            background-repeat: no-repeat;
        }
    }

    .employeeID,
    .employeeName,
    .employeeDEP {
        padding-left: 16px;
        letter-spacing: 1px;
    }

    .empName {
        color: rgb(20, 130, 255);
        font-weight: bold;
        cursor: pointer;
    }
}

.signLog {
    margin-top: 50px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import dailog from '@/components/SysDailog.vue'
import sysAlarm from '@/assets/ts/sysAlarm';
import swal from 'sweetalert2'
declare let $: any

if(sessionStorage.getItem("userInfo") === null)location.href = "/";

const userInfo = JSON.parse(sessionStorage.getItem("userInfo") + "")[0];
console.log(userInfo);
const user = ref(userInfo);
const alarm = new sysAlarm();
const now = new Date();
const greeting = now.getHours() < 11 ? "早安" : now.getHours() > 13 ? "日安" : now.getHours() > 18 ? "晚安" : "日安";
let dailog_type = ""
let lastDailog = ""
let showCount = ref(0);

alarm.miniMessage(1, greeting + "! " + userInfo.name + " " + userInfo.title + " 您好!", 2000);

const logout = () => {

    swal.fire(
        {
            icon: 'question',
            title: "您確定要登出嗎",
            text: "你要確定都沒有工作要處理了嘿!!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '碓定',
            cancelButtonText: '放棄'
        }
    ).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.clear();
            location.href = "/";
        }
    })
}

const showDailog = ((DT : string) => {
    dailog_type = DT;
    lastDailog = DT;
    showCount.value++;
})

$(() => {
});
</script>