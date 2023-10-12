import {defineStore} from 'pinia'
const LocalAPIPath = "https://localhost:44362/erp/"

export const sysConfig = defineStore({
    id : "sysConfig",
    state : () => ({
        loginPath : LocalAPIPath + "login",
        tokenPath : LocalAPIPath + "getTransferToken",
        menuPath : LocalAPIPath + "getSideMenu",
        phoneBookPath : LocalAPIPath + "getPhoneBook",
        calendarPath : LocalAPIPath + "getMonthlyCalendar"
    })
})