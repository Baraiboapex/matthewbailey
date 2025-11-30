<script setup>
    import {ref, computed} from "vue";

    const props = defineProps({
        toastText:String,
        toastType:String
    });

    const toastVisible = ref(false);

    const toastStyles = computed(()=>"d-flex flex-row justify-content-start align-items-center w-100 alert alert-"+(props.toastType ? props.toastType : "primary"));
    
    const showToast = () => {
        toastVisible.value = true;
        setTimeout(()=>{
            toastVisible.value = false;
        },1500);
    }

    defineExpose({
        showToast
    });
</script>
<template>
    <div v-if="toastVisible" :class="toastStyles" role="alert">
        {{ toastText }}
    </div>
</template>