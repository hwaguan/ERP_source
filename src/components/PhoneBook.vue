<template>
    <div class="dailogContainer">
        <div class="pbTitle">分機表</div>
        <div class="pbListContainer">
            <div class="pbListBody">
                <div class="depContainer" v-for="dep in phoneBook">
                    <div class="depName">{{ dep.name }}</div>
                    <div class="depMember">
                        <div class="memCase" v-for="mem in dep.member">
                            <div class="memExt">{{ mem.ext }}</div>
                            <div class="memName">{{ mem.owner }}</div>
                            <div class="memLandLine">{{ mem.landLine }}</div>
                        </div>
                    </div>
                </div>
            </div>
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
        font-size : 15px;
    }

    .depContainer {
        width : calc(100% - 3px);
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

            .memExt,
            .memName,
            .memLandLine {
                padding: 5px 10px;
                text-align: center;
                background: rgb(250, 250, 250);
            }
        }
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

let phoneBook = ref([]);

axios.post("https://localhost:44362/erp/getPhoneBook/", {
    headers: {
    }
}).then(function (response) {
    let queryResult = response.data;
    let phoneBookList = [];
    let noneEmptyDep = [];
    let emptyDep = [];
    let depCode = "";
    let depCount = 0;

    response.data.forEach((element, index) => {
        if (element.dCode != depCode) {
            let addObj = {
                name: element.department,
                member: []
            }

            if (element.extenation != "") addObj.member.push({
                ext: element.extenation,
                owner: element.name + " " + element.title,
                landLine: element.other
            });

            phoneBookList.push(addObj);
            depCode = element.dCode;
            depCount++;
        } else {
            if (element.extenation != "") {
                phoneBookList[depCount - 1].member.push({
                    ext: element.extenation,
                    owner: element.name + " " + element.title,
                    landLine: element.other
                });
            }
        }
    });

    phoneBookList.forEach((dep, index) => {
        if (dep.member.length > 0) {
            noneEmptyDep.push(dep);
        } else {
            emptyDep.push(dep);
        }
    });

    phoneBook.value = noneEmptyDep;
    /*
    console.log(phoneBookList);
    */
})
</script>