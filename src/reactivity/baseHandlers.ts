import { track, trigger } from "./effect"

// 避免每次都实例化get和set
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

function createGetter(isReadonly: any = false) {
    return function get(target: any, key: any) {
        const res = Reflect.get(target, key)
        if (!isReadonly) {
            // 依赖收集
            track(target, key)
        }
        return res
    }
}

function createSetter() {
    return function set(target: any, key: any, value: any) {
        const res = Reflect.set(target, key, value)
        trigger(target, key)
        return res
    }
}

export const mutableHandlers = {
    get,
    set
}

export const readonlyHandlers = {
    get: readonlyGet,
    set(target: any, key: any, value: any) {
        console.warn(`${key} set 失败 因为target是readonly`, target)
        return true
    }
}