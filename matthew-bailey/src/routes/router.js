import { createWebHashHistory, createRouter } from 'vue-router';

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Projects from '../pages/Projects.vue';
import Contact from '../pages/Contact.vue';
import RequestViewing from '../pages/RequestViewing.vue';

const BASE_ROUTE = "/matthewbailey/" 

const routes = [
    { name:"Home", path: "/", component: Home },
    { name:"About", path: "/about", component: About },
    { name:"Projects", path: "/projects/:projectId?", props:true, component: Projects },
    { name:"RequestProjectView", path: "/requestprojectview", query:{projectName:""}, props:true, component: RequestViewing },
    { name:"Contact", path: "/contact", component:Contact}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;