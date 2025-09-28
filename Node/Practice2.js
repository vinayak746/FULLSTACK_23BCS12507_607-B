const express = require("express");

const app = express();
const PORT = 3002;

app.use(express.json());

let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" },
];
let nextId = 3;
app.get("/cards", (req, res) => {
  res.status(200).json(cards);
});

app.get("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find((c) => c.id === cardId);

  if (card) {
    res.status(200).json(card);
  } else {
    res.status(404).json({ message: "Card not found" });
  }
});

app.post("/cards", (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    return res.status(400).json({ message: "Suit and value are required." });
  }

  const newCard = {
    id: nextId++,
    suit: suit,
    value: value,
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

// DELETE /cards/:id - Delete a card by its ID
app.delete("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const cardIndex = cards.findIndex((c) => c.id === cardId);

  if (cardIndex !== -1) {
    // .splice returns an array of the removed items. We want the first (and only) item.
    const deletedCard = cards.splice(cardIndex, 1)[0];
    res.status(200).json({
      message: `Card with id ${cardId} deleted`,
      card: deletedCard,
    });
  } else {
    res.status(404).json({ message: "Card not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
