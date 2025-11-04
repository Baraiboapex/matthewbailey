<script setup>
    import { reactive ,onMounted } from 'vue';
    
    import PageContainer from '../components/UI/Reusable/PageContainer/PageContainer.vue';
    import ParagraphContainer from '../components/UI/Reusable/ParagraphContainer.vue';
    import AnimatedList from "../components/UI/Reusable/AnimatedScrollingContainer/AnimatedList.vue";

    const ABOUT_IMAGE = "./images/owner-image.png";
    // const ABOUT_TEXT = `
    //     Below is my resume of my most recent work experience! With my diverse array of experience,
    //     and my high adaptability, I would be an invaluable asset in any fast-moving environment!
    // `;
    const ABOUT_ME_RESUME = [
        {
            id:1,
            jobTitle:"Senior Application Developer",
            company:"Stealth Startup",
            yearsActive:"Jul 2024 - Present · 1 yr 4 mos",
            responsibilities:[
                "Tools used: Node.js, Firebase, Vue.js, HTML, CSS, JavaScript, Python, AI/ML, Bootstrap CSS",
                "Built and maintained a powerful easy-to-use Responsive, mobile-first emailing system for a Japanese class at a religious organization. The system increased overall attendance during the class’s special events by 20% and aided in encouraging long-term stagnant members to return to the class.",
                "Studied AI and machine learning in a highly rigorous 6-month course through Fullstack Academy and passed with a 93.07%.",
            ],
        },
        {
            id:2,
            jobTitle:"Application Developer",
            company:"Dymeng LLC.",
            yearsActive:"May 2022 - Jun 2024 · 2 yrs 2 mos",
            responsibilities:[
                "Tools used: C#, .NET, Vue.js, Balsamiq, Adobe XD, SCSS, CSS, Bootstrap CSS.",
                "Mentored a junior BE developer by helping them remain on task to meet tight deadlines.",
                "Wrote high-quality, reusable, widely adopted VUE.js FE code and SCSS styles which were easily re-used in future projects and boosted the productivity for future developers by 30%.",
                "Designed multiple high-quality, well-received high-fidelity and low-fidelity designs using Adobe XD and Balsamiq that were translated to code."
            ],
        },
        {
            id:3,
            jobTitle:"Associate Web Developer",
            company:"Bluetree/Tegria",
            yearsActive:"Sep 2020 - Feb 2021 · 6 mos",
            responsibilities:[
                "Tools used: C#, .NET, React.js, Balsamiq, Adobe XD, CSS, MSSQL, Bootstrap CSS.",
                "ON DAY ONE, with my positive attitude and strong passion, I single-handedly decreased the development time of this project by 35% getting the entire app ready for the final round of QA in about 3 weeks.",
                "Designed a number of well received UI and UX designs for a multitude of projects including a pricing calculator, and doctor workflow dashboard."
            ],
        }
    ]

    const elementAnimationsList = [
        {
            startPoint:-400,
            animation:"SLIDE_IN_LEFT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                opacity: [0, 1],
            })
        },
        {
            startPoint:400,
            animation:"SLIDE_IN_RIGHT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                opacity: [0, 1],
            })
        },
        {
            startPoint:-400,
            animation:"SLIDE_IN_LEFT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                opacity: [0, 1],
            })
        }
    ];

    const state = reactive({
        // aboutText:ABOUT_TEXT,
        aboutImage:ABOUT_IMAGE,
        aboutResume:ABOUT_ME_RESUME
    });
    
    onMounted(()=>{
        window.scrollTo(0, 0);
    })

</script>
<template>
    <div class="container">
        <PageContainer>
            <!-- <ParagraphContainer class="p-4 rounded-top">
                <div class="row m-0 p-0">
                    <div class="col-12 m-0 p-0">
                        <div class="d-flex flex-column justify-content-center align-items-center w-100 p-2">
                            <div class="w-100">
                                <p class="h4">{{ state.aboutText }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ParagraphContainer> -->
            <ParagraphContainer :styles="{backgroundColor:'rgb(8, 71, 64, 0.2)'}" class="pt2-4 pb-4 rounded-bottom">
                <div class="row m-0">
                    <div class="col-12 m-0 p-0">
                        <AnimatedList
                            :elementsToAnimate="state.aboutResume"
                            :elementAnimations = "elementAnimationsList"
                            :canAnimate = "true"
                        >
                            <template #listElement="{data}">
                                <div class="d-flex border-bottom mt-4 mb-4 justify-content-center w-100 p-2 flex-column">
                                    <h2>{{ data.jobTitle }}</h2>
                                    <h3>{{ data.company }}</h3>
                                    <h4>{{ data.yearsActive }}</h4>
                                    <br/>
                                    <ul>
                                        <li v-for="responsibility in data.responsibilities" class="text-align-left">
                                            {{ responsibility }}
                                        </li>
                                    </ul>   
                                </div>
                            </template>
                        </AnimatedList>
                    </div>
                </div>
            </ParagraphContainer>
        </PageContainer>
    </div>
</template>