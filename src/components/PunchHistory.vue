<template>
    <div class="dailogContainer">
        <div class="phTitle">出勤記錄</div>
    </div>
</template>

<style scoped lang="scss">
.phTitle {
    padding-bottom: 15px;
    font-size: 1.5em;
    border-bottom: 2px rgb(220, 220, 220) solid;
}
</style>

<script setup lang="ts">
import { sysConfig } from "@/stores/sysConfig"
const config = sysConfig()
import { ref } from 'vue'
import axios from 'axios'
import decryptor from "@/assets/ts/tokenDecryptor"

const dec = new decryptor();
let calendar = ref<any>();
const today = new Date();

let getCalendar = async () => {
    console.log("getCalendar ===> ");
    await axios.post(config.tokenPath).then(async function (response) {
        let token = dec.decryptToken(response.data.message);

        await axios.post(config.calendarPath, {
            year : today.getFullYear(),
            month : today.getMonth() + 1,
            requestToken: token,
        },{
            headers: {
            }
        }).then(function (response) {
            console.log(response.data);
            calendar.value = response.data;
        })
    })
}

getCalendar();
</script>