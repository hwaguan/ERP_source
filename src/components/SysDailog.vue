<template>
    <div class="modal signLog fade" id="sysDailog" tabindex="-1" aria-labelledby="dailogLabel" style="display: none;"
        aria-hidden="true">
        <div class="modal-dialog modal-xl" v-bind:class="{'modal-ph' : importProps.dailogType == 'phoneBook'}">
            <div class="modal-content">
                <phoneBook v-if="importProps.dailogType == 'phoneBook'"></phoneBook>
                <checkHist v-if="importProps.dailogType == 'checkHist'"></checkHist>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import phoneBook from '@/components/PhoneBook.vue'
import checkHist from '@/components/CheckHistory.vue'

let importProps = defineProps({
    dailogType: String,
})
</script>

<style scoped lang="scss">
.dailogContainer{
    padding : 20px;

    .dailogTitle{
        font-size : 2em;
    }
}

.modal-ph{
    --bs-modal-width : 90vw !important;
}
</style>