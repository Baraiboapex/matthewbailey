<script setup>
    import { reactive ,onMounted } from 'vue';
    
    import PageContainer from '../components/UI/Reusable/PageContainer/PageContainer.vue';
    import ParagraphContainer from '../components/UI/Reusable/ParagraphContainer.vue';
    import AnimatedList from "../components/UI/Reusable/AnimatedScrollingContainer/AnimatedList.vue";

    const ABOUT_IMAGE = "./images/owner-image.png"
    const ABOUT_TEXT = `
        Below is my resume of my most recent work experience! With my diverse array of experience,
        and my high adaptability, I would be an invaluable asset in any fast-moving environment!
    `;
    const ABOUT_ME_RESUME = [
        {
            id:1,
            jobTitle:"Senior Application Developer",
            company:"Stealth Startup",
            yearsActive:"Jul 2024 - Present · 1 yr 2 mos",
            responsibilities:[
                "Studied AI and machine learning in Fullstack Academy and passed with a 93.07%",
                "Built and maintained Node.js microservices with Firebase backend and Vue.js frontend",
                "Deployed scalable application instances using Docker containers",
                "Implemented CI/CD pipelines with GitHub Actions and Azure Pipelines (YAML)",
                "Developed Google Apps Script functions to sync Google Sheets data with deployed services, later migrated to Node.js microservices",
                "Applied project management tools to coordinate development and delivery timelines",
                "Studied and prototyped AI/ML integrations to enhance productivity and prepare for future product launches"
            ],
        },
        {
            id:2,
            jobTitle:"Application Developer",
            company:"Dymeng LLC.",
            yearsActive:"May 2022 - Jun 2024 · 2 yrs 2 mos",
            responsibilities:[
                "I was responsible for building multiple web applications using my strong background in javascript and front end development to build highly adaptable FE architecture to boost productivity for other developers. And also began to build up my skill set with mentoring newer developers, of which is something that I am deeply passionate about.",
                "Mentored a junior BE developer by helping them remain on task to meet tight deadlines.",
                "Wrote reusable VUE.js FE code and SCSS styles.",
                "Designed multiple high-quality, well-received high-fidelity and low-fidelity designs using Adobe XD and Balsamiq that were translated to code."
            ],
        },
        {
            id:3,
            jobTitle:"Associate Web Developer",
            company:"Bluetree/Tegria",
            yearsActive:"Sep 2020 - Feb 2021 · 6 mos",
            responsibilities:[
                "Aided in updating a well-tested, cross-browser, multi-tenant, multi-paged call center intake tool using React.js and C# Web API’s with JSON web tokens while under a tight schedule.",
                "ON DAY ONE, with my positive attitude and strong passion, I single-handedly decreased the development time of this project by 35% getting the entire app ready for the final round of QA in about 3 weeks."
            ],
        },
        {
            id:0,
            jobTitle:"Junior Web App Developer",
            company:"Jacksonville Transportation Authority",
            yearsActive:"Jul 2018 - April 2020 · 1 yr 10 mos",
            responsibilities:[
                "Aided in building a powerful company-wide metrics calculculation web application that was focused on replacing legacy code with a more modern tech stack in React.js and C#. ",
                "85% of the front-end code was my own handwriting and carefully battle-tested for bugs and edge cases. ",
                "I was also responsible for an entire UI/UX overhaul as the system matured and used Adobe XD to design High-Fidelity mock-ups for the second version of the application which were praised heavily by the VP of business intelligence.",
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
    ];

    const state = reactive({
        aboutText:ABOUT_TEXT,
        aboutImage:ABOUT_IMAGE,
        aboutResume:ABOUT_ME_RESUME
    });
    
    onMounted(()=>{
        window.scrollTo(0, 0);
    })

</script>
<template>
    <PageContainer>
        <ParagraphContainer class="p-4 rounded-top">
            <div class="row m-0 p-0">
                <div class="col-12 m-0 p-0">
                    <div class="d-flex flex-column justify-content-center align-items-center w-100 p-2">
                        <div class="w-100">
                            <p class="h4">{{ state.aboutText }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ParagraphContainer>
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
</template>