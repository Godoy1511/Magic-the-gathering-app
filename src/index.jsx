import React from "react";
import { useState, useEffect } from "react";
import Category from "./components/Category.jsx"

const API_URL = "https://api.magicthegathering.io/v1/cards";

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardInFocus, setCardInFocus] = useState(null);

  const fetchCards = async () => {
    const result = await fetch(`${API_URL}?name=${searchTerm}`, {
      method: "GET",
    });

    const data = await result.json();

    const names = new Set();

    const filteredCards = data.cards.filter((card) => {
      if (names.has(card.name)) {
        return false;
      }

      names.add(card.name);
      return true;
    });

    console.log(filteredCards)

    setCards(filteredCards);
    setSearchTerm("");
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div>
      <Category />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchCards();
        }}
      >
        <input onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {cardInFocus && <img src={cardInFocus.imageUrl} />}
      <div>
        {cards.map((card) => (
          <button key={card.id} onClick={() => setCardInFocus(card)}>{card.name}</button>
        ))}
      </div>
    </div>
  );
};

export default CardList;