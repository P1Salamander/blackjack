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

  const [deckId, setDeckId] = useState(null);

  useEffect(() => {
    getDeckId();

    if (!dealerPlaying && !userIsBusted) {
      if (userCardsValue > 21) {
        setUserIsBusted(true);
        setDisplayResult(true);
      }

      if (userCardsValue === 21) {
        setDealerIsBusted(true);
        setDisplayResult(true);
        userService.updateBalance(
          props.user,
          props.user.balance + betValue * 2
        );
      }

      return;
    }

    if (!dealerPlaying || userIsBusted || dealerIsBusted) return;

    if (dealerCardsValue < 21) {
      setTimeout(() => {
        getCards(1).then((res) => {
          const card = getCard(res.cards[0]);
          dealToDealer(false, card);
        });
      }, 500);
    }

    if (dealerCardsValue > 21) {
      setDealerIsBusted(true);
      setDisplayResult(true);
      userService.updateBalance(props.user, props.user.balance + betValue * 2);
      return;
    }

    if (dealerCardsValue === 21 || dealerCardsValue > userCardsValue) {
      setUserIsBusted(true);
      setDisplayResult(true);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealerCardsValue, userCardsValue]);

  const getDeckId = async () => {
    if (deckId != null) return;
    const rawResponse = await gameService.getDeck();

    const response = await rawResponse.json();
    setDeckId(response.deck_id);
  };

  const getCards = async (numberOfCards) => {
    const rawResponse = await gameService.getCards(deckId, numberOfCards);

    const response = await rawResponse.json();
    return response;
  };

  const getCard = (raw) => {
    return {
      image: raw.image,
      alt: raw.code,
      value: getValue(raw.value),
    };
  };

  const submitBet = async (e) => {
    e.preventDefault();
    setBetSubmited(true);

    userService.updateBalance(props.user, props.user.balance - betValue);

    const response = await getCards(3);

    response.cards.forEach((res, index) => {
      const card = getCard(res);
      if (index % 2 === 0) {
        dealToUser(card);
      } else {
        dealToDealer(false, card);
      }
    });

    dealToDealer(true);
  };

  const increaseBet = (e) => {
    e.preventDefault();
    if (betValue + 10 <= props.user.balance) {
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
    const response = await getCards(1);
    const card = getCard(response.cards[0]);
    dealToUser(card);
  };

  const doubleDown = async (e) => {
    e.preventDefault();

    userService.updateBalance(props.user, props.user.balance - betValue);

    setBetValue(betValue * 2);

    const response = await getCards(1);
    const card = getCard(response.cards[0]);
    dealToUser(card);

    stand(e);
  };

  const stand = async (e) => {
    e.preventDefault();
    setDealerPlaying(true);

    // removing the back card
    const newDealerCards = dealerCards[0];
    setDealerCards([newDealerCards]);

    const response = await getCards(1);
    const card = getCard(response.cards[0]);
    dealToDealer(false, card);
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
              disabled={betSubmited || betValue + 10 > props.user.balance}
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
                  dealerPlaying ||
                  userIsBusted ||
                  props.user.balance < betValue * 2
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
                disabled={betSubmited || props.user.balance < betValue}
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
