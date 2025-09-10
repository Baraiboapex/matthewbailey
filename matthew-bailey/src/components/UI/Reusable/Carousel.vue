<script setup>
    import {computed, reactive} from "vue";
    
    const events = defineEmits([
        "on-item-selected"
    ]);

    const props = defineProps({
        slides:Array,
    });
    
    const INITIAL_ACTIVE_SLIDE = 0;

    const carouselButtonCount = computed(()=>props.slides.length);

</script>
<template>
        <div id="carouselExampleIndicators" class="carousel slide d-flex flex-column m-0" data-bs-ride="carousel">
            <div class="carousel-indicators mb-0">
                <button 
                    v-for="(button, index) in carouselButtonCount"
                    data-bs-target="#carouselExampleIndicators"
                    :class="{ active: INITIAL_ACTIVE_SLIDE === index }" 
                    :data-bs-slide-to="index" 
                    :aria-current="activeSlide == index" 
                    :aria-label="'Slide' + (index+1)"
                    type="button" 
                ></button>
            </div>
            <div class="carousel-inner">
                <div v-for="(slide, index) in props.slides" :class="['carousel-item', { active: INITIAL_ACTIVE_SLIDE === index }]">
                    <div class="w-100 d-flex justify-content-center align-items-center flex-column p-4 bg-secondary">
                        <img :src="slide.projectmage"/>
                        <h3>{{slide.projectName}}</h3>
                        <p v-if="slide.projectDescription">{{ slide.projectDescription}}</p>
                        <div class="d-flex justify-content-center mb-">
                            <slot name="customItems" :data="slide"></slot>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon text-dark" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon text-dark" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
</template>