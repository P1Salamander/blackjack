import { Component } from "react";
import "./Game.css";
import * as gameService from "../../services/gameService";
import { Button } from "primereact/button";
import GameCard from "../GameCard/GameCard";

//TODO card value to game value
//TODO ace 1 or 11
//TODO draw the cards
//TODO bet starting and bet ended
//TODO get user and uptade user balance
//TODO hit button , stand and doubledown
//TODO if we have 21, WIN! / ( if we and dealer have 21 ??!?!)

class Game extends Component {
  constructor(props) {
    super(props);
    this.deal = this.deal.bind(this);

    this.state = {
      deckId: null,
      dealerCards: [],
      userCards: [],
    };
  }
  componentDidMount() {
    if (this.state.deckId == null) {
      gameService
        .getDeck()
        .then((res) => res.json())
        .then((res) => this.setState({ deckId: res.deck_id }))
        .catch((e) => console.log(e));
    }
  }
  deal() {
    if (this.state.dealerCards.length < 2) {
      gameService
        .getCards(this.state.deckId, 2)
        .then((res) => res.json())
        .then((res) => {
          const userCards = [];
          const dealerCards = [];
          for (let index = 0; index < res.cards.length; index++) {
            if (index % 2 === 0) {
              userCards.push(res.cards[index]);
            } else {
              dealerCards.push(res.cards[index]);
            }
          }
          this.setState({ userCards, dealerCards }, () =>
            console.log(this.state)
          );
        })
        .catch((e) => console.log(e));
    }
  }
  render() {
    return (
      <div className="table p-m-0">
        <div className="cards">
          <div className="p-d-flex cards p-jc-center">
            {this.state.dealerCards.map((card) => {
              return (
                <div key={Math.random()} className="p-mr-2 p-as-start p-py-5">
                  <GameCard url={card.image} value={card.alt}></GameCard>
                </div>
              );
            })}
          </div>

          <div className="p-d-flex cards p-jc-center">
            {this.state.userCards.map((card) => {
              return (
                <div key={Math.random()} className="p-mr-2 p-as-end p-py-5">
                  <GameCard url={card.image} value={card.alt}></GameCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
