<template>
    <div class="menuContainer">
        <div class="menuTray">
            <ul class="menuList">
                <li v-for="menu in menuList"
                    :class="{ 'hideItem': !menu.show, 'menuItem': menu.subMenu.length == 0, 'menuCase': menu.subMenu.length > 0 }"
                    @="menu.subMenu.length > 0 ? { 'click': openFolder } : {}">
                    <i class="bi-folder"></i>
                    {{ menu.menuText }}
                    <ul v-if="menu.subMenu.length > 0" class="collapsed firstLevel">
                        <li v-for="menu1 in menu.subMenu" class="midLevel"
                            :class="{ 'hideItem': !menu1.show, 'menuItem': menu1.subMenu.length == 0, 'menuCase': menu1.subMenu.length > 0 }"
                            @="menu1.subMenu.length > 0 && menu1.menuLink != '#' ? { 'mouseenter': openFolder, 'mouseleave': openFolder } : menu1.menuLink == '#' ? { 'click.once': openFolder } : {}">
                            <i class="bi bi-hdd" v-if="menu1.subMenu.length == 0"></i>
                            <i class="bi bi-folder" v-if="menu1.subMenu.length > 0 && menu1.menuLink == '#'"></i>
                            <i class="bi bi-hdd-stack" v-if="menu1.subMenu.length > 0 && menu1.menuLink != '#'"></i>
                            {{ menu1.menuText }}
                            <ul v-if="menu1.subMenu.length > 0" class="collapsed"
                                :class="{ 'finalLevel': menu1.subMenu.length > 0 && menu1.menuLink != '#' }">
                                <li v-for="menu2 in menu1.subMenu"
                                    :class="{ 'hideItem': !menu2.show, 'menuItem': menu2.subMenu.length == 0, 'menuCase': menu2.subMenu.length > 0 }"
                                    @="menu2.subMenu.length > 0 ? { 'click.once': openFolder } : {}">
                                    <i class="bi bi-hdd"></i>
                                    {{ menu2.menuText }}
                                    <ul v-if="menu2.subMenu.length > 0" class="collapsed">
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<style sfoped lang="scss">
.menuContainer {
    padding: 10px;

    .menuTray {
        padding: 10px;
        background-color: rgba(255, 255, 255, .5);
        backdrop-filter: blur(18px);
        border: 1px rgb(200, 200, 200) solid;
        border-radius: 5px;
        position: sticky;

        svg {
            margin-top: -5px;
        }

        ul {
            padding-left: 20px;
            list-style-type: none;
        }

        .finalLevel {
            padding-left: 0px;

            li {
                padding: 2px 0px !important;
            }
        }

        .menuList {
            font-size: 1.1em;

            li {
                padding: 2px;
            }

            .menuItem,
            .menuCase {
                background-repeat: no-repeat;
                background-position: 0px 5px;
                transition: all .3s ease-in-out;
                cursor: pointer;
            }

            .menuCase ul {
                overflow: hidden;
                max-height: 100vh;
                transition: all .3s ease-in-out;
            }

            .menuCase:hover,
            .menuItem:hover {
                background-size: auto, 200% 24px;
            }

            .menuItem {}

            .hideItem {
                display: none;
            }

            .collapsed {
                height: 0px;
                max-height: 0px;
            }

            .openFolder {}
        }
    }
}
</style>

<script setup lang="ts">
import { sysConfig } from "@/stores/sysConfig"
const config = sysConfig()
import { ref } from 'vue'
import axios from 'axios'
import decryptor from "@/assets/ts/tokenDecryptor"

declare let $: any
const userInfo = JSON.parse(sessionStorage.getItem("userInfo") + "")[0];
const dec = new decryptor();
let menuList = ref<any>();

let getMenu = async () => {
    await axios.post(config.tokenPath).then(async function (response) {
        let token = dec.decryptToken(response.data.message);

        await axios.post(config.menuPath, {
            empNo: userInfo.no,
            requestToken: token,
        }, {
            headers: {
            }
        }).then(function (response) {
            menuList.value = response.data;
        })
    })
}

getMenu();

let openFolder = (e: any) => {
    let Obj = $(e.target).first()[0];
    let child = $(Obj).children().eq(1);
    let icon = $(Obj).children().eq(0);

    //改變資料夾圖示
    if (icon.hasClass("bi-folder")) {
        icon.removeClass("bi-folder");
        icon.addClass("bi-folder-symlink");
    } else {
        icon.removeClass("bi-folder-symlink");
        icon.addClass("bi-folder");
    }

    //開啟子目錄
    if (child.hasClass("collapsed")) {
        child.removeClass("collapsed");
        $(Obj).addClass("openFolder");
        if (icon.hasClass("bi-hdd-stack")) {
            icon.removeClass("bi-hdd-stack");
            icon.addClass("bi-hdd");
        }
    } else {
        child.addClass("collapsed");
        $(Obj).removeClass("openFolder");
        if (icon.hasClass("bi-hdd")) {
            icon.removeClass("bi-hdd");
            icon.addClass("bi-hdd-stack");
        }
    }

    e.preventDefault();
}

$(() => {
})
</script>