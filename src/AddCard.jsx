  import { useState } from "react";
  import "./AddCard.css";

  function AddCard({ onAddCard, onCancel, onSaveEdit, initialData }) {
    const [formData, setFormData] = useState(initialData ?? { question: "", answer: "" });
    
    function handleChange(e) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }

    function handleSubmit() {
    if (formData.question && formData.answer) {
      if (initialData) {
        onSaveEdit({ ...formData, id: initialData.id });
      } else {
        onAddCard({ id: crypto.randomUUID(), ...formData });
      }
      setFormData({ question: "", answer: "" });
    }
  }

    return (
      <div className="add-card-overlay">
        <div className="add-card">
        <p className="add-card-heading">{initialData ? "Edit card" : "New card"}</p>        
        <p className="add-card-sub">Fill in both sides before saving.</p>

          <label className="add-card-label">Question</label>
          <input
            className="add-card-input"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="e.g. What is the powerhouse of the cell?"
          />

          <label className="add-card-label">Answer</label>
          <input
            className="add-card-input"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="e.g. The mitochondria"
          />

          <hr className="add-card-divider" />

          <button
            className="add-card-btn"
            onClick={handleSubmit}
            disabled={!formData.question || !formData.answer}
          >
            Save card
          </button>

          {onCancel && (
            <button className="add-card-btn add-card-btn--cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    );
  }

  export default AddCard;