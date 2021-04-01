import { useEffect, useState } from "react";
import "./Game.css";
import * as gameService from "../../services/gameService";
import { Button } from "primereact/button";
import GameCard from "../GameCard/GameCard";
import { Chip } from "primereact/chip";
import { Dialog } from "primereact/dialog";

import * as userService from "../../services/userService";

export default function Game(props) {
  const [userCards, setUserCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);

  const [betSubmited, setBetSubmited] = useState(false);
  const [userIsBusted, setUserIsBusted] = useState(false);
  const [dealerIsBusted, setDealerIsBusted] = useState(false);
  const [dealerPlaying, setDealerPlaying] = useState(false);

  const [betValue, setBetValue] = useState(10);
  const [userCardsValue, setUserCardsValue] = useState(0);
  const [dealerCardsValue, setDealerCardsValue] = useState(0);

  const [displayResult, setDisplayResult] = useState(false);

  const [deck, setDeck] = useState({ deckId: null, totalCards: 0, cards: [] });

  useEffect(() => {
    getDeck();

    if (!dealerPlaying && !userIsBusted) {
      if (userCardsValue > 21) {
        setUserIsBusted(true);
        setDisplayResult(true);
      }

      if (userCardsValue === 21) {
        setDealerIsBusted(true);
        setDisplayResult(true);
        const newBalance = props.balance + betValue * 2;
        userService.updateBalance(props.user, newBalance);
        props.updateBalance(newBalance);
      }

      return;
    }

    if (!dealerPlaying || userIsBusted || dealerIsBusted) return;

    if (dealerCardsValue < 21) {
      setTimeout(() => {
        dealToDealer(false, getCard());
      }, 500);
    }

    if (dealerCardsValue > 21) {
      setDealerIsBusted(true);
      setDisplayResult(true);
      const newBalance = props.balance + betValue * 2;
      userService.updateBalance(props.user, newBalance);
      props.updateBalance(newBalance);
      return;
    }

    if (dealerCardsValue === 21 || dealerCardsValue > userCardsValue) {
      setUserIsBusted(true);
      setDisplayResult(true);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealerCardsValue, userCardsValue]);

  const getDeck = async () => {
    if (deck.deckId != null) return;
    const rawDeckResponse = await gameService.getDeck();

    const deckResponse = await rawDeckResponse.json();

    const deckId = deckResponse.deck_id;
    const totalCards = deckResponse.remaining;

    const rawCardsResponse = await gameService.getCards(deckId, totalCards);
    const cardsResponse = await rawCardsResponse.json();

    const deckOfCards = [];
    cardsResponse.cards.forEach((card) => {
      deckOfCards.push({
        image: card.image,
        alt: card.code,
        value: getValue(card.value),
      });
    });

    setDeck({
      deckId: deckResponse.deck_id,
      totalCards: deckResponse.remaining,
      cards: deckOfCards,
    });
  };

  const getCard = () => {
    return deck.cards.pop();
  };

  const submitBet = async (e) => {
    e.preventDefault();
    setBetSubmited(true);

    const newBalance = props.balance - betValue;
    userService.updateBalance(props.user, newBalance);
    props.updateBalance(newBalance);

    dealToUser(getCard());
    dealToDealer(false, getCard());
    dealToUser(getCard());
    dealToDealer(true);
  };

  const increaseBet = (e) => {
    e.preventDefault();
    if (betValue + 10 <= props.balance) {
      setBetValue(betValue + 10);
    }
  };

  const decreaseBet = (e) => {
    e.preventDefault();
    if (betValue - 10 > 0) {
      setBetValue(betValue - 10);
    }
  };

  const hit = async (e) => {
    e.preventDefault();
    dealToUser(getCard());
  };

  const doubleDown = async (e) => {
    e.preventDefault();

    const newBalance = props.balance - betValue;
    userService.updateBalance(props.user, props.balance - betValue);
    props.updateBalance(newBalance);
    setBetValue(betValue * 2);

    dealToUser(getCard());

    stand(e);
  };

  const stand = async (e) => {
    e.preventDefault();
    setDealerPlaying(true);

    // removing the back card
    const newDealerCards = dealerCards[0];
    setDealerCards([newDealerCards]);
    dealToDealer(false, getCard());
  };

  const dealToUser = async (card) => {
    setUserCardsValue((oldCardsValue) => oldCardsValue + card.value);
    setUserCards((oldUserCards) => [...oldUserCards, card]);
  };

  const dealToDealer = async (isBackCard, card) => {
    if (isBackCard) {
      const backCard = {
        image:
          "https://i.pinimg.com/originals/21/1a/f2/211af2dbefc71b573252ba00e2ea87ca.png",
        value: "back",
      };
      setDealerCards((oldDealerCards) => [...oldDealerCards, backCard]);
      return;
    }

    setDealerCards((oldDealerCards) => [...oldDealerCards, card]);

    setDealerCardsValue((oldCardsValue) => oldCardsValue + card.value);
  };

  const getValue = (cardValue) => {
    const value = Number(cardValue);
    if (Number.isNaN(value)) {
      // eslint-disable-next-line default-case
      switch (cardValue) {
        case "JACK":
        case "QUEEN":
        case "KING":
          return 10;
        case "ACE":
          return 11;
      }
    }
    return value;
  };

  const reset = () => {
    setDealerPlaying(false);
    setDealerCardsValue(0);
    setUserCardsValue(0);
    setDealerCards([]);
    setUserCards([]);
    setDealerIsBusted(false);
    setUserIsBusted(false);
    setBetSubmited(false);
    setBetValue(10);
    setDisplayResult(false);
  };

  const renderResultFooter = (name) => {
    return (
      <div>
        <Button
          label="Start New Game"
          icon="pi pi-check"
          onClick={() => reset()}
          autoFocus
        />
      </div>
    );
  };

  return (
    <div className="table p-d-flex">
      <div
        className="p-d-flex p-jc-center p-flex-column"
        style={{ width: "80%" }}
      >
        <div className="p-d-flex p-jc-center">
          {dealerCards.map((card) => {
            return (
              <div key={Math.random()} className="p-mr-2 p-as-start p-py-5">
                <GameCard url={card.image} value={card.alt}></GameCard>
              </div>
            );
          })}
        </div>

        <div className="p-d-flex p-jc-center p-mt-auto">
          {userCards.map((card) => {
            return (
              <div key={Math.random()} className="p-mr-2 p-as-end p-py-5">
                <GameCard url={card.image} value={card.alt}></GameCard>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-d-flex" style={{ width: "20%" }}>
        <div
          className="p-d-flex p-flex-column p-my-4"
          style={{ width: "100%" }}
        >
          <div className="p-d-flex p-jc-between" style={{ width: "100%" }}>
            <Button
              icon="pi pi-minus"
              className="p-button-rounded p-button-danger"
              disabled={betSubmited || betValue - 10 <= 0}
              tooltip="Decrease Bet"
              tooltipOptions={{
                position: "bottom",
                mouseTrack: true,
                mouseTrackTop: 15,
              }}
              onClick={(e) => {
                decreaseBet(e);
              }}
            />
            <Chip label={`${betValue}`} />
            <Button
              icon="pi pi-plus"
              className="p-button-rounded p-button-help"
              disabled={betSubmited || betValue + 10 > props.balance}
              tooltip="Increase Bet"
              tooltipOptions={{
                position: "left",
                mouseTrack: true,
                mouseTrackTop: 15,
              }}
              onClick={(e) => {
                increaseBet(e);
              }}
            />
          </div>

          {betSubmited ? (
            <div className="p-d-flex p-jc-between p-my-4">
              <Button
                icon="pi pi-angle-up"
                className="p-button-rounded p-button-success"
                disabled={dealerPlaying || userIsBusted}
                tooltip="Hit"
                tooltipOptions={{
                  position: "bottom",
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                onClick={(e) => {
                  hit(e);
                }}
              />

              <Button
                icon="pi pi-angle-double-up"
                className="p-button-rounded p-button-warning"
                disabled={
                  dealerPlaying || userIsBusted || props.balance < betValue * 2
                }
                tooltip="Double Down"
                tooltipOptions={{
                  position: "bottom",
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                onClick={(e) => {
                  doubleDown(e);
                }}
              />

              <Button
                icon="pi pi-minus"
                className="p-button-rounded p-button-danger"
                disabled={dealerPlaying || userIsBusted}
                tooltip="Stand"
                tooltipOptions={{
                  position: "left",
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                onClick={(e) => {
                  stand(e);
                }}
              />
            </div>
          ) : (
            <div className="p-d-flex p-jc-center p-my-4">
              <Button
                icon="pi pi-check"
                className="p-button-rounded p-button-success"
                disabled={betSubmited || props.balance < betValue}
                tooltip="Submit Bet"
                tooltipOptions={{
                  position: "bottom",
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                onClick={(e) => {
                  submitBet(e);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <Dialog
        header="Result"
        visible={displayResult}
        position={"center"}
        onHide={() => reset()}
        modal
        style={{ width: "30vw" }}
        footer={renderResultFooter}
        draggable={true}
        resizable={true}
        baseZIndex={1000}
      >
        <p className="p-m-0">
          {userIsBusted ? <p>Dealer Wins</p> : <p>{props.user.email} Wins</p>}
        </p>
      </Dialog>
    </div>
  );
}
