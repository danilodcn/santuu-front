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
