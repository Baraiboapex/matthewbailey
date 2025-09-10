<script setup>
    import {ref, onMounted, nextTick, onBeforeUnmount} from "vue";

    const props = defineProps({
        particlesConfig:Array
    });

    const bg = ref(null);

    onMounted(()=>{
        try{
            nextTick(()=>{
                console.log("TEST");
                if(window.particlesJS){
                    window.particlesJS(bg.value.id, props.particlesConfig);
                    setTimeout(() => {
                    const canvas = bg.value.querySelector('canvas');
                    console.log(canvas);
                    if (canvas) {
                        canvas.style.width = '100vw';
                        canvas.style.height = '100vh';
                        canvas.style.position = 'fixed';
                        canvas.style.top = '0';
                        canvas.style.left = '0';
                        canvas.style.zIndex = '-1';
                        canvas.style.pointerEvents = 'none';
                        canvas.style.display = 'block';
                    }else{
                        console.log("NO CANVAS")
                    }
                }, 50);
                }
                
            });
            console.log("TEST");
            particlesJS("particleBackground",props.particleConfig);
        }catch(err){
            console.log(err);
        }
    });

    onBeforeUnmount(()=>{
        if (bg.value) {
            bg.value.innerHTML = '';
        }
    });
</script>
<template>
    <div id="particleBackground" ref="bg">
        <slot></slot>
    </div>
</template>
<style scoped>
    #particleBackground{
        top: 0;
        left: 0;
        height: 100%;
        z-index: -1;
        display: block;
        overflow-x: hidden !important;
        overflow-y: visible !important;
        top:0;
        left:0;
    }
</style>