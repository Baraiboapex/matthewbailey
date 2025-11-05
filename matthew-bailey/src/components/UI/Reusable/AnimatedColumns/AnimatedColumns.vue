<script setup>
    import {ref, reactive, onMounted, onBeforeUnmount, nextTick} from "vue";
    import { animate, onScroll, utils, } from 'animejs';

    import {
        ANIMATIONS,
        ALLOWED_ANIMATIONS,
        CUSTOMIZE_ANIMATIONS,
        ANIMATION_OBJECT
    } from "./animatedContainerObjects";

    const props = defineProps({
        elementsToAnimate:Array,
        elementAnimations:Array,
        canAnimate:Boolean,
        parentScrollContainer:Object
    });

    const state = reactive({
        elementList:[],
        animationInstance:null
    });

    const itemRefs = ref({});
    
    const SUPPORTED_TRANSLATION_UNITS = [
        "px",
        "em",
        "rem"
    ];

    const setRef = (projectId, item) => {

        console.log(projectId, item);
        itemRefs._value[projectId] = item;
    };

    const setElementStartPoint = (element, starterPoint) => {
        try{
            if(typeof starterPoint === "string"){
                console.log("TEST VAL : ", starterPoint);
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
                console.log("TEST VAL : ", starterPoint);
                element.style.transform = `translateX(${starterPoint+"px"})`;
            }
        }catch(err){
            throw new Error("Could not set starter units", err);
        }
    };

    const constructAnimatedColumns = async () =>{
        console.log("CAN ANIMATE : ", props.canAnimate);
        if(props.canAnimate){
            await nextTick();

            const element = ANIMATION_OBJECT;
            const buildElementsToAnimate = [];

            console.log("TEST ==> ", props.elementsToAnimate);

            for(const [index, item] of props.elementsToAnimate.entries()){
                const el = {...element};
                el.elementData = item;
                el.elementToAnimate = itemRefs.value[item.id];
                
                setElementStartPoint(el.elementToAnimate, props.elementAnimations[index].startPoint);

                console.log("EL : ", el.elementToAnimate.style.translate);
                const getParentContainerBoundingBox = props.parentScrollContainer.getBoundingClientRect();

                const animationObj = CUSTOMIZE_ANIMATIONS({
                    animationsObject:ALLOWED_ANIMATIONS,
                    animationName:ANIMATIONS.SLIDE_IN_LEFT,
                    animationValues:props.elementAnimations[index].animationParams(getParentContainerBoundingBox.left/screen.width)
                });

                el.animationParams = animationObj;
                buildElementsToAnimate.push(el);
            }
            state.elementList = buildElementsToAnimate;
        }
    };

    const setupScroll = () => {
        state.elementList.forEach((el, index)=>{
            console.log("ELEMENT : ", el);
            const staggeredDelay = index * 900;
            console.log(el.elementToAnimate);
            let updatedAnimationParams = {
                ...el.animationParams,
                delay:staggeredDelay
            };
            let animationObject = {
                alternate: true,
                autoplay: onScroll(el.elementToAnimate,{
                    container: props.parentScrollContainer,
                    enter: 'min top',
                    leave: 'min top',
                }),
            };

            animationObject = {...animationObject, ...updatedAnimationParams};
       
            state.animationInstance = animate(
                el.elementToAnimate,
                animationObject
            );
        });
    };

    onMounted(()=>{
        console.log(props.elementsToAnimate);
        constructAnimatedColumns();
        nextTick(()=>{
            setupScroll();
        });
    });

    onBeforeUnmount(()=>{
        if(props.canAnimate){
            state.elementList = [];
            if(state.animationInstance){
                state.animationInstance.pause();
                state.animationInstance = null;
                Object.keys(itemRefs.value).forEach((key)=>{
                    utils.remove(itemRefs.value[key]);
                });
                itemRefs.value = {};
            }
        }
    });
</script>
<template>
    <div class="d-flex flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column justify-content-xl-start justify-content-lg-start justify-content-md-center justify-content-sm-center justify-content-center align-items-xl-start align-items-lg-start align-items-md-center align-items-sm-center align-items-center">
        <div class="item-container w-100" v-for="element in props.elementsToAnimate" :key="element.id" :ref="(el)=>setRef(element.id, el)">
            <slot name="columnElement" :data="element.columns">
            </slot>
        </div>
    </div>
</template>