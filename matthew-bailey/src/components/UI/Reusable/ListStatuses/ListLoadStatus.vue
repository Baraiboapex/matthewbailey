<script setup>
    const props = defineProps({
        alertText:String,
        alertTitle:String,
        showAlert:Boolean
    }); 
</script>
<template>
    <div class="d-flex flex-row w-100 justify-content-center">
        <slot name="alert-logo"></slot>
        <h1 class="text-light">{{ alertTitle }}</h1>
        <p>{{ alertText }}</p>
    </div>
</template>