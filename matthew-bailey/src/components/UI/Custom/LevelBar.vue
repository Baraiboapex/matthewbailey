<script setup>
    const props = defineProps({
        barLevel:Number,
        barColor:String
    });
</script>
<template>
    <div style="width:80px;" class="d-flex flex-row border rounded border border-light">
        <h1 v-for="_ in barLevel" class="bg-light" style="margin:0 0.02em 0 0.02em;">
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
</template>