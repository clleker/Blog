export function setStrLengthLimitByNumber(value,length,force) {
    if (!value) return value;
  
    if (!force && value?.length <= 50) {
      return value;
    }

    return `${value
      ?.replace(/(\r\n|\n|\r)/gm, "") //replace line break varies
      ?.replace(new RegExp(`^(.{${length + 1}}[^\\s]*).*`), //get 50 chars
        "$1",
      )}...`;
  }
