<script setup>
    import {onMounted, onBeforeUnmount, ref, reactive, nextTick} from "vue";
    import { animate, onScroll, utils } from 'animejs';

    import {
        ANIMATIONS,
        ALLOWED_ANIMATIONS,
        CUSTOMIZE_ANIMATIONS,
        ANIMATION_OBJECT
    } from "./animatedContainerObjects";

    const props = defineProps({
        elementsToAnimate:Array,
        elementAnimations:Array
    });

    const state = reactive({
        elementList:[],
        animationInstance:null
    });

    const itemRefs = ref({});
    const scrollContainer = ref(null);
    
    const setRef = (projectId, item) => {
        itemRefs._value[projectId] = item;
    };
    
    const SUPPORTED_TRANSLATION_UNITS = [
        "px",
        "em",
        "rem"
    ]

    const setElementStartPoint = (element, starterPoint) => {
        try{
            if(typeof startPoint === "string"){
                const unitRegex = /[a-z].*?/g;
                const foundUnit = startPoint.match(unitRegex)[1];
                
                if(foundUnit){
                    if(SUPPORTED_TRANSLATION_UNITS.includes(founUnit)){
                        element.style = "translation:"+startPoint
                    }
                }else{
                    throw new Error("Unit of measure not found");
                }
            }
            if(typeof starterPoint === "number"){
                element.style.transform = `translateX(${starterPoint+"px"})`;
                console.log(element.style);
            }
            
        }catch(err){
            throw new Error("Could not set starter units");
        }
    };

    const constructScrollableList = async() => {
        
        await nextTick();

        const element = ANIMATION_OBJECT;
        const buildElementsToAnimate = [];

        for(const [index, item] of props.elementsToAnimate.entries()){
            const el = {...element};
            el.elementData = item;
            el.elementToAnimate = itemRefs.value[item.id];
            
            setElementStartPoint(el.elementToAnimate, props.elementAnimations[index].startPoint);

            console.log(el.elementToAnimate.style.translate);
            const getParentContainerBoundingBox = scrollContainer.value.getBoundingClientRect();

            const animationObj = CUSTOMIZE_ANIMATIONS({
                animationsObject:ALLOWED_ANIMATIONS,
                animationName:ANIMATIONS.SLIDE_IN_LEFT,
                animationValues:props.elementAnimations[index].animationParams(getParentContainerBoundingBox.left/screen.width)
            });

            el.animationParams = animationObj;
            buildElementsToAnimate.push(el);
        }
        state.elementList = buildElementsToAnimate;
    };

    const setupScroll = () => {
        state.elementList.forEach((el)=>{
            let animationObject = {
                alternate: true,
                autoplay: onScroll(el.elementToAnimate,{
                    container: scrollContainer.value,
                    sync:1,
                    enter: 'max bottom',
                    leave: 'min top',
                }),
            };

            animationObject = {...animationObject, ...el.animationParams};
       
            state.animationInstance = animate(
                el.elementToAnimate,
                animationObject
            );
        });
    };

    onMounted(()=>{
        constructScrollableList();
        nextTick(()=>{
            setupScroll();
        });
    });

    onBeforeUnmount(()=>{
        state.elementList = [];
        state.animationInstance.pause();
        state.animationInstance = null;
        Object.keys(itemRefs.value).forEach((key)=>{
            utils.remove(itemRefs.value[key]);
        });
        itemRefs.value = {};
    });
</script>
<template>
    <div ref="scrollContainer" class="scroll-container d-flex flex-column justify-content-center align-items-center">
        <div class="item-container w-100" v-for="element in props.elementsToAnimate" :key="element.id" :ref="(el)=>setRef(element.id, el)">
            <slot name="listElement" :data="element">
            </slot>
        </div>
    </div>
</template>