<script setup>
    import {reactive, onMounted, watch} from "vue";
    import { useRoute } from 'vue-router';
    
    import PageContainer from "../components/UI/Reusable/PageContainer/PageContainer.vue";
    import ParagraphContainer from "../components/UI/Reusable/ParagraphContainer.vue";
    import AnimatedList from "../components/UI/Reusable/AnimatedScrollingContainer/AnimatedList.vue";

    const route = useRoute();

    const PROJECTS_LIST = [
        {
            id:1,
            projectImage:"./images/turnover.jpg",
            projectName:"Employee Turnover Analyzer",
            projectDescription:`I decided to upskill in AI and ML by taking an AI bootcamp. Here is one of my projects that I am most proud of that I for the class. I was tasked with creating a machine learning pipeline for analyzing employee turnover at a fictional company and come up with retention policies for their workflow. The task involved a great deal of highly involved data wrangling and feature engineering using the python "pandas" library in order to preprocess the necessary rows and columns before being fed to 3 different machine learning models of which are a "plain-old" logistic regression model, a random forest classifier model, and a gradient boost model. 

It was also imperative that I utilized data balancing techniques to mitigate the risk of overfitting on the data set by using SMOTE to accentuate the minority classes to get proper results for all 3 models.`,
            projectLink:"https://github.com/Baraiboapex/Employee-Turnover-Analyzer",
        },
        {
            id:2,
            projectImage:"./images/wheels-560751_640.jpg",
            projectName:"Bike Ease Hourly Rental Forecast Machine Learning Pipeline",
            projectDescription:`
            In this project, I was tasked with creating an hourly rental forcaster for a fictional bike company. This involved selecting relevant features and applying scaling techniques to make the data more uniform for consumption by another set of logistic regression models.

The different logistic regression models include:

Linear Regression
Ridge Regression (L2 Regularization)
Lasso Regression (L1 Regularization)
Elastic Net Regression

After completing the analysis, I then gave a report of what can be done to increase the rental quantity during certain seasons.
            `,
            projectLink:"https://github.com/Baraiboapex/Bike-Ease-Hourly-Rental-Forecast-Machine-Learning-Pipeline",
        },
        {
            id:3,
            projectImage:"./images/low-customer-satisfaction.jpg",
            projectName:"Streamlining the Customer Grievance Process",
            projectDescription:`
                For this project, I was tasked with creating a complaint trafficking 
                pipeline for a fictional bank using feature engineering and a good amount of data wrangling along 
                with text preprocessing techniques to prepare data to be fed to 2 different models. 
                The dual-model architecture consists of a balanced random forest classifier in order 
                to determine which department the complaint goes to, and a vader sentiment class to 
                determine the "severity" of the complaint, which can then be modified later to include both 
                topic modeling and perhaps custom keywords to further increase the accuracy of the severity 
                predictions.`,
            projectLink:"https://github.com/Baraiboapex/Streamlining-the-Customer-Grievance-Process"
        },
        {
            id:4,
            projectImage:"./images/jax-tides-image.png",
            projectName:"Jax Tides",
            projectDescription:`
                A while ago, I built a nice little legacy react application that involved having to load data 
                from an external source (the NOAA tides preditction site) and display it in a convenient
                little application to easily get the readout for the future tidal information. However, 
                acquiring this information was no easy task. I had to deploy a node.js proxy server in order to 
                fix a CORS issue with loading the data from an external source. I then had to perform heavy data
                cleansing to display the data in an easy-to-read format. It was a great first stepping stone into
                what I had to deal with when workin with data cleansing for machine learning!
            `,
            projectLink:"https://baraiboapex.github.io/jax-tides/"
        }
    ];

    const elementAnimationsList = [
        {
            id:1,
            startPoint:400,
            animation:"SLIDE_IN_LEFT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                opacity: [0, 1],
            })
        },
        {
            id:2,
            startPoint:-400,
            animation:"SLIDE_IN_RIGHT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                opacity: [0, 1],
            })
        },
        {
            id:3,
            startPoint:400,
            animation:"SLIDE_IN_LEFT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                opacity: [0, 1],
            })
        },
        {
            id:3,
            startPoint:-400,
            animation:"SLIDE_IN_RIGHT",
            animationParams:(parentPos)=>({
                translateX:parentPos,
                duration:2000,
                opacity: [0, 1],
            })
        },
    ];

    const state = reactive({
        currentProjects:PROJECTS_LIST,
        elementAnimationsList:elementAnimationsList
    });

    const selectProject = (projectId) => {
        const selectedProject = state.currentProjects.filter(item => item.id === parseInt(projectId));
        const selectedProjectAnimations = state.elementAnimationsList.filter(item => item.id === parseInt(projectId));
        state.currentProjects = selectedProject;
        state.elementAnimationsList.value = selectedProjectAnimations;
    };

    const resetProjectSelection = ()=>{
        state.currentProjects = PROJECTS_LIST;
        state.elementAnimationsList = elementAnimationsList;
    }

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

    watch(
        () => route.params.projectId,
        (newId, oldId) => {
            if(newId === ""){
                resetProjectSelection()
            }
        }
    );

    onMounted(()=>{
        if(route.params.projectId){
            selectProject(route.params.projectId);
            scrollToSelectedProject(route.params.projectId);
        }
    });
</script>
<template>
    <div class="container">
        <PageContainer>
            <ParagraphContainer :styles="{backgroundColor:'rgb(8, 71, 64, 0.2)'}" class="rounded-bottom">
                <div class="row m-0">
                    <div class="col-12 m-0 p-2">
                        <div id="myProjectsRef">
                            <div class="row m-0">
                                <div class="col-12">
                                    <AnimatedList
                                        :elementsToAnimate="state.currentProjects"
                                        :elementAnimations = "state.elementAnimationsList"
                                        :canAnimate = "!route.params.projectId"
                                    >
                                        <template #listElement="{data}">
                                            <div class="flex-fill border-bottom p-2">
                                                <div class="row mt-4 mb-4">
                                                    <div class="col-lg-6">
                                                        <img :src="data.projectImage" class="project-image square-image-accent p-2"/>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <div class="mt-3 d-flex flex-column flex-fill">
                                                            <h2>{{ data.projectName }}</h2>
                                                            <p>{{ data.projectDescription }}</p>
                                                            <a class="btn btn btn-light w-50" :href="data.projectLink">
                                                                View Project
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </AnimatedList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ParagraphContainer>
        </PageContainer>
    </div>
</template>