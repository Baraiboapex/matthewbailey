<template>
    <section v-if="showLoadingSign" class="message message-box loading-sign d-flex flex-column justify-content-center align-items-center" id="loadingMessage">
        <h3 id="loadingMessageText">{{ loadingMessageText }}</h3>
        <h2 class="spinner-border" role="status"></h2>
    </section>
</template>
<script setup>
    defineProps({
        showLoadingSign:Boolean,
        loadingMessageText:String
    });
</script>