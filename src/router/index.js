import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FriendsView from '@/views/FriendsView.vue'
import PresentsView from '@/views/PresentsView.vue'
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/friends",
    name: "friends",
    component: FriendsView,
  },
  {
    path: "/presents",
    name: "presents",
    component: PresentsView,
  },
  {
    path: "/assignments",
    name: "assignments",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/AssignmentsView.vue"),
			// meta:{
			// 	requireAuth:true
			// },
  },
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
 

export default router;
