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
