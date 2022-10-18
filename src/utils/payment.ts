function getCardType(number: string) {
  // Elo
  //https://gist.githubusercontent.com/gusribeiro/263a165db774f5d78251/raw/00144bfd780760d999f8ad9ecb1393ed92467ec7/iin_card
  let re = new RegExp(
    "^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^504175|^627780|^63(6297|6368|6369)|(65003[5-9]|65004[0-9]|65005[01])|(65040[5-9]|6504[1-3][0-9])|(65048[5-9]|65049[0-9]|6505[0-2][0-9]|65053[0-8])|(65054[1-9]|6505[5-8][0-9]|65059[0-8])|(65070[0-9]|65071[0-8])|(65072[0-7])|(65090[1-9]|6509[1-6][0-9]|65097[0-8])|(65165[2-9]|6516[67][0-9])|(65500[0-9]|65501[0-9])|(65502[1-9]|6550[34][0-9]|65505[0-8])|^(506699|5067[0-6][0-9]|50677[0-8])|^(509[0-8][0-9]{2}|5099[0-8][0-9]|50999[0-9])|^65003[1-3]|^(65003[5-9]|65004d|65005[0-1])|^(65040[5-9]|6504[1-3]d)|^(65048[5-9]|65049d|6505[0-2]d|65053[0-8])|^(65054[1-9]|6505[5-8]d|65059[0-8])|^(65070d|65071[0-8])|^65072[0-7]|^(65090[1-9]|65091d|650920)|^(65165[2-9]|6516[6-7]d)|^(65500d|65501d)|^(65502[1-9]|6550[3-4]d|65505[0-8])"
  );
  if (number.match(re) != null) return "ELO";

  // visa
  re = new RegExp("^4");
  if (number.match(re) != null) return "VISA";
  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|5[1-5][0-9]{18}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number
    )
  )
    return "MASTERCARD";
  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) != null) return "AMEX";
  // Discover
  re = new RegExp(
    "^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"
  );
  if (number.match(re) != null) return "DISCOVER";
  // Diners
  re = new RegExp("^36");
  if (number.match(re) != null) return "DINERS";
  // Diners - Carte Blanche
  re = new RegExp("^30[0-5]");
  if (number.match(re) != null) return "DINERS";
  // JCB
  re = new RegExp("^35(2[89]|[3-8][0-9])");
  if (number.match(re) != null) return "JCB";
  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (number.match(re) != null) return "VISA";

  // HIPERCARD
  re = new RegExp(/^(606282\d{10}(\d{3})?)|(3841\d{15})/);
  if (number.match(re) != null) return "HIPERCARD";

  return "";
}

function getNumberOfDigitsInSecurityCode(cardNumber: string) {
  const cardType = getCardType(cardNumber);
  const TYPES_WITH_4_DIGITS = ["AMEX"];
  let type;
  for (type of TYPES_WITH_4_DIGITS) {
    if (cardType == type) {
      return 4;
    }
  }
  return 3;
}

export { getCardType, getNumberOfDigitsInSecurityCode };
