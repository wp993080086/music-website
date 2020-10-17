import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Home = () => import ("@/page/home.vue");
const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "home",
        component: Home,
    },
    // {
    //     path: "/Courselist",
    //     name: "Courselist",
    //     component: Courselist,
    //     children: [{
    //             path: "myCourses",
    //             name: "myCourses",
    //             component: myCourses,
    //         },
    //         {
    //             path: "upvideo",
    //             name: "upvideo",
    //             component: upvideo,
    //         },
    //     ],
    // }
];

const router = new VueRouter({
    mode: "hash",
    routes,
});

export default router;