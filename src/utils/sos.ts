export const STATUS_NUMBER = {
  OPEN: 0,
  PROGRESS: 1,
  TRAVEL: 2,
  REPAIR: 3,
  FINISHED: 4,
  CANCELED: 5,
};

export const status = [
  {
    status_text: "Aguardando mecânico",
    status: [STATUS_NUMBER.OPEN, STATUS_NUMBER.PROGRESS],
    position: 0,
  },
  {
    status_text: "Mecânico a caminho",
    status: [STATUS_NUMBER.TRAVEL],
    position: 1,
  },
  {
    status_text: "Mecânico chegou no local",
    status: [STATUS_NUMBER.REPAIR],
    position: 2,
  },
].sort((a, b) => {
  return a.position > b.position ? 1 : -1;
});
export const status_finished = [
  {
    status_text: "Aguardando mecânico",
    status: [STATUS_NUMBER.OPEN, STATUS_NUMBER.PROGRESS],
    position: 0,
  },
  {
    status_text: "Mecânico não encontrado",
    status: [STATUS_NUMBER.FINISHED],
    position: 1,
  },
].sort((a, b) => {
  return a.position > b.position ? 1 : -1;
});

export const user_types = {
  cyclist: 98,
  mechanic: 99,
};

export const items = [
  { name: "Regulagem de selim", id: 1 },
  { name: "Regulagem de marcha", id: 2 },
  { name: "Regulagem de câmbio", id: 3 },
  { name: "Regulagem de guidão", id: 4 },
  { name: "Regulagem de mesa", id: 5 },
  { name: "Aperto de mesa", id: 6 },
  { name: "Aperto de pedal", id: 7 },
  { name: "Aperto de roda", id: 8 },
  { name: "Aperto de direção", id: 9 },
  { name: "Aperto de mov. central", id: 10 },
  { name: "Aperto de pedivela", id: 11 },
  { name: "Aperto de sup. de garrafa", id: 12 },
  { name: "Reparo de acessórios", id: 13 },
  { name: "Reparo de câmbio", id: 14 },
  { name: "Reparo de eixo", id: 15 },
  { name: "Reparo de câmara", id: 16 },
  { name: "Reparo de corrente", id: 17 },
  { name: "Reparo de pneu", id: 18 },
  { name: "Calibragem de pneu", id: 19 },
  { name: "Lubrificação de corrente", id: 20 },
  { name: "Troca de selim", id: 21 },
  { name: "Outros serviços", id: 22 },
];

export function getLocImage(lat: number, lng: number, apiKey: string) {
  return `https://maps.googleapis.com/maps/api/staticmap?\
                        center=${lat},${lng}\
                        &zoom=17&size=400x400\
                        &markers=color:red%7Clabel:C%7C${lat},${lng}\
                        &key=${apiKey}`;
}

export const order_status_choices = {
  open: "open",
  progress: "progress",
  travel: "travel",
  repair: "repair",
  finished: "finished",
  canceled: "canceled",
};
