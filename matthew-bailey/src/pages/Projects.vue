<script setup>
    import {reactive, onMounted} from "vue";
    import { useRoute } from 'vue-router';
    
    import PageContainer from "../components/UI/Reusable/PageContainer/PageContainer.vue";
    import ParagraphContainer from "../components/UI/Reusable/ParagraphContainer.vue";
    import AnimatedList from "../components/UI/Reusable/AnimatedScrollingContainer/AnimatedList.vue";
    import ParticleBackground from "../layouts/Backgrounds/ParticleBackground.vue";
    import { BG_PARTICLES_CONFIG } from "../layouts/Backgrounds/particleConfig";

    const route = useRoute();

    const PROJECTS_TAGLINE = `
        Here are some of my most recent projects that I built! I have provided
        links to my github for all of my machine learning and AI projects.
    `;

    const PROJECTS_LIST = [
        {
            id:1,
            projectImage:"test1",
            projectName:"test1",
            projectDescription:"test1"
        },
        {
            id:2,
            projectImage:"test2",
            projectName:"test2",
            projectDescription:"test2"
        },
        {
            id:3,
            projectImage:"test3",
            projectName:"test3",
            projectDescription:"test3"
        }
    ];

    const elementAnimationsList = [
        {
            startPoint:400,
            animation:"SLIDE_IN_LEFT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                opacity: [0, 1],
            })
        },
        {
            startPoint:-400,
            animation:"SLIDE_IN_RIGHT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                opacity: [0, 1],
            })
        },
        {
            startPoint:400,
            animation:"SLIDE_ID_LEFT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                opacity: [0, 1],
            })
        },
    ];

    const state = reactive({
        projectTagline:PROJECTS_TAGLINE,
        currentProjects:PROJECTS_LIST,
    });

    const scrollToSelectedProject = (projectId) => {
        const incommingId = route.query.projectId;

        if(incommingId){
            const parentEl = myProjectsRef;
            const childElToScrollTo = projectRefs.value[incommingId];

            parentEl.scrollTo({
                top:childElToScrollTo.offsetTop,
                behavior:"auto"
            });
        }
    };

</script>
<template>
    <PageContainer>
        <ParagraphContainer class="p-4 rounded-top">
            <div class="row m-0">
                <div class="col-12 m-0 p-2">
                    <h3>{{ state.projectTagline }}</h3>
                </div>
            </div>
        </ParagraphContainer>
        <ParagraphContainer :styles="{backgroundColor:'rgb(8, 71, 64, 0.2)'}" class="pt2-4 pb-4 rounded-bottom">
            <div class="col-12 m-0 p-2">
                <div id="myProjectsRef" class="row m-0 ">
                    <AnimatedList
                        :elementsToAnimate="state.currentProjects"
                        :elementAnimations = "elementAnimationsList"
                    >
                        <template #listElement="{data}">
                            <div class="flex-fill border-bottom p-2">
                                <div class="d-flex fles-row">
                                    <img :src="data.projectName" class="flex-fill" alt="some awesome image thing"/>
                                    <div class="d-flex flex-column flex-fill">
                                        <h2>{{ data.projectName }}</h2>
                                        <h4>{{ data.projectDescription }}</h4>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </AnimatedList>
                </div>
            </div>
        </ParagraphContainer>
    </PageContainer>
</template>