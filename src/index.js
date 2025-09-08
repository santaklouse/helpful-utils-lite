function debounce(func, wait, options = {}) {
    let timeout, result;
    let lastArgs, lastThis;
    let lastCallTime, lastInvokeTime = 0;

    if (!options.leading && options.leading !== false) {
        options.leading = false;
    }
    if (!options.trailing && options.trailing !== false) {
        options.trailing = true;
    }

    const invokeFunc = (time) => {
        result = func.apply(lastThis, lastArgs);
        lastThis = lastArgs = null;
        lastInvokeTime = time;
        return result;
    };

    const startTimer = (pendingFunc, wait) => setTimeout(pendingFunc, wait);

    const shouldInvoke = (time) => {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        return (
            lastCallTime === undefined ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            timeSinceLastInvoke >= wait
        );
    };

    const trailingEdge = (time) => {
        timeout = null;
        if (options.trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = null;
        return result;
    };

    const timerExpired = () => {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timeout = startTimer(timerExpired, wait - (time - lastCallTime));
    };

    function debounced(...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);

        lastArgs = args;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (!timeout && options.leading) {
                return invokeFunc(lastCallTime);
            }
            if (!timeout) {
                timeout = startTimer(timerExpired, wait);
            }
        }
        if (!timeout) {
            timeout = startTimer(timerExpired, wait);
        }
        return result;
    }

    debounced.cancel = () => {
        if (timeout) clearTimeout(timeout);
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timeout = null;
    };

    return debounced;
}

function throttle(func, wait, options = {}) {
    let timeout = null;
    let previous = 0;
    let result;
    let context, args;

    if (!options.leading && options.leading !== false) {
        options.leading = true;
    }
    if (!options.trailing && options.trailing !== false) {
        options.trailing = true;
    }

    const later = () => {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        if (args) {
            result = func.apply(context, args);
            context = args = null;
        }
    };

    function throttled(...params) {
        const now = Date.now();
        if (!previous && options.leading === false) previous = now;
        const remaining = wait - (now - previous);
        context = this;
        args = params;

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    }

    return throttled;
}

function memoize(func, resolver) {
    const cache = new Map();

    function memoized(...args) {
        const key = resolver ? resolver.apply(this, args) : args[0];
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    }

    memoized.cache = cache;
    return memoized;
}
if (typeof module !== 'undefined') {
    console.log(module)
    console.log(module?.exports)
}

window['debounce'] = debounce;
window['throttle'] = throttle;
window['memoize'] = memoize;

export default {
    'debounce': debounce,
    'throttle': throttle,
    'memoize': memoize
};

// for CommonJS
if (typeof module !== 'undefined') {
    module['exports'] = {
        'debounce': debounce,
        'throttle': throttle,
        'memoize': memoize
    };
}
