class ReactiveEffect {
    private _fn: any

    constructor(fn: any, public scheduler?: any) {
        this._fn = fn
    }
    
    run() {
        activeEffect = this
        return this._fn()
    }
}

const targetMap = new Map()
export function track(target: any, key: any) {
    // target -> key -> dep
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Set()
        depsMap.set(key, dep)
    }

    dep.add(activeEffect)
}

export function trigger(target: any, key: string | symbol) {
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)

    for(const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler()
        } else {
            effect.run()
        }
    }
}

let activeEffect: any // 副作用函数实例类
export function effect(fn: any, options: any = {}) {
    // fn
    const scheduler = options.scheduler
    const _effect = new ReactiveEffect(fn, scheduler)

    _effect.run()

    return _effect.run.bind(_effect)
}