import React, { useState } from "react";

const Deck = ({ cards }) => {
  const [userAddedCards, setUserAddedCards] = useState([]);

  const addUserCard = (card) => {
    if (!userAddedCards.some((userCard) => userCard.id === card.id)) {
      setUserAddedCards([...userAddedCards, card]);
    }
  };
  return (
    <div>
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

export default Deck;
