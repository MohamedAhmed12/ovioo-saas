export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
export const ObjectHasVal = (object: Object, val: any) => Object.values(object).includes(val)