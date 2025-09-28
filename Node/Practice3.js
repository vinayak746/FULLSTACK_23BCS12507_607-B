const express = require("express");
const app = express();
const PORT = 3003;

app.use(express.json());

const LOCK_TIMEOUT = 10000;

const seats = [
  { id: 1, number: "A1", status: "available" },
  { id: 2, number: "A2", status: "available" },
  { id: 3, number: "A3", status: "available" },
  { id: 4, number: "B1", status: "available" },
  { id: 5, number: "B2", status: "available" },
  { id: 6, number: "B3", status: "available" },
];

const lockTimers = new Map();

app.get("/seats", (req, res) => {
  res.status(200).json(seats);
});

app.post("/book/:seatId", (req, res) => {
  const seatId = parseInt(req.params.seatId);
  const seat = seats.find((s) => s.id === seatId);

  if (!seat) {
    return res.status(404).json({ message: "Seat not found." });
  }

  if (seat.status !== "available") {
    return res
      .status(409)
      .json({
        message: `Seat ${seat.number} is not available and cannot be locked.`,
      });
  }

  seat.status = "locked";

  const timerId = setTimeout(() => {
    seat.status = "available";
    lockTimers.delete(seatId);
    console.log(
      `Lock expired for seat ${seat.number}. It is now available again.`
    );
  }, LOCK_TIMEOUT);

  lockTimers.set(seatId, timerId);

  res
    .status(200)
    .json({
      message: `Seat ${
        seat.number
      } locked successfully. Please confirm within ${
        LOCK_TIMEOUT / 1000
      } seconds.`,
    });
});

app.post("/confirm/:seatId", (req, res) => {
  const seatId = parseInt(req.params.seatId);
  const seat = seats.find((s) => s.id === seatId);

  if (!seat) {
    return res.status(404).json({ message: "Seat not found." });
  }

  if (seat.status !== "locked") {
    return res
      .status(400)
      .json({ message: `Seat ${seat.number} is not locked for confirmation.` });
  }

  const timerId = lockTimers.get(seatId);
  if (timerId) {
    clearTimeout(timerId);
    lockTimers.delete(seatId);
  }

  seat.status = "booked";

  res.status(200).json({ message: `Seat ${seat.number} booked successfully.` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
