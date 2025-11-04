<script setup>
    import {reactive, ref, onMounted} from "vue";
    import { useRouter } from 'vue-router';

    import Carousel from '../components/UI/Reusable/Carousel.vue';
    import PageContainer from "../components/UI/Reusable/PageContainer/PageContainer.vue";
    import ParagraphContainer from "../components/UI/Reusable/ParagraphContainer.vue";
    import AnimatedColumns from "../components/UI/Reusable/AnimatedColumns/AnimatedColumns.vue";
    import NormalList from "../components/UI/Reusable/NormalList.vue";
    import LevelBar from "../components/UI/Custom/LevelBar.vue";
    
    const router = useRouter();
    const HOME_IMAGE = "./images/owner-image.png"
    const HOME_MESSAGE = `
      Well hello, there! My name is Matthew Bailey.
      I am a software developer with 6 years of experience and currently 
      expanding my horizons in machine learning and AI with a strong 
      focus on specializing in RAG AI technologies.With my strong creative 
      problem solving skills, and my ability to learn new tech quickly, 
      I look forward to helping you achieve all of your busniess goals and delivering 
      quality products make an impact for your organization.
    `;

    const generateRange = (start, stop, step) => {
      const arrLength = (stop - start) / step + 1 - 1;
      const indicies = [];
      for (let i = 0; i < arrLength; i++) {
        indicies.push(start + i * step);
      }

      return indicies;
    };

    const HOME_TITLE = `Hi there!`;
    const SKILLS_LIST = [
      {
        id:0,
        skillName:"HTML",
        skillLevel:5
      },
      {
        id:1,
        skillName:"CSS",
        skillLevel:5
      },
      {
        id:2,
        skillName:"JavaScript",
        skillLevel:5
      },
      {
        id:3,
        skillName:"Python",
        skillLevel:4
      },
      {
        id:4,
        skillName:"Vue.js",
        skillLevel:5
      },
      {
        id:5,
        skillName:"React.js",
        skillLevel:4
      },
      {
        id:6,
        skillName:"Node.js",
        skillLevel:4
      },
      {
        id:7,
        skillName:"PostgreSQL",
        skillLevel:3
      },
      {
        id:8,
        skillName:"Firebase",
        skillLevel:3
      },
      {
        id:9,
        skillName:"Machine Learning",
        skillLevel:3
      },
      {
        id:10,
        skillName:"LLMS",
        skillLevel:3
      },
      {
        id:11,
        skillName:"Deep Learning",
        skillLevel:3
      }
    ];

    const state = reactive({
      homeTagline:HOME_MESSAGE,
      homeTitle:HOME_TITLE,
      homeImage:HOME_IMAGE,
      skillsColumns:SKILLS_LIST,
      renderedColumns:[]
    });

    const scrollContainer = ref(null);

    const elementAnimationsList = [
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
            startPoint:-400,
            animation:"SLIDE_IN_RIGHT",
            animationParams:(parentPos)=>({
                translateX:parentPos+400,
                duration:2000,
                opacity: [0, 1],
            })
        }
    ];

    //NOTE these are the same projects that are used on the projects page.
    const carouselSlides = ref([
        {
            id:1,
            projectImage:"./images/turnover.jpg",
            projectName:"Employee Turnover Analyzer",
            projectDescription:"Employee retention is important! Click below to learn more how I solved this problem using the power of AI and Machine Learning!"
        },
        {
            id:2,
            projectImage:"./images/wheels-560751_640.jpg",
            projectName:"Bike Ease Hourly Rental Forecast Machine Learning Pipeline",
            projectDescription:"Ah, figuring out a way to boost seasonal rental revenue! A not so fun task! Well, AI can help speed this up too! Check it out!"
        },
        {
            id:3,
            projectImage:"./images/low-customer-satisfaction.jpg",
            projectName:"Streamlining the Customer Grievance Process",
            projectDescription:"Routing complaints to the appropriate department shoouldn't be difficult. Check out how I solved it with AI!"
        }
    ]);
  
    const goToProject = (item)=> router.push({name:"Projects", params:{projectId:item.id}});

    const divideUpSkillsLists = ({columnCount, arrayLength, stateValue}) =>{
      const dividedUpSkillsListValue = Math.floor(arrayLength / columnCount);
      const columnIndicies = generateRange(0, arrayLength, dividedUpSkillsListValue);
      
      const newColumns = [];

      let currentColumnData = [];

      for(let i = 0; i < state.skillsColumns.length; i++){
        currentColumnData.push(state.skillsColumns[i]);

        if(columnIndicies.includes(i)){
          newColumns.push({columns:currentColumnData});
          currentColumnData = [];
        }
      }

      state[stateValue] = newColumns;
    };

    onMounted(()=>{
      divideUpSkillsLists({
        columnCount:2, 
        arrayLength:state.skillsColumns.length, 
        stateValue:"renderedColumns"
      });
    });
</script>

<template>
  <div class="row">
    <div ref="scrollContainer" id="scrollContainer" class="col-12">
      <PageContainer>
          <ParagraphContainer class="p-4 rounded-top">
            <div class="row m-0 p-0">
                    <div class="col-12 m-0 p-0">
                        <div class="d-flex flex-column justify-content-center align-items-center w-100 p-2">
                            <div class="user-image w-100 d-flex align-items-center justify-content-center mt-4 mb-4">
                                <img height="220" width="220" class="image-accent" :src="state.homeImage" alt="picture of matt bailey's awesomeness"/>
                            </div>
                            <a href="https://github.com/Baraiboapex?tab=repositories" class="btn btn-light mt-4 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                                </svg>
                                <span>&nbsp;</span>
                                View Github
                            </a>
                            <div class="w-100">
                                <p class="h4">{{ state.homeTagline }}</p>
                            </div>
                        </div>
                    </div>
            </div>
          </ParagraphContainer>
          <ParagraphContainer class="p-4 rounded-top">
            <div class="row m-0">
              <div class="row m-0">
                <div class="col-12">
                    <AnimatedColumns
                      :elementsToAnimate="state.renderedColumns"
                      :elementAnimations = "elementAnimationsList"
                      :canAnimate = "true"
                      :parentScrollContainer="scrollContainer"
                    >
                      <template #columnElement="{data}">
                        <NormalList
                          :listItems="data"
                          :loadingList="false"
                          :listHasError="false"
                          :itemNameField="false"
                          :isOrderdList="false"
                        >
                          <template #list-content="{data}">
                            <div class="d-flex flex-row ">
                              <h4>{{ data.skillName }}</h4>
                              <span>&nbsp;</span>
                              <LevelBar
                                :barLevel="data.skillLevel"
                                :barColor="'white'"
                              />
                            </div>
                          </template>
                        </NormalList>
                      </template>
                    </AnimatedColumns>
                </div>
              </div>
            </div>
          </ParagraphContainer>
          <ParagraphContainer :styles="{backgroundColor:'rgb(8, 71, 64, 0.2)'}" class="pt2-4 pb-4 rounded-bottom">
            <div class="row m-0">
              <div class="col-12 m-0 pt-2 pb-2 d-flex flex-column justify-content-center text-center">
                    <h1 class="m-5">My Most Recent Projects</h1>
                    <hr class="border border-light"/>
                    <Carousel 
                      :slides="carouselSlides"
                    >
                      <template #customItems="{data}">
                          <button class="btn btn-light" @click="goToProject(data)"> View Project </button>
                      </template> 
                    </Carousel>
                </div>
            </div>
          </ParagraphContainer>
      </PageContainer>
    </div>
  </div>
</template>

