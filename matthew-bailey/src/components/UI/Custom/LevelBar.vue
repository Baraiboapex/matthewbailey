<script setup>
    import {computed} from "vue";

    const props = defineProps({
        barLevel:Number,
        barColor:String,
        barLabel:String
    });

    const hasBarLabel = computed(()=>props.barLabel !== undefined);
</script>
<template>
    <div class="d-flex flex-row align-items-center justify-content-center">
     <span v-show="hasBarLabel">{{barLabel}}</span>
     <span>&nbsp;&nbsp;</span>
    <div style="width:89px;" class="d-flex flex-row border rounded border border-light">
        
        <h1 :style="{color:barColor}" v-for="_ in barLevel" class="bg-light" style="margin:0 0.02em 0 0.02em;">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-square-fill"
                viewBox="0 0 16 16"
            > 
                <path d="M0 2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"/>
            </svg>
        </h1>
    </div>
    </div>
</template>