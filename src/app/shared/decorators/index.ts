export function Emoji() {
  return (target: object, key: string | symbol) => {
    let val = target[key];

    const getter = () => {
      return val;
    };

    const setter = value => {
      console.log('ๆดๆฐ่กจๆ');
      val = `๐ ${value} ๐`;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

export function Confirmable(message: string) {
  return (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const original = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const allow = window.confirm(message);
      if (allow) {
        const result = original.apply(this, args);
        return result;
      }
      return null;
    };
    return descriptor;
  };
}
