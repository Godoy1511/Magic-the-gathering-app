import React, { useState, useContext } from "react";

// Crie um contexto para gerenciar o estado dos decks
const DecksContext = React.createContext();

const DecksProvider = ({ children }) => {
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);

  const createDeck = (deckName) => {
    if (deckName.trim() === "") {
      alert("Por favor, insira um nome para o deck.");
      return;
    }

    const newDeck = {
      id: Date.now(), // Gere um ID único para o deck
      name: deckName,
      cards: [],
    };

    setDecks([...decks, newDeck]);
  };

  const addCardToDeck = (deckId, cardName) => {
    const updatedDecks = decks.map((deck) => {
      if (deck.id === deckId) {
        return {
          ...deck,
          cards: [...deck.cards, { id: Date.now(), name: cardName }],
        };
      }
      return deck;
    });

    setDecks(updatedDecks);
  };

  const removeCardFromDeck = (deckId, cardId) => {
    const updatedDecks = decks.map((deck) => {
      if (deck.id === deckId) {
        return {
          ...deck,
          cards: deck.cards.filter((card) => card.id !== cardId),
        };
      }
      return deck;
    });

    setDecks(updatedDecks);
  };

  return (
    <DecksContext.Provider
      value={{
        decks,
        selectedDeck,
        createDeck,
        addCardToDeck,
        removeCardFromDeck,
        setSelectedDeck,
      }}
    >
      {children}
    </DecksContext.Provider>
  );
};

const useDecks = () => {
  const context = useContext(DecksContext);
  if (!context) {
    throw new Error("useDecks deve ser usado dentro de um DecksProvider");
  }
  return context;
};

const Decks = () => {
  const {
    decks,
    selectedDeck,
    createDeck,
    addCardToDeck,
    removeCardFromDeck,
    setSelectedDeck,
  } = useDecks();

  const [deckName, setDeckName] = useState("");
  const [cardToAdd, setCardToAdd] = useState("");

  return (
    <div>
      <h2>Criar um Novo Deck</h2>
      <input
        type="text"
        placeholder="Nome do Deck"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <button onClick={() => createDeck(deckName)}>Create Deck</button>

      <h2>Decks Criados</h2>
      <div className="deck-list">
        {decks.map((deck) => (
          <div key={deck.id} className="deck">
            <h3>{deck.name}</h3>
            <ul>
              {deck.cards.map((card) => (
                <li key={card.id}>
                  {card.name}
                  <button onClick={() => removeCardFromDeck(deck.id, card.id)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Adicionar Carta"
              value={cardToAdd}
              onChange={(e) => setCardToAdd(e.target.value)}
            />
            <button onClick={() => addCardToDeck(deck.id, cardToAdd)}>
              Adicionar Carta
            </button>
            <button onClick={() => setSelectedDeck(deck)}>Selecionar Deck</button>
          </div>
        ))}
      </div>

      {selectedDeck && (
        <div>
          <h2>Deck Selecionado: {selectedDeck.name}</h2>
          {/* Renderize detalhes do deck selecionado aqui */}
        </div>
      )}
    </div>
  );
};

export { DecksProvider, Decks };