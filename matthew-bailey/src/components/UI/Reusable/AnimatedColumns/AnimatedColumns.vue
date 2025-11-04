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
    const scrollContainer = ref(null);
    
    const SUPPORTED_TRANSLATION_UNITS = [
        "px",
        "em",
        "rem"
    ];

    const setRef = (projectId, item) => {
        itemRefs._value[projectId] = item;
    };

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
            }
            
        }catch(err){
            throw new Error("Could not set starter units");
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

                console.log(el.elementToAnimate.style.translate);
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
        state.elementList.forEach((index, el)=>{
            const staggeredDelay = index * 100;
            let updatedAnimationParams = {
                ...el.animationParams,
                delay:staggeredDelay
            };
            let animationObject = {
                alternate: true,
                autoplay: onScroll(el.elementToAnimate,{
                    container: props.parentScrollContainer,
                    enter: 'max bottom',
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
    <div class="d-flex flex-row justify-content-center">
        <div class="item-container w-100" v-for="element in props.elementsToAnimate" :key="element.id" :ref="(el)=>setRef(element.id, el)">
            <slot name="columnElement" :data="element.column">
            </slot>
        </div>
    </div>
</template>