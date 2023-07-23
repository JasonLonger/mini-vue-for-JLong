class ReactiveEffect {
    private _fn: any
    deps = []; // 所有依赖项
    public scheduler: Function | undefined
    constructor(fn: any, scheduler?: Function) {
        this._fn = fn
        this.scheduler = scheduler
    }
    run () {
        activeEffect = this
        return this._fn()
    }
    stop () {
        cleanupEffect(this)
    }
}

function cleanupEffect(effect: any) {
    effect.deps.forEach((dep: any) => {
        dep.delete(effect)
    })
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
    if (activeEffect) activeEffect.deps.push(dep) // 反向收集，用于stop
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

    const runner: any =  _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}

export function stop (runner: any) {
    runner.effect.stop()
}