export class CurrencyFormatter {
  putDots(valueWithoutCents: string): string {
    const length = valueWithoutCents.length;
    const numberOfDots = Math.floor((length - 1) / 3);
    // dotNumber é o enésimo ponto da direita para esquerda
    for (let dotNumber = 0; dotNumber < numberOfDots; dotNumber++) {
      const position = length - 3 * (dotNumber + 1);
      valueWithoutCents = `${valueWithoutCents.substring(
        0,
        position
      )}.${valueWithoutCents.substring(position, length + dotNumber)}`;
    }
    return valueWithoutCents.toString();
  }

  formatCurrency(newValue: string): string {
    if (!newValue) {
      return "0,00";
    }
    newValue = newValue.replace(",", "");
    if (newValue.substring(0, 1) == "0") {
      newValue = newValue.substring(1, newValue.length);
    }
    const newValueWithoutCents = newValue.substring(0, newValue.length - 2);
    const newValueCents = newValue.substring(
      newValue.length - 2,
      newValue.length
    );
    return `${this.putDots(
      newValueWithoutCents.replaceAll(".", "")
    )},${newValueCents}`;
  }
}
