<script setup>
    const props = defineProps({
        formData:Object,
        submitButtonText:String
    });

    const events = defineEmits([
        "on-form-submit"
    ]);

    const submitForm = ()=>{
        events("on-form-submit",props.formData);
    };
</script>
<template>
    <form class="site-form rounded" @submit.prevent="submitForm">
        <slot name="formBody"></slot>
        <div class="d-flex mt-4 align-content-start justify-content-start">
            <button class="btn btn-light" type="submit">
                {{submitButtonText}}
            </button>
        </div>
    </form>
</template>