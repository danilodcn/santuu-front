export class CurrencyFormatter {
  toString(
    value: number | null,
    dec: number | null = null,
    suffix = ""
  ): string {
    if (dec == null) {
      dec = 0;
    }
    if (value == null) {
      return "";
    }
    const convertedNumber = this.toNumber(value.toString());
    const number = convertedNumber
      .toFixed(dec)
      .replace(".", ",")
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

    return `${suffix ? suffix + " " : ""}` + number;
  }

  resetString(value: string | null) {
    if (value == null) {
      return "";
    }

    return value
      .replace(".", "")
      .replace(",", ".")
      .replace(/[^\d.-]/g, "");
  }

  toNumber(value: string | null) {
    if (value == null) {
      return 0;
    }

    const number = value;
    return Number(number);
  }
}
