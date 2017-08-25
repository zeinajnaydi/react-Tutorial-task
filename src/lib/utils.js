export const partial =  (fn,...args)=>fn.bind(null,...args)

const _pipe= (f,g)=>(...args)=>g(f(...args))

export const pipe = (...fn) => fn.reduce(_pipe)