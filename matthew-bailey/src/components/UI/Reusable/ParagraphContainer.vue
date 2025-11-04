<script setup>
    import {computed} from "vue";

    //Update as requirements are needed later.
    const ALLOWED_STYLE_PROPS = [
        "backgroundColor",
    ];

    const props = defineProps({
        styles:Object
    });

    const compStyles = computed(()=>{
        const newStyles = {};
        const defaultStyles = { backgroundColor:"rgb(8, 71, 64, 0.5)"};
        try{
            if(props.styles){
                Object.keys(props.styles).forEach((style)=>{
                    if(ALLOWED_STYLE_PROPS.includes(style)){
                        newStyles[style] = props.styles[style];
                    }else{
                        const err = new Error();
                        err.details = {badProp:style};
                        throw err;
                    }
                });
                return newStyles;
            }else{
                return defaultStyles
            }
        }catch(err){
            console.error(`In the ParagraphContainer style property, ${err.details.badProp} is not allowed at this time.`);
            return defaultStyles;
        }
    });
</script>
<template>
    <div :style="compStyles" class="paragraph-container" >
        <slot></slot>
    </div>
</template>
<style scoped lang="scss">
    .paragraph-container{
        padding: 0.5em;
    }
</style>