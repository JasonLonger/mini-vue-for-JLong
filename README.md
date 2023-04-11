✨源码结构

![impicture_20230410_194726](https://user-images.githubusercontent.com/50047690/230895999-9deaab22-ecef-4a1e-902a-0c2de85f5e21.png)

![image](https://user-images.githubusercontent.com/50047690/230896167-400f52cb-cd76-477c-a726-5d6c05b63d47.png)

✅作用：出口，一般运行直接引入就好

![image](https://user-images.githubusercontent.com/50047690/230896228-947d8b78-e58f-4a9c-89a2-89c3ee3b69c1.png)

✅编译时

🔥@vue/compiler-sfc: 将.vue（sfc(单文件组件)）代码编译成 TypeScript 代码，依赖下面两个

🔥vue/compiler-dom、@vue/compiler-core： 将template编译成render函数

![image](https://user-images.githubusercontent.com/50047690/230896527-045e635c-b628-4055-8fd0-39f7c34d7604.png)

✅处理运行时

🔥@vue/runtime-core 核心运行时，所有逻辑基本都在这里，所有的东西都会导出去被使用，包括reactivity

—— —— —— —— —— ——

✨实现Vue3中的核心三大模块： reactivity响应式、runtime运行时、compiler 编译

✅reactivity响应式

![image](https://user-images.githubusercontent.com/50047690/231159356-66d8ae78-2981-432f-83ca-c92d8662b301.png)

✅思路

🔥user是一个响应式对象，里面有个容器（容器收集这个对象所有依赖）通过effect进行依赖收集

🔥其中effect会接收一个fn方法（副作用函数），一上来会调用fn触发get操作，然后触发get操作后，这个响应式对象User里面容器就会收集这个fn，这整个动作叫做依赖收集

🔥当修改user值时候，触发set操作，就会对这个响应式里面容器所有收集的依赖进行call调用，就是触发依赖

🔥依赖收集和触发依赖都是在effect里面
