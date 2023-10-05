<template>
    <div class="menuContainer">
        <div class="menuTray">
            <ul class="menuList">
                <li v-for="menu in menuList"
                    :class="{ 'hideItem': !menu.show, 'menuItem': menu.subMenu.length == 0, 'menuCase': menu.subMenu.length > 0 }"
                    @="menu.subMenu.length > 0 ? {'click': openFolder} : {}">
                    {{ menu.menuText }}
                    <ul v-if="menu.subMenu.length > 0" class="collapsed">
                        <li v-for="menu1 in menu.subMenu"
                            :class="{ 'hideItem': !menu1.show, 'menuItem': menu1.subMenu.length == 0, 'menuCase': menu1.subMenu.length > 0 }"
                            @="menu1.subMenu.length > 0 ? {'click.once' : openFolder} : {}">
                            {{
                                menu1.menuText }}
                            <ul v-if="menu1.subMenu.length > 0" class="collapsed">
                                <li v-for="menu2 in menu1.subMenu"
                                    :class="{ 'hideItem': !menu2.show, 'menuItem': menu2.subMenu.length == 0, 'menuCase': menu2.subMenu.length > 0 }"
                                    @="menu2.subMenu.length > 0 ? {'click.once' : openFolder} : {}">
                                    {{
                                        menu2.menuText }}
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

        ul {
            padding-left: unset;
            list-style-type: none;
        }

        .menuList {
            font-size: 1.1em;

            li{
                padding : 2px;
            }

            .menuItem,
            .menuCase {
                padding-left: 1.5em;
                background-repeat: no-repeat;
                background-position: 0px 5px;
                transition: all .3s ease-in-out;
                cursor: pointer;
            }

            .menuCase {
                background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>'), linear-gradient(90deg, rgba(200, 200, 200, .5) 0 30%, transparent 50% 100%);
                background-repeat: no-repeat;
                background-size: auto, 0px 24px;
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

            .menuItem {
                background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M128 0C92.7 0 64 28.7 64 64V288H19.2C8.6 288 0 296.6 0 307.2C0 349.6 34.4 384 76.8 384H320V288H128V64H448V96h64V64c0-35.3-28.7-64-64-64H128zM512 128H400c-26.5 0-48 21.5-48 48V464c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V256H544c-17.7 0-32-14.3-32-32V128zm32 0v96h96l-96-96z"/></svg>'), linear-gradient(90deg, rgba(200, 200, 200, .5) 0 30%, transparent 50% 100%);
                background-repeat: no-repeat;
                background-size: auto, 0px 24px;
            }

            .hideItem {
                display: none;
            }

            .collapsed {
                height: 0px;
                max-height: 0px;
            }

            .openFolder {
                background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"/></svg>'), linear-gradient(90deg, rgba(200, 200, 200, .5) 0 30%, transparent 50% 100%);
                background-repeat: no-repeat;
                background-size: auto, 0px 24px;
            }
        }
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
declare let $: any
const userInfo = JSON.parse(sessionStorage.getItem("userInfo") + "")[0];
let menuList = ref([]);

axios.post("https://localhost:44362/erp/getSideMenu/", {
            empNo: userInfo.no,
        }, {
    headers: {
    }
}).then(function (response) {
    console.log(response.data);
    menuList.value = response.data;
})

let openFolder = (e: any) => {
    let Obj = $(e.target).first()[0];
    console.log(Obj);
    let child = $(Obj).children(":first");
    let folderOpen = !child.hasClass("collapsed");

    if (child.hasClass("collapsed")) {
        child.removeClass("collapsed");
        $(Obj).addClass("openFolder");
    } else {
        child.addClass("collapsed");
        $(Obj).removeClass("openFolder");
    }

    e.preventDefault();
}

$(() => {
})
</script>