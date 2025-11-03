<script setup>
    import {ref, reactive} from "vue";
    import { animate, onScroll, utils, } from 'animejs';

    const props = defineProps({
        elementsToAnimat:Array,
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
                console.log(element.style);
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

            for(const [index, item] of props.elementsToAnimate.entries()){
                const el = {...element};
                el.elementData = item;
                el.elementToAnimate = itemRefs.value[item.id];
                
                setElementStartPoint(el.elementToAnimate, props.elementAnimations[index].startPoint);

                console.log(el.elementToAnimate.style.translate);
                const getParentContainerBoundingBox = parentScrollContainer.value.getBoundingClientRect();

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
            const staggeredDelay = index * baseDelay;
            let updatedAnimationParams = {
                ...el.animationParams,
                delay:staggeredDelay
            };
            let animationObject = {
                alternate: true,
                autoplay: onScroll(el.elementToAnimate,{
                    container: parentScrollContainer.value,
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
    <div class="d-flex flex-row justify-content-start">
        <div class="item-container w-100" v-for="element in props.elementsToAnimate" :key="element.id" :ref="(el)=>setRef(element.id, el)">
            <slot name="columnElement" :data="element">
            </slot>
        </div>
    </div>
</template>