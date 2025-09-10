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
      <div class="col-12 m-0 pt-2 pb-2">
            <Carousel 
              :slides="carouselSlides"
            >
              <template #customItems="{data}">
                  <button class="btn btn-light" @click="goToProject(data)"> View {{ data.projectName }}</button>
              </template> 
            </Carousel>
        </div>
      </div>
      </ParagraphContainer>
  </PageContainer>
</template>

