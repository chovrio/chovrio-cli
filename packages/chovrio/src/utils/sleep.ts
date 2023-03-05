export const sleep = (time = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
