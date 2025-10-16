<script setup>
    import {reactive, ref} from "vue";
    import { useRouter } from 'vue-router';

    import Carousel from '../components/UI/Reusable/Carousel.vue';
    import PageContainer from "../components/UI/Reusable/PageContainer/PageContainer.vue";
    import ParagraphContainer from "../components/UI/Reusable/ParagraphContainer.vue";
    import ParticleBackground from "../layouts/Backgrounds/ParticleBackground.vue";
    import { BG_PARTICLES_CONFIG } from "../layouts/Backgrounds/particleConfig";

    const router = useRouter();

    const HOME_MESSAGE = `
      Hello, my friend! My name is Matthew Bailey! Welcome to my portfolio site!
      Feel free to browse its content! See something you like? Drop me an email
      in the contact section! 
    `;

    const HOME_TITLE = `Hi there!`;

    const state = reactive({
      homeTagline:HOME_MESSAGE,
      homeTitle:HOME_TITLE
    });

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

</script>

<template>
  <PageContainer>
      <ParagraphContainer class="p-4 rounded-top">
        <div class="row m-0">
          <div class="col-12 p-0 pt-2 pb-2">
              <div class="d-flex flex-column p-2 m-0">
                <h1>{{ state.homeTitle }}</h1>
                <h4>{{ state.homeTagline }}</h4>
              </div>
          </div>
        </div>
      </ParagraphContainer>
      <ParagraphContainer :styles="{backgroundColor:'rgb(8, 71, 64, 0.2)'}" class="pt2-4 pb-4 rounded-bottom">
    <div class="row">
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
</template>

