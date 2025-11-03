<script setup>
    import {reactive, ref} from "vue";
    import PageContainer from "../components/UI/Reusable/PageContainer/PageContainer.vue";
    import ParagraphContainer from "../components/UI/Reusable/ParagraphContainer.vue";
    import AnimatedList from "../components/UI/Reusable/AnimatedScrollingContainer/AnimatedList.vue";
    import { detectDevice } from "../helpers/deviceHelpers";
    import { onMounted } from "vue";

    const TAGLINE = `
        Questions? Comments? Drop me an email or give me a call! I can also be reached
        on linkedin.
    `;

    const CONTACT_INFORMATION = [
        {
           id:1,
            svg:`
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                    </svg>
            `,
            info:"matthewpbaileydesigns@gmail.com",
            contactType:"Email",
            isLink:true,
            linkText:"Send Email",
            linkData:"mailto:matthewpbaileydesigns@example.com?subject=Contact%20Request",
            isForMobile:false
        },{
            id:2,
            svg:`
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg>
            `,
            info:"904-309-0551",
            contactType:"Phone Number",
            isLink:true,
            linkData:"tel:+19043090551",
            linkText:"Dial Number",
            isForMobile:true
        },{
            id:3,
            svg:`
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                    </svg>
            `,
            info:"https://www.linkedin.com/in/matthew-bailey-469705149/",
            contactType:"Linked In",
            isLink:true,
            linkData:"https://www.linkedin.com/in/matthew-bailey-469705149/",
            linkText:"Go To Page",
            isForMobile:false
        }
    ];

    const elementAnimationsList = [
        {
            startPoint:400,
            animation:"SLIDE_IN_LEFT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                delay:100,
                opacity: [0, 1],
            })
        },
        {
            startPoint:400,
            animation:"SLIDE_IN_LEFT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                delay:100,
                opacity: [0, 1],
            })
        },
        {
            startPoint:400,
            animation:"SLIDE_ID_LEFT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                delay:100,
                opacity: [0, 1],
            })
        },
    ];

    const state = reactive({
        contactTagline:TAGLINE,
        contactInfo:CONTACT_INFORMATION
    });

    const isMobileDevice = ref(detectDevice().isMobileDevice);

    onMounted(()=>{
        window.scrollTo(0, 0);
    });

</script>
<template>
    <PageContainer>
        <ParagraphContainer class="p-4 rounded-top">
            <div class="row p-2 mb-4 mt-4 m-0">
                <div class="col-sm-12 p-2">
                    <h1 class="text-wrap">{{ state.contactTagline }}</h1> 
                </div>
            </div>
        </ParagraphContainer>
        <ParagraphContainer :styles="{backgroundColor:'rgb(8, 71, 64, 0.2)'}" class="pt2-4 pb-4 rounded-bottom">
            <AnimatedList
                :elementsToAnimate="state.contactInfo"
                :elementAnimations = "elementAnimationsList"
                :canAnimate = "true"
            >
                <template #listElement="{data}">
                    <div v-if="!isMobileDevice" class="row mb-4 mt-4 p-2 m-0 w-100">
                        <div v-if="!data.isForMobile" class="col-12 p-0 row">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-2 d-flex justify-content-center">
                                <div class="pb-3" v-html="data.svg"></div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-10 d-flex flex-column align-items-lg-start align-items-md-center align-items-sm-center align-items-xs-center align-items-center align-items-center">
                                <h4 class="contact-text text-wrap text-lg-start text-md-center text-sm-center text-center">{{ data.info }}</h4>
                                <a v-if="data.isLink" target="_blank" :href="data.linkData" type="button" class="mt-3 btn text-light justify-content-center text-decoration-none text-light w-sm-50 p-2 rounded">
                                    <h4 class="text-light border border-white p-2 rounded ">
                                        {{ data.linkText }}
                                    </h4>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div v-else class="row mb-1 mt-1 p-2 m-0 w-100 d-flex justify-content-center">
                        <div class="col-12 p-0 mb-2 mt-2 row w-100 d-flex justify-content-center">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-2 d-flex justify-content-center">
                                <div class="pb-3" v-html="data.svg"></div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-10 d-flex flex-column align-items-lg-start align-items-md-center align-items-sm-center align-items-xs-center align-items-center align-items-center">
                                <!-- <h4 class="contact-text text-wrap text-lg-start text-md-center text-sm-center text-center">{{ data.info }}</h4> -->
                                <a v-if="data.isLink" target="_blank" :href="data.linkData" type="button" class="mt-3 btn text-light justify-content-center text-decoration-none text-light w-sm-50 p-2 rounded">
                                    <h5 class="text-light break-word border border-white p-2 rounded ">
                                        {{ data.linkText }}
                                    </h5>
                                </a>
                            </div>
                        </div>
                    </div>
            </template>
            </AnimatedList>
        </ParagraphContainer>
    </PageContainer>
</template>
<style scoped lang="scss">

    @media screen and (max-width: 48em) {
        .contact-text { 
            font-size:1em;
        }
    }
    
</style>