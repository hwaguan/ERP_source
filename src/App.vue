<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import MainMenu from './components/MainMenu.vue'
import SysHeader from './components/SysHeader.vue'
import { ref } from 'vue'

const route = useRoute()
const dailog = ref('shiftList')
</script>

<template>
  <div class="mainFrame">
    <div class="frameHeader" v-if="route.path != '/'" >
      <SysHeader/>
    </div>
    <div :class="{ frameBody: route.path != '/', loginBody: route.path == '/' }">
      <div class="mainMenu">
        <MainMenu v-if="route.path != '/'" />
      </div>
      <div :class="{ mainBody: route.path != '/' }">
        <div :class="{ mainBodyTray: route.path != '/' }">
          <RouterView />
        </div>
      </div>
    </div>
    <div class="frameFooter">2023 華冠證券投資顧問股份有限公司版權所有</div>
  </div>
  <!--<RouterView />-->
</template>

<style scoped lang="scss">
@import url(https://fonts.googleapis.com/earlyaccess/cwtexyen.css);
.mainFrame {
  padding-top : 50px;
  .frameHeader {
    top : 0px;
    left : 0px;
    width : 100%;
    height: 50px;
    //background-color: rgb(220, 220, 220);
    position : fixed;
    z-index : 1000;
  }

  .loginBody {
    padding-top: 60px;
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 100px);
  }

  .frameBody {
    display: grid;
    grid-template-columns: 20% auto;
    background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="" viewBox="0 0 55 55" xml:space="preserve"><path fill="rgba(200, 200, 200, .2)" d="M24.3 8.9c0 0-16.7 1.9-14.4 14.4c0 0-0.8 0.8-2.5-1.7c0 0 1 3.4 4.3 5.5c0 0 6.5 11.9-0.5 17.3c0 0 8.7 1.3 7.6-13.2c0 0 1.7 1.3 5.6 0.6c0 0 5 9.3-12.1 13.7c0 0 20.9 4.9 23.3-17.5c0 0 5.3-3.3 6.5-7.7c0 0-1.9 2.1-3 2.1c0 0 2.3-7.3-7.4-10.2c0 0 8.6 6.1 0.4 13.5c0 0-10.3 6.7-15.6-3.6C16.3 22.1 12.6 13.7 24.3 8.9z"/></svg>'),
      rgb(240, 240, 240);
    /*background-repeat : no-repeat;*/
    background-size: 90%;
    background-position: -300px -300px;
    transition: all .5s;

    .mainMenu {
      //background-color: rgb(200, 200, 200);
    }

    .mainBody {
      padding: 10px 10px 10px 0px;

      .mainBodyTray {
        min-height: calc(100vh - 142px);
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(18px);
        border: 1px rgb(200, 200, 200) solid;
        border-radius: 5px;
      }
    }
  }

  .frameBody {
    min-height: calc(100vh - 120px);
  }

  .frameFooter {
    padding: 20px;
    font-size: 1.2em;
    font-weight: 700;
    letter-spacing: 1px;
    text-align: center;
  }

  .collapseMenu{
    grid-template-columns: 10px auto;
  }
}
</style>
