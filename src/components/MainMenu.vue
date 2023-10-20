<template>
  <div class="menuContainer">
    <div
      class="menuTray"
      @="menuHide > 0 ? { click: showMenu } : {}"
      :class="{ hideMenu: menuHide > 0 }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="29"
        fill="currentColor"
        class="bi bi-list mainMenuHamburger"
        viewBox="0 0 16 16"
        style="margin-bottom: -5px"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
      <div class="menuCase">
        <ul class="menuList">
          <li @click="goHome" class="menuItem">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-house-fill"
              viewBox="0 0 16 16"
              style="margin-right: 5px"
            >
              <path
                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"
              />
              <path
                d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"
              /></svg>首頁
          </li>
          <li
            v-for="menu in menuList"
            :class="{
              hideItem: !menu.show,
              menuItem: menu.subMenu.length == 0,
              menuCase: menu.subMenu.length > 0
            }"
            @="menu.subMenu.length > 0 ? { click: openFolder } : {}"
          >
            <i class="bi-folder"></i>
            {{ menu.menuText }}
            <ul v-if="menu.subMenu.length > 0" class="collapsed firstLevel">
              <li
                v-for="menu1 in menu.subMenu"
                class="midLevel"
                :class="{
                  hideItem: !menu1.show,
                  menuItem: menu1.subMenu.length == 0,
                  menuCase: menu1.subMenu.length > 0
                }"
                @="
                  menu1.subMenu.length > 0 && menu1.menuLink != '#'
                    ? { mouseenter: openFolder, mouseleave: openFolder }
                    : menu1.menuLink == '#'
                    ? { 'click.once': openFolder }
                    : {}
                "
              >
                <i class="bi bi-hdd" v-if="menu1.subMenu.length == 0"></i>
                <i
                  class="bi bi-folder"
                  v-if="menu1.subMenu.length > 0 && menu1.menuLink == '#'"
                ></i>
                <i
                  class="bi bi-hdd-stack"
                  v-if="menu1.subMenu.length > 0 && menu1.menuLink != '#'"
                ></i>
                {{ menu1.menuText }}
                <ul
                  v-if="menu1.subMenu.length > 0"
                  class="collapsed"
                  :class="{ finalLevel: menu1.subMenu.length > 0 && menu1.menuLink != '#' }"
                >
                  <li
                    v-for="menu2 in menu1.subMenu"
                    :class="{
                      hideItem: !menu2.show,
                      menuItem: menu2.subMenu.length == 0,
                      menuCase: menu2.subMenu.length > 0
                    }"
                    @="menu2.subMenu.length > 0 ? { click: openFolder } : {}"
                  >
                    <i class="bi bi-hdd"></i>
                    {{ menu2.menuText }}
                    <ul v-if="menu2.subMenu.length > 0" class="collapsed"></ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="collapseTagLine">
        <div class="collapseTagIcon" @click="collapseMenu()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-arrow-up-short"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style sfoped lang="scss">
.menuContainer {
  width: 20vw;
  padding: 10px;

  .menuCase{
    max-height: 75vh;
    overflow: auto;
  }

  .menuCase::-webkit-scrollbar {
    width: 3px;
}
 
.menuCase::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(200,200,200,0.3);
}
 
.menuCase::-webkit-scrollbar-thumb {
  background-color: rgba(200,200,200,0.3);
  outline: 1px solid rgba(200,200,200,0.3);
}

  .collapseTagLine {
    padding-top : 10px;
    height: 40px;
    display: flex;
    justify-content: end;

    .collapseTagIcon {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: rgb(220, 220, 220);
      border-radius: 999em;
      cursor: pointer;

      .bi-arrow-up-short {
        transform: rotate(-45deg);
        fill: rgb(255, 255, 255);
      }
    }

    .collapseTagIcon:hover {
      background-color: rgb(200, 200, 200);
    }
  }

  .menuTray {
    width: calc(20vw - 20px);
    min-height: 50vh;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(18px);
    border: 1px rgb(200, 200, 200) solid;
    border-radius: 5px;
    position: fixed;
    z-index: 1;
    transition: all 0.5s;

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
      font-size: 1em;

      li {
        padding: 2px;
      }

      .menuItem,
      .menuCase {
        background-repeat: no-repeat;
        background-position: 0px 5px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
      }

      .menuCase ul {
        overflow: hidden;
        max-height: 100vh;
        transition: all 0.3s ease-in-out;
      }

      .menuCase:hover,
      .menuItem:hover {
        background-size:
          auto,
          200% 24px;
      }

      .menuItem {
      }

      .hideItem {
        display: none;
      }

      .collapsed {
        height: 0px;
        max-height: 0px;
      }

      .openFolder {
      }
    }
  }

  .mainMenuHamburger {
    display: none;
  }
}

.hideMenu {
  top: 40px;
  left: 4px;
  width: 50px !important;
  height: 50px !important;
  min-height: 50px !important;
  background-color: rgb(200, 200, 200) !important;
  opacity: 0.6;
  border-radius: 25px !important;
  overflow: hidden;
  cursor: pointer;
}

.hideMenu:hover {
  background-color: rgb(250, 250, 250) !important;
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { sysConfig } from '@/stores/sysConfig'
const config = sysConfig()
import { ref } from 'vue'
import axios from 'axios'
import decryptor from '@/assets/ts/tokenDecryptor'

const router = useRouter()
declare let $: any
const userInfo = JSON.parse(sessionStorage.getItem('userInfo') + '')[0]
const dec = new decryptor()
let menuList = ref<any>()
let menuHide = ref(0)

let getMenu = async () => {
  await axios.post(config.tokenPath).then(async function (response) {
    //console.log(response.data.message);
    let token = dec.decryptToken(response.data.message)
    //console.log(token);

    await axios
      .post(
        config.menuPath,
        {
          empNo: userInfo.no,
          requestToken: token
        },
        {
          headers: {}
        }
      )
      .then(function (response) {
        menuList.value = response.data
      })
  })
}

getMenu()

let openFolder = (e: any) => {
  let Obj = $(e.target).first()[0]
  let child = $(Obj).children().eq(1)
  let icon = $(Obj).children().eq(0)

  //改變資料夾圖示
  if (icon.hasClass('bi-folder')) {
    icon.removeClass('bi-folder')
    icon.addClass('bi-folder-symlink')
  } else {
    icon.removeClass('bi-folder-symlink')
    icon.addClass('bi-folder')
  }

  //開啟子目錄
  if (child.hasClass('collapsed')) {
    child.removeClass('collapsed')
    $(Obj).addClass('openFolder')
    if (icon.hasClass('bi-hdd-stack')) {
      icon.removeClass('bi-hdd-stack')
      icon.addClass('bi-hdd')
    }
  } else {
    child.addClass('collapsed')
    $(Obj).removeClass('openFolder')
    if (icon.hasClass('bi-hdd')) {
      icon.removeClass('bi-hdd')
      icon.addClass('bi-hdd-stack')
    }
  }

  e.preventDefault()
}

let collapseMenu = () => {
  menuHide.value = 1
  $('.menuList').fadeOut()
  $('.collapseTagLine').fadeOut()
  $('.frameBody').addClass('collapseMenu')
  $('.mainMenuHamburger').fadeIn()
}

let showMenu = () => {
  menuHide.value = 0
  $('.frameBody').removeClass('collapseMenu')
  $('.mainMenuHamburger').css('display', 'none')
  setTimeout(() => {
    $('.menuList').fadeIn()
    $('.collapseTagLine').fadeIn()
  }, 300)
}

let goHome = () => {
  router.push('/main')
}

$(() => {})
</script>
