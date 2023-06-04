export const timeout = (time: number) =>
  new Promise(res => setTimeout(() => res(true), time))
