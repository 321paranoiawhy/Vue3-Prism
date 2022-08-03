// import index.js
import Vue3Prism from "@/plugin/index.js";

import { App } from 'vue';

// store all components in an array
const components = [Vue3Prism];

// define install function
const install = (App) => {
    // 1. if installed, return
    if (install.installed) return;

    // 2. global registration for all components in components array
    components.map((component) => {
        App.component(component.name, component)
    });

    if (typeof window != 'undefined' && window.Vue) {
        install(window.Vue);
    }
}

export default {
    // object must have install function
    // so that it can be used like this: Vue.use()
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    // component to be exported
    Vue3Prism,
}