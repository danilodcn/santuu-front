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
      return this.toString(0);
    }
    const convertedNumber = this.toNumber(value.toString());
    const number = convertedNumber
      .toFixed(dec)
      .replace(".", ",")
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    console.log({ convertedNumber, number });

    return `${suffix ? suffix + " " : ""}` + number;
  }

  resetString(value: string | null) {
    if (value == null) {
      return "0";
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
    const number = value.replace(".", "").replace(",", ".");
    console.log("meu", number);
    return Number(number);
  }
}
