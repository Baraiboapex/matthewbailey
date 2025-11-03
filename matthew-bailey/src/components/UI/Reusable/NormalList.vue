<script setup>
    import {computed} from "vue";

    import ListLoadStatus from "./ListStatuses/ListLoadStatus.vue";
import ListLoadStatus from "./ListStatuses/ListLoadStatus.vue";

    const props = defineProps({
        listItems:Array,
        loadingList:Boolean,
        listHasError:Boolean,
        itemNameField:String,
        isOrderdList:Boolean,
    });

    const showList = computed(()=>loadingList !== false && listItems.length > 0);
    const showNoListItems = computed(()=>loadingList !== false && listItems.length < 1);
    const showListError = computed(()=> loadingList !== false && listHasError === true);

</script>
<template>
    <div class="w-100 d-flex flex-row">
        <div v-if="showList" class="d-flex flex-column flex-align-start justify-content-start">
            <div v-for="(index, item) in listItems" :key="item.id" class="d-flex flex-row">
                <div v-if="isOrderdList">{{ index }}.)</div>
                <div v-if="item[itemNameField]">{{item[itemNameField]}}</div>
                <slot name="list-content" :data="item"></slot>
            </div>
        </div>
    </div>
    <div v-if="showNoListItems" class="w-100 d-flex flex-row">
        <ListLoadStatus
            alertText="No Data!"
            alertTitle="No data was found"
            :showAlert:="showNoListItems"
        >
            <template list-logo>
                <h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708"/>
                    </svg>
                </h1>
            </template>
        </ListLoadStatus>
    </div>
    <div v-if="showListError" class="w-100 d-flex flex-row">
        <ListLoadStatus
            alertText="Error Loading Data"
            alertTitle="Something went wrong while loading the list data"
            :showAlert:="showListError"
        >
            <template list-logo>
                <h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </h1>
            </template>
        </ListLoadStatus>
    </div>
</template>