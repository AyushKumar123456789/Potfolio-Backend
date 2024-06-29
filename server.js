const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

async function main() {
  await mongoose.connect(
    "mongodb+srv://ayushjitendra28:cqwOlzTVgwiXZZ92@cluster0.capeqn3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {}
  );
  console.log("Connected to MongoDB");
}

main();

const reviewSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  text: String,
  imdbLink: String,
  status: { type: String, enum: ["watched", "wish"] }, // New field for status
});
const bookreviewSchema = new mongoose.Schema({
  title: String,
  text: String,
  link: String,
  status: { type: String, enum: ["completed", "reading"] }, // Status field to categorize books
  completion: Number,
  type: { type: String, enum: ["book"] }, // Type field to specify book reviews
});

const BookReview = mongoose.model("BookReview", bookreviewSchema);

app.get("/books", async (req, res) => {
  try {
    const BookReviews = await BookReview.find({ type: "book" });
    res.json(BookReviews);
  } catch (error) {
    console.error("Error fetching Bookreviews:", error);
    res.status(500).json({ error: "Error fetching Bookreviews" });
  }
});

const Review = mongoose.model("Review", reviewSchema);

app.get("/reviews", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
