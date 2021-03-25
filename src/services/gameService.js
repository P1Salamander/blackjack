const url = "https://deckofcardsapi.com/api/deck";

export const getDeck = (numberOfDecks = 6) => {
  const getDeckUrl = `${url}/new/shuffle/?deck_count=${numberOfDecks}`;

  return fetch(getDeckUrl);
};

export const getCards = (deckId = "new", numberOfCards = 1) => {
  const getCardsUrl = `${url}/${deckId}/draw/?count=${numberOfCards}`;
  return fetch(getCardsUrl);
};
