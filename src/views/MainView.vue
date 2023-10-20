<template>
    <div class="mainPageContainer">
        <div>
            <performanceReport />
        </div>
        <div></div>
    </div>
</template>

<style scoped lang="scss">
.mainPageContainer{
    display : grid;
    grid-template-columns: 50% 50%;
    column-gap: 3px;

    .mainBlock{
        border : 1px rgb(168, 168, 168) solid;
        border-radius: 5px;
    }

    .blockTitle{
        padding : 10px 15px;
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import performanceReport from '@/components/PerformanceReport.vue';
</script>