import Vue from 'vue'
import App from './App.vue'
import './../../plugins/vant'

Vue.config.productionTip = false

Vue.filter('ments', (ment) => {
    switch (ment) {
        case 'office': return '策划部';
        case 'media': return '媒体部';
        case 'workshop': return '雁祉作坊';
        case 'editor': return '编辑部';
        case 'onecho': return 'One Echo';
        case 'president': return '科协主席';
    }
})

new Vue({
    render: h => h(App)
}).$mount('#app')
