import React, { useState } from "react";
import Deck from "./Deck";
import { Button } from "antd";
import { AutoComplete } from "antd";
import CardSearch from "./CardSearch";

// usar o activeDeckId para achar o deck e alterar o deck com setDecks

const DeckManager = () => {
  const [decks, setDecks] = useState([]);
  const [activeDeckId, setActiveDeckId] = useState(null);

  const activeDeck = decks.find((deck) => deck.id === activeDeckId);

  const createDeck = () => {
    setDecks([
      ...decks,
      { name: "Nome do deck", id: Math.random().toString(), cards: [] },
    ]);
  };

  const onSelectCard = (card) => {
    setDecks(
      decks.map((deck) => {
        if (activeDeckId === deck.id) {
          return {
            ...deck,
            cards: [...deck.cards, card],
          };
        }
        return deck;
      })
    );
  };

  return (
    <div>
      <Button onClick={createDeck}>New Deck</Button>
      {decks.map((deck) => (
        <Button key={deck.id} onClick={() => setActiveDeckId(deck.id)}>
          {deck.name}
        </Button>
      ))}
      {activeDeckId ? (
        <div>
          <CardSearch onSelectCard={onSelectCard} />
          <Deck cards={activeDeck.cards} />
        </div>
      ) : null}
    </div>
  );
};

export default DeckManager;
