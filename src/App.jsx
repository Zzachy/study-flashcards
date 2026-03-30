import { useState } from "react";
import './App.css';
import AddCard from "./AddCard.jsx";

function Flashcards () {
  const [cards, setCards] = useState([])
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const hasNext = current < cards.length - 1;

  function handleNext () {
    if (hasNext) {
      setCurrent(current + 1);
      setFlipped(false);
    }
    else {
      setCurrent(0);
      setFlipped(false);
    }
  }

  function handlePrev() {
    setCurrent((current - 1 + cards.length) % cards.length);
    setFlipped(false);
  }

  function handleFlip () {
    if (!flipped) {
      setFlipped(true);
    }
    else {
      setFlipped(false);
    }
  }

  function handleNewCard () {
    if (!newCard) {
      setNewCard(true);
    }
    else {
      setNewCard(false);
    }
  }

  function handleAddCard (card) {
    setCards([...cards, card]);
    setNewCard(false);
  }

  function handleEditCard(updatedCard) {
    console.log(updatedCard)
    setCards(cards.map(c => c.id === updatedCard.id ? updatedCard : c));
    setEditingCard(null);
  }

  let card = cards[current];

  return (
  <div className="page">
    {newCard || editingCard ? (
      <AddCard
        onAddCard={handleAddCard}
        onSaveEdit={handleEditCard}
        onCancel={() => { setNewCard(false); setEditingCard(null); }}
        initialData={editingCard ?? undefined}
      />
    ) : (
      <>
        <div className="bottom-row">
          <button className="add-card-trigger" onClick={handleNewCard}>Add Card</button>
        </div>

        {cards.length === 0 ? (
          <p className="empty-message">No cards yet. Add one to get started!</p>
        ) : (
          <>
            <button className="card" onClick={handleFlip}>
              <p className="card-text">
                {flipped ? card.answer : card.question}
              </p>
            </button>
            <div className="controls">
              <button className="flip-btn" onClick={handleFlip}>
                {flipped ? "Show Question" : "Show Answer"}
              </button>
              <button className="nav-btn" onClick={handlePrev}>‹</button>
              <button className="nav-btn" onClick={handleNext}>›</button>
            </div>
            <button className="flip-btn" onClick={() => setEditingCard(card)}>Edit card</button>
          </>
        )}
      </>
    )}
  </div>
);
}

export default Flashcards;