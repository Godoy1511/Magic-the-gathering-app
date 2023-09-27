import React from "react";
import { useState, useEffect } from "react";
import ManaSymbols from "./components/ManaSymbols";

const API_URL = "https://api.magicthegathering.io/v1/cards";

const CardSearch = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardInFocus, setCardInFocus] = useState(null);
  const [userAddedCards, setUserAddedCards] = useState([]);

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

    setCards(filteredCards);
    setSearchTerm("");
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const mouseCursorEnter = (card) => {
    setCardInFocus(card);
  };

  const mouseCursorLeave = () => {
    setCardInFocus(null);
  };

  const addUserCard = (card) => {
    if (!userAddedCards.some((userCard) => userCard.id === card.id)) {
      setUserAddedCards([...userAddedCards, card]);
    }
  };

  return (
    <div>
      <ManaSymbols mana={"{W}"} />
      <ManaSymbols mana={"{R}"} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchCards();
        }}
      >
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search card"
        />
        <button type="submit">Search</button>
      </form>
      {cardInFocus && <img src={cardInFocus.imageUrl} />}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mana Cost</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {userAddedCards.map((card) => (
            <tr key={card.id}>
              <td
                onMouseEnter={() => mouseCursorEnter(card)}
                // onMouseLeave={mouseCursorLeave}
              >
                {card.name}
              </td>
              <td>{card.manaCost}</td>
              <td>{card.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Search Cards:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mana Cost</th>
            <th>Type</th>
            <th>Add card to deck</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td>{card.name}</td>
              <td>{card.manaCost}</td>
              <td>{card.type}</td>
              <td>
                <button onClick={() => addUserCard(card)}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardSearch;
