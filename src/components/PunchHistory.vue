<template>
  <div class="dailogContainer">
    <div class="phTitle">出勤記錄</div>
    <div class="monthPicker">
      <div class="monthPickerField pickerTitle">年份</div>
      <div class="monthPickerField yearPicker">
        <div
          class="monthPickerField"
          :class="{ pickedYear: pickedYear == y, unpickYear: pickedYear != y }"
          v-for="y in yearRange"
          @click="changeYear(y)"
        >
          {{ y }}
        </div>
      </div>
      <div class="monthPickerField pickerTitle">月份</div>
      <div
        class="monthPickerField"
        :class="{ pickedMonth: pickedMonth == m, unpickMonth: pickedMonth != m }"
        v-for="m in 12"
        @click="changeMonth(m)"
      >
        {{ m }}
      </div>
    </div>
    <div class="scheduleTitle">
      <div class="scheduleTitleField">日期</div>
      <div class="scheduleTitleField">班別</div>
      <div class="scheduleTitleField">上班</div>
      <div class="scheduleTitleField">下班</div>
      <div class="scheduleTitleField">出勤狀況</div>
      <div class="scheduleTitleField">請假資料</div>
    </div>
    <div class="scheduleListContainer">
      <div
        class="scheduleListRow"
        v-for="c_date in calendar"
        :title="c_date.s_cate + '\r\n' + c_date.s_desc"
      >
        <div
          class="scheduleListRowContainer"
          :class="{
            'dayoff': c_date.s_dayoff != null,
            'normalDay': c_date.s_dayoff == null && c_date.s_type == 0,
            'holiday': c_date.s_dayoff == null && c_date.s_type == 1,
            'working': c_date.s_dayoff == null && c_date.s_type == 0 && c_date.s_cate == '補行上班日'
          }"
        >
          <div class="scheduleField dateField">{{ c_date.s_date }} ({{ c_date.s_weekdate }})</div>
          <div class="scheduleField shiftType">{{ c_date.s_type == 1 ? c_date.s_cate.replace('放假之', '') : c_date.s_cate == '補行上班日' ? '補班 - ' + c_date.s_shifttype : c_date.s_shifttype}}</div>
          <div class="scheduleField onduty" :class="{'attError' : c_date.s_onduty > c_date.s_shiftstart}">
            {{ c_date.s_type == 1 ? '--:--:--' : c_date.s_onduty }}
          </div>
          <div class="scheduleField offduty" :class="{'attError' : c_date.s_offduty < c_date.s_shiftend}">
            {{ c_date.s_type == 1 ? '--:--:--' : c_date.s_offduty }}
          </div>
          <div class="scheduleField dutyStatus">{{ c_date.s_type == 1 ? '無需出勤' : '' }}</div>
          <div class="scheduleField" :title="c_date.s_dayoff != null ?  c_date.s_dayoff.reason : ''">
            <div v-if="c_date.s_dayoff != null" v-for="dfo in c_date.s_dayoff" :class="{'dayoff-sick' : dfo.type == '病假'}">
              <i class="bi bi-capsule-pill" v-if="dfo.type == '病假'" style="margin : 0px 5px;"></i>
              <i class="bi bi-calendar2-week" v-if="dfo.type != '病假'" style="margin : 0px 5px;"></i> {{ dfo.type + " - " + (dfo.days > 0 ? 1 : 0) + " 天 - " + dfo.hours + " 時 ( " + dfo.reason + " )" }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.phTitle {
  padding-bottom: 15px;
  font-size: 1.5em;
  border-bottom: 2px rgb(220, 220, 220) solid;
}

.monthPicker {
  display: grid;
  grid-template-columns: 100px auto 100px calc((50% - 100px) / 12) calc((50% - 100px) / 12) calc(
      (50% - 100px) / 12
    ) calc((50% - 100px) / 12) calc((50% - 100px) / 12) calc((50% - 100px) / 12) calc(
      (50% - 100px) / 12
    ) calc((50% - 100px) / 12) calc((50% - 100px) / 12) calc((50% - 100px) / 12) calc(
      (50% - 100px) / 12
    ) calc((50% - 100px) / 12);

  .pickerTitle {
    background-color: rgb(220, 220, 220);
  }

  .yearPicker {
    display: grid;
    grid-template-columns: auto auto auto;
    column-gap: 2px;
  }

  .monthPickerField {
    text-align: center;
  }

  .unpickYear:hover,
  .unpickMonth:hover {
    /*background-color: rgba(255, 144, 16, 0.3);*/
    background-color: rgba(150, 170, 255, 0.1);
    border-radius: 999em;
    cursor: pointer;
  }

  .pickedYear,
  .pickedMonth {
    background-color: rgb(50, 70, 255);
    color: rgb(255, 255, 255);
    font-weight: bold;
    border-radius: 999em;
  }
}

.scheduleTitle,
.scheduleListRowContainer {
  display: grid;
  grid-template-columns: 200px 120px 100px 100px 100px auto;
  column-gap: 1px;
}

.scheduleTitle {
  .scheduleTitleField {
    padding: 3px 0px;
    text-align: center;
    background-color: rgb(240, 240, 240);
  }
}

.scheduleListContainer {
  height: 70vh;
  overflow-y: auto;

  .scheduleListRow {
    border-top: 1px rgba(240, 240, 240, 1) solid;
    border-bottom: 1px rgba(240, 240, 240, 1) solid;
    border-left: 2px rgba(240, 240, 240, 1) solid;
    border-right: 2px rgba(240, 240, 240, 1) solid;

    .dayoff {
      background-color: rgba(0, 185, 0, 0.2);
    }
    .dayoff-sick {
      /*background-color: rgba(255, 230, 0, 0.2);*/
      background-color: rgba(255, 0, 0, 0.1);
    }

    .normalDay {
      background-color: rgba(240, 240, 240, 0.2);
    }

    .holiday {
      background-color: rgba(100, 100, 100, 0.2);
    }

    .working {
      background-color: rgba(0, 0, 255, 0.2);
    }

    .attError{
        font-weight : bold;
        color : rgb(255, 0, 0);
    }

    .scheduleListRowContainer {
      grid-template-columns: 198px 120px 100px 100px 100px auto;

      .scheduleField {
        padding: 3px 6px;
        background-color: rgba(255, 255, 255, 0.5);
      }

      .dateField,
      .shiftType,
      .onduty,
      .offduty,
      .dutyStatus {
        text-align: center;
      }
    }
  }

  .scheduleListRow:hover {
    border-top: 1px rgba(220, 220, 220, 1) solid;
    border-bottom: 1px rgba(220, 220, 220, 1) solid;
    border-left: 2px rgba(220, 220, 220, 1) solid;
    border-right: 2px rgba(220, 220, 220, 1) solid;
    background-color: rgba(220, 220, 220, 0.5);
  }
}
</style>

<script setup lang="ts">
import { sysConfig } from '@/stores/sysConfig'
const config = sysConfig()
import { ref } from 'vue'
import axios from 'axios'
import decryptor from '@/assets/ts/tokenDecryptor'

const today = new Date()
const dec = new decryptor()
let calendar = ref<any>()
let yearRange = ref([today.getFullYear(), today.getFullYear() - 1, today.getFullYear() - 2])
let pickedYear = ref(today.getFullYear())
let pickedMonth = ref(today.getMonth() + 1)
const userInfo = JSON.parse(sessionStorage.getItem('userInfo') + '')[0]

let getCalendar = async (c_year, c_month) => {
  console.log('getCalendar ===> ')
  await axios.post(config.tokenPath).then(async function (response) {
    let token = dec.decryptToken(response.data.message)

    await axios
      .post(
        config.calendarPath,
        {
          year: c_year,
          month: c_month,
          empno: userInfo.no,
          requestToken: token
        },
        {
          headers: {}
        }
      )
      .then(function (response) {
        response.data.forEach((day) => {
          if(day.s_dayoff != null){
            day.s_dayoff = JSON.parse(day.s_dayoff);
          }
        })
        console.log(response.data)
        calendar.value = response.data
      })
  })
}

getCalendar(today.getFullYear(), today.getMonth() + 1)

let changeYear = (year) => {
  if (pickedYear.value != year) {
    getCalendar(year, pickedMonth.value)
    pickedYear.value = year
  }
}

let changeMonth = (month) => {
  if (pickedMonth.value != month) {
    getCalendar(pickedYear.value, month)
    pickedMonth.value = month
  }
}
</script>
