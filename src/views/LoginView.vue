<template>
    <div class="login-title">華冠投顧 ERP <span class="version">V2.0</span></div>
    <div id="login-panel" class="login-panel">
        <div class="login-line login-id" title="員工編號">
            <div class="login-line-title">帳　號</div>
            <div class="login-line-body">
                <input type="text" class="id_inp" v-model="login_token.id" maxlength="8" placeholder="請輸入您的員工編號"
                    @focusin="hideIDAlarm">
            </div>
            <div></div>
            <div class="id_alarm hide_alirm">帳號格式不正確</div>
        </div>
        <div class="login-line login-pass" title="登入密碼">
            <div class="login-line-title">密　碼</div>
            <div class="login-line-body">
                <input type="password" class="pass_inp" v-model="login_token.pass" maxlength="20" placeholder="請輸入您的登入密碼"
                    @focusin="hidePassAlarm">
            </div>
            <div></div>
            <div class="pass_alarm hide_alirm">密碼格式不正確</div>
        </div>
        <div class="login-line login-btn">
            <button class="btn btn-sm btn-info btn-login" @click="login">登入</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import swal from "sweetalert2"
import sysAlarm from "@/assets/ts/sysAlarm"

declare let $: any
declare let Swal: any

const login_token = ref(
    {
        id: "",
        pass: "",
    }
);

let login = () => {
    const loginInfo = login_token.value;
    let err_count = 0;
    const alarm = new sysAlarm();

    if (loginInfo.id.replace(" ", "").length == 0) {
        $(".id_alarm").removeClass("hide_alirm");
        err_count++;
    }

    if (loginInfo.pass.replace(" ", "").length == 0) {
        $(".pass_alarm").removeClass("hide_alirm");
        err_count++;
    }

    if (err_count > 0) {
        alarm.miniMessage(-1, "警告!! \r\n輸入資料不完整或格式錯誤!", 1000, true);
    }else{
        axios.post("https://localhost:44362/erp/login/", {
            id: loginInfo.id,
            password: loginInfo.pass
        }, {
            headers: {
            }
        })
            .then(function (response) {
                let queryResult = response.data;
                /*
                swal.fire({
                    icon: "success",
                    title: "登入成功"
                });
                */

                if (queryResult.length > 0) {
                    sessionStorage.clear();

                    sessionStorage.setItem("userInfo", JSON.stringify(queryResult));

                    location.href = 'main';
                } else {
                    let footer = "<a href='#'>忘記密碼?</a>"
                    /*
                swal.fire({
                    icon: "error",
                    title: "登入失敗",
                    text: "請確認您的登入資訊!"
                });
                */
                alarm.centralError("登入失敗", "請確認您的登入資訊!", footer);
                }
            })
            .catch(function (error) {
                swal.fire({
                    icon: "warning",
                    title: "服務器錯誤，請稍候再試"
                });
            })
    }
}

let hideIDAlarm = function () {
    if (!$(".id_alarm").hasClass("hide_alirm")) $(".id_alarm").addClass("hide_alirm");
}

let hidePassAlarm = function () {
    if (!$(".pass_alarm").hasClass("hide_alirm")) $(".pass_alarm").addClass("hide_alirm");
}
</script>

<style scoped lang="scss">
.login-title {
    width: 50vw;
    padding: 60px auto;
    font-weight: bold;
    display: flex;
    justify-content: center;
    font-size: 3em;

    .version {
        padding: 40px 0px 0px 5px;
        font-size: 14px;
        font-weight: bold;
    }
}

.login-panel {
    width: 30vw;
    padding: 30px;
    margin: 150px auto;
    font-size: 1.3em;
    border-radius: 10px;
    box-shadow: 3px 3px 15px rgba(200, 200, 200, .5);
    display: grid;
    grid-template-columns: 100%;
    row-gap: 10px;
    background-image: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="fill : black" viewBox="0 0 55 55" xml:space="preserve"><path fill="rgba(255, 200, 200, .3)" d="M24.3 8.9c0 0-16.7 1.9-14.4 14.4c0 0-0.8 0.8-2.5-1.7c0 0 1 3.4 4.3 5.5c0 0 6.5 11.9-0.5 17.3c0 0 8.7 1.3 7.6-13.2c0 0 1.7 1.3 5.6 0.6c0 0 5 9.3-12.1 13.7c0 0 20.9 4.9 23.3-17.5c0 0 5.3-3.3 6.5-7.7c0 0-1.9 2.1-3 2.1c0 0 2.3-7.3-7.4-10.2c0 0 8.6 6.1 0.4 13.5c0 0-10.3 6.7-15.6-3.6C16.3 22.1 12.6 13.7 24.3 8.9z"/></svg>');
    background-size: 90%;
    background-repeat: no-repeat;
    background-position: -80px -80px;

    .login-line {
        padding: 0px 16px;
        display: grid;
        grid-template-columns: 100px auto;
        justify-content: center;

        .login-line-title {
            letter-spacing: 2px;
            background-color: rgba(200, 200, 200, .5);
            text-align: center;
            border-radius: 999em 0px 0px 999em;
        }

        input[type=text],
        input[type=password] {
            width: 100%;
            padding: 0px 16px;
            border: 1px rgb(200, 200, 200) solid;
            border-radius: 0px 999em 999em 0px;
        }

        input::placeholder {
            font-size: .8em;
            letter-spacing: 1px;
        }

        button {
            font-size: 1.2em;
            box-shadow: 3px 3px 10px rgba(200, 200, 200, .5);
        }

        .id_alarm,
        .pass_alarm {
            padding-right: 16px;
            text-align: right;
            color: rgb(255, 0, 0);
            font-size: .8em;
        }

        .hide_alirm {
            visibility: hidden;
        }
    }
}
</style>