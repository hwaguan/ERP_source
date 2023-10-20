<template>
  <div class="mainBlock">
    <div class="blockTitle">業績排行榜</div>
    <div class="reportContainer">
      <div class="fastSearch">
        <div class="pr_fs">業績速查</div>
        <div class="pr_title">年份</div>
        <div class="yearOptions">
          <div
            v-for="yearOpt in yearList"
            class="optItem"
            :class="{ pr_pickedYear: reportYear == yearOpt }"
            @click="changePRYear(yearOpt)"
          >
            {{ yearOpt }}
          </div>
        </div>
        <div class="pr_title">月份</div>
        <div class="monthOptions">
          <div
            v-for="monthOpt in monthList"
            class="optItem"
            :class="{ pr_pickedMonth: reportMonth == monthOpt }"
            @click="changePRMonth(monthOpt)"
          >
            {{ monthOpt }}
          </div>
        </div>
      </div>
      <div class="reportTitle">
        <div>排名</div>
        <div>業務人員</div>
        <div>業績總數</div>
      </div>
      <div class="reportList" v-for="(report, index) in reportObj[reportYear][reportMonth]">
        <div class="reportListRow">
          <div>{{ index > 0 ? index + 1 : '' }}</div>
          <div>{{ report.name }}</div>
          <div class="reportPerformance">{{ USDollar.format(report.performance) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blockTitle {
  padding: 10px 15px;
  font-size: 1.2em;
  font-weight: 500;
  letter-spacing: 2px;
}
.reportContainer {
  padding: 10px 20px;

  .reportTitle,
  .reportListRow {
    display: grid;
    grid-template-columns: 20% 40% auto;
    column-gap: 1px;
    row-gap: 1px;
  }

  .reportListRow:hover{
    background-color : rgba(0, 114, 220, 0.1);
  }

  .reportTitle div,
  .reportListRow div {
    padding: 2px 5px;
    letter-spacing: 1px;
    text-align: center;
  }

  .reportTitle div {
    background-color: rgb(220, 220, 220);
  }

  .reportList:nth-child(even) {
    background-color: rgba(220, 220, 220, 0.3);
  }

  .reportPerformance {
    text-align: right !important;
  }

  .fastSearch {
    display: grid;
    grid-template-columns: 120px 50px 100px 50px auto;

    .pr_fs {
      color: rgb(255, 255, 255);
      letter-spacing: 2px;
      background-color: rgba(39, 1, 255, 0.5);
    }

    .pr_title {
      background-color: rgb(220, 220, 220);
    }

    div {
      text-align: center;
    }

    .yearOptions {
      display: grid;
      grid-template-columns: 50% 50%;
      column-gap: 1px;
    }

    .optItem {
      border-bottom: 2px rgb(255, 255, 255) solid;
      cursor: pointer;
    }

    .optItem:hover {
      border-bottom: 2px rgb(220, 220, 220) solid;
    }

    .pr_pickedYear,
    .pr_pickedMonth {
      color: rgb(39, 1, 255);
      font-weight: bold;
      border-bottom: 2px rgb(39, 1, 255) solid;
    }

    .monthOptions {
      width: calc(100% - 11px);
      display: grid;
      grid-template-columns:
        calc(100% / 12) calc(100% / 12) calc(100% / 12) calc(100% / 12) calc(100% / 12)
        calc(100% / 12) calc(100% / 12) calc(100% / 12) calc(100% / 12) calc(100% / 12) calc(
          100% / 12
        )
        calc(100% / 12);
      column-gap: 1px;
    }
  }
}
</style>

<script setup lang="ts">
import { sysConfig } from '@/stores/sysConfig'
const config = sysConfig()
import { ref } from 'vue'
import axios from 'axios'
import decryptor from '@/assets/ts/tokenDecryptor'

const dec = new decryptor()
const now = new Date()
const yearList = [now.getFullYear(), now.getFullYear() - 1]
const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const reportObj = ref<any>([])
let reportList = ref<any>()
let reportYear = ref(now.getFullYear())
let reportMonth = ref(now.getMonth() + 1)

for (let i = now.getFullYear(); i >= now.getFullYear() - 1; i--) {
  reportObj.value[i] = <any>[]
  for (let j = 1; j <= 12; j++) {
    reportObj.value[i][j] = <any>[]
  }
}

let USDollar = ref(
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
)

const getReport = async () => {
  if (reportObj.value[reportYear.value][reportMonth.value].length == 0) {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') + '')[0]

    await axios.post(config.tokenPath).then(async function (response) {
      let token = dec.decryptToken(response.data.message)

      await axios
        .post(
          config.performanceReportPath,
          {
            year: reportYear.value,
            month: reportMonth.value,
            comid: userInfo.cCode,
            depid: userInfo.dCode,
            empNo: userInfo.no,
            requestToken: token
          },
          {
            headers: {}
          }
        )
        .then(function (response) {
          reportObj.value[reportYear.value][reportMonth.value] = response.data
          //console.log(reportObj.value);
        })
    })
  }
}

getReport()

let changePRYear = (year) => {
  if (year != reportYear.value) {
    reportYear.value = year
    getReport()
  }
}

let changePRMonth = (month) => {
  if (month != reportMonth.value) {
    reportMonth.value = month
    getReport()
  }
}
</script>
