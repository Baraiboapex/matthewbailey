<script setup>
    import { RouterLink } from 'vue-router';
    import { reactive, ref } from 'vue';
    import { animate } from 'animejs';

    const state = reactive({
      currentSliderPage:""
    });

    const pageSlider = ref(null);

    const home = ref(null);
    const about = ref(null);
    const projects = ref(null);
    const contact = ref(null);
    const parentContainer = ref(null);

    const pageLinkRefs = {
      home,
      about,
      projects,
      contact
    };

    const moveSelectionSliderToPageName = ()=>{
      const pageSliderRef = pageSlider?.value;
      const currentPageLink = pageLinkRefs[state.currentSliderPage]?.value;
      const parentContainerRef = parentContainer?.value
      
      let hasElements = pageSliderRef && currentPageLink && parentContainerRef;

      if(hasElements){
        const containerBoundingBox = parentContainerRef.getBoundingClientRect();
        const destinationLinkBoundingBox = currentPageLink.getBoundingClientRect();
        const destinationLoc = (destinationLinkBoundingBox.left - containerBoundingBox.left);
        const newSliderPositionX = destinationLoc > 0 ? destinationLoc - 25 : 0;
          animate(
            pageSliderRef
            ,{
            translateX:newSliderPositionX,
            duration:977,
          });
      }
    };

    const selectCurrentPage = (event)=>{
      state.currentSliderPage = event.currentTarget.id;
      console.log("ID =>",state.currentSliderPage);
      moveSelectionSliderToPageName();
    };

</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-dark blur feather-edges w-100 m-0 fixed-top">
  <div class="container-fluid"  >
    <RouterLink class="navbar-brand disabled-link"  v-slot="{ href, navigate }" to="/">
      <a
        :href="href"
        @click="(e)=>{e.preventDefault(); navigate(); selectCurrentPage(e)}"
        ref="home"
        id="home"
        class="navbar-brand text-light"
      >
        Matthew Bailey
      </a>
    </RouterLink>
    <button class="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" style="color:white"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="w-100 d-flex flex-column justify-content-end">
        <div ref="parentContainer" id="parentContainer" class="ms-auto w-auto">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink custom class="text-decoration-none pointer-events-none cursor-not-allowed" 
 v-slot="{ href, navigate }" to="/">
                <a
                  :href="href"
                  @click="(e)=>{e.preventDefault(); navigate(); selectCurrentPage(e)}"
                  ref="home"
                  id="home"
                  class="header-link text-light m-4 text-decoration-none"
                >
                  Home
                </a>
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink custom class="text-decoration-none pointer-events-none cursor-not-allowed"  v-slot="{ href, navigate }"  to="/about">
                <a
                  :href="href"
                  @click="(e)=>{e.preventDefault(); navigate(); selectCurrentPage(e)}"
                  ref="about"
                  id="about"
                  class="header-link text-light m-4 text-decoration-none"
                >
                  About
                </a>
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink custom class="text-decoration-none pointer-events-none cursor-not-allowed"  v-slot="{ href, navigate }" to="/projects">
                <a
                  :href="href"
                  @click="(e)=>{e.preventDefault(); navigate(); selectCurrentPage(e)}"
                  ref="projects"
                  id="projects"
                  class="header-link text-light m-4 text-decoration-none"
                >
                  Projects
                </a>
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink custom class="text-decoration-none pointer-events-none cursor-not-allowed"  v-slot="{ href, navigate }" to="/contact">
                <a
                  :href="href"
                  @click="(e)=>{e.preventDefault(); navigate(); selectCurrentPage(e)}"
                  ref="contact"
                  id="contact"
                  class="header-link text-light m-4 text-decoration-none"
                >
                  Contact
                </a>
              </RouterLink>
            </li>
          </ul>
          <div class="d-sm-none d-md-none d-lg-block" ref="pageSlider" id="pageSelector"></div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
<style lang="scss" scoped>
  #pageSelector{
    position: relative;
    height:0.03em;
    width:3em;
    background-color: aliceblue;
    border-bottom:0.1rem solid white;
    margin:0.1em 1.5em 0 1.5em;
  }
  .navbar-toggler {
    border: none;
    box-shadow: none; /* Optional: removes the focus ring */
  }
</style>