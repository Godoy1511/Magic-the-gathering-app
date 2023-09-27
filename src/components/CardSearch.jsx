import React from "react";
import { useState, useEffect } from "react";
import { AutoComplete } from "antd";

const API_URL = "https://api.magicthegathering.io/v1/cards";

const CardSearch = ({ onSelectCard }) => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

    setCards(filteredCards.slice(0, 5));
  };

  useEffect(() => {
    fetchCards();
  }, [searchTerm]);

  return (
    <div>
      <AutoComplete
        style={{ width: 200 }}
        options={cards.map((card) => {
          return { label: card.name, value: card.id };
        })}
        onSelect={(id) => onSelectCard(cards.find((card) => card.id === id))}
        onSearch={(text) => setSearchTerm(text)}
      />
    </div>
  );
};

// manter um useState do selectedCard
// extrair o onSelect para uma função e depois salvar o selectedCard no useState
// fazer value={selectedCard.name}

export default CardSearch;
