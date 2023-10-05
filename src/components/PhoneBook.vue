<template>
    <div class="dailogContainer">
        <div class="pbTitle">分機表</div>
        <div class="pbListContainer">
            <div class="pbListBody">
                <div class="depContainer" v-for="dep in phoneBook">
                    <div class="depName">{{ dep.dep }}</div>
                    <div class="depMember">
                        <div class="memCase" v-for="mem in dep.member">
                            <div class="memExt">{{ mem.ext }}</div>
                            <div class="memName">{{ mem.name }}</div>
                            <div class="memLandLine">{{ mem.land_Line }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="otherLines">
                <div class="listTitle">單位</div>
                <div class="listTitle">代表號</div>
                <div class="listTitle">節費電話</div>
                <div class="listTitle">傳真1</div>
                <div class="listTitle">傳真2</div>
                <div class="listField">營運事業部</div>
                <div class="listField">
                    <div class="fieldList">
                        <div>營1 : 6630-3201</div>
                        <div>營2 : 6630-3237</div>
                        <div>營 : 36630-3211</div>
                        <div>營4 : 6630-3221</div>
                        <div>營5 : 6632-1003</div>
                        <div>特2 : 6630-3223</div>
                    </div>
                </div>
                <div class="listField">6630-3203</div>
                <div class="listField">6630-3218<br>2356-0370</div>
                <div class="listField">6630-3219</div>
                <div class="listField">財富管理部</div>
                <div class="listField">
                    <div class="fieldList">
                        <div>財1 : 6630-3231</div>
                        <div>財3 : 6630-3257</div>
                    </div>
                </div>
                <div class="listField">6630-3229</div>
                <div class="listField">3393-2040</div>
                <div class="listField">6630-3245</div>
                <div class="listField">投資推廣部</div>
                <div class="listField">6630-3266</div>
                <div class="listField">免費 : 080-900-8118<br>取授權 : 0800-069-119</div>
                <div class="listField">2397-3938</div>
                <div class="listField"></div>
                <div class="listField">網路事業部</div>
                <div class="listField">6632-1000</div>
                <div class="listField">6632-1099</div>
                <div class="listField">6632-1068</div>
                <div class="listField"></div>
                <div class="listField">新生辦公室</div>
                <div class="listField">6605-0638</div>
                <div class="listField"></div>
                <div class="listField"></div>
                <div class="listField"></div>
            </div>
            <div class="employees"><span class="empNo">{{ empCount }}</span></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.pbTitle {
    padding-bottom: 15px;
    font-size: 1.5em;
    border-bottom: 2px rgb(220, 220, 220) solid;
}

.pbListContainer {
    height: 70vh;
    overflow: auto;

    .pbListBody {
        /*
        display: grid;
        grid-template-columns: 20% auto;
        justify-content: space-between;
        */
        font-size: 15px;
    }

    .depContainer {
        width: calc(100% - 3px);
        display: grid;
        grid-template-columns: 200px auto;
        background: rgb(240, 240, 240);
        border-bottom: 1px rgb(200, 200, 200) solid;

        .depName {
            padding: 5px 10px;
            text-align: center;
            background: rgb(220, 220, 220);
        }

        .depMember {
            display: grid;
            grid-template-columns: 25% 25% 25% 25%;
            column-gap: 1px;
            row-gap: 1px;
        }

        .memCase {
            display: grid;
            grid-template-columns: 50px auto 100px;
                background: rgb(250, 250, 250);

            .memExt,
            .memName,
            .memLandLine {
                padding: 5px 10px;
                text-align: center;
            }

            .memExt {
                color: rgb(0, 89, 255);
                font-weight: bold;
            }
        }

        .memCase:hover{
            background-color : rgba(0, 89, 255, .1);
        }
    }

    .otherLines {
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        column-gap: 1px;
        row-gap: 1px;
        background-color: rgb(220, 220, 220);

        .listTitle,
        .listField {
            padding: 3px;
            text-align: center;
        }

        .listField {
            background-color: rgb(250, 250, 250);

            .fieldList {
                display: grid;
                grid-template-columns: 50% 50%;
                text-align: center;
            }
        }
    }

    .employees {
        padding: 5px;
        background-color: rgb(220, 220, 220);
        text-align: center;

        .empNo {
            color: rgb(0, 89, 255);
            font-weight: bold;
        }

        .empNo::before {
            content: '在職人數 : ';
            color: rgb(0, 0, 0);
        }

        .empNo::after {
            content: ' 人';
            color: rgb(0, 0, 0);
        }
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

let phoneBook = ref([]);
let empCount = ref(0);

axios.post("https://localhost:44362/erp/getPhoneBook/", {
    headers: {
    }
}).then(function (response) {
    console.log(response.data);
    phoneBook.value = response.data.list;
    empCount.value = response.data.members;
})
</script>