import { Component } from "react";
import "./Game.css";
import * as gameService from "../../services/gameService";
import { Button } from "primereact/button";

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
      <div className="table p-grid p-align-center p-m-0">
        <Button label="deal" onClick={this.deal}></Button>
      </div>
    );
  }
}

export default Game;
