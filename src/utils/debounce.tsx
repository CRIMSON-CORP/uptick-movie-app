export default function debounce(func: (...a: any[]) => void, timeout: number) {
  let timer: ReturnType<typeof setTimeout>;

  return function returnFunction(...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
}
