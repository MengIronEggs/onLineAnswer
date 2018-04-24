import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const QuestionList = resolve => require(['../components/QuestionList.vue'], resolve);
const index = resolve => require(['../views/index.vue'], resolve);
const Start = resolve => require(['../views/start.vue'], resolve);
const Msg = resolve => require(['../views/msg.vue'], resolve);
const End = resolve => require(['../views/end.vue'], resolve);
const error = resolve => require(['../components/error.vue'], resolve);
const explain = resolve => require(['../views/explain.vue'], resolve);
const companylist = resolve => require(['../views/companyList.vue'], resolve);
const companylistdetials = resolve => require(['../views/companyListDetials.vue'], resolve);
const last = resolve => require(['../views/last.vue'], resolve);

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index
    },{
        path: '/index',
        name: 'index',
        component: index
    },{
        path: '/start',
        name: 'Start',
        component: Start
    },
    {
        path: '/question',
        name: 'QuestionList',
        component: QuestionList
    }, {
        path: '/msg',
        name: 'msg',
        component: Msg
    }, {
        path: '/end',
        name: 'end',
        component: End
    }, {
        path: '/error',
        name: 'error',
        component: error
    }, {
        path: '/explain',
        name: 'explain',
        component: explain
    }, {
        path: '/companylist',
        name: 'companylist',
        component: companylist,
        meta: { keepAlive: true }
    }, {
        path: '/companylistdetials',
        name: 'companylistdetials',
        component: companylistdetials
    }, {
        path: '/last',
        name: 'last',
        component: last
    }]
})