export function throttle(
    fn: (...params: any) => any,
    delay: number,
    immediate = false
) {
    if (immediate) {
        let prevTime = 0;
        return function (this: any, ...args: any) {
            const nowTime = Date.now();
            if (nowTime - prevTime >= delay) {
                fn.apply(this, args);
                prevTime = nowTime;
            }
        };
    } else {
        let timer: number | null;
        return function (this: any, ...args: any) {
            if (timer) return;
            timer = window.setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, delay);
        };
    }
}

export const isMobile = /Mobi|Android|iPhone/i.test(window.navigator.userAgent);
