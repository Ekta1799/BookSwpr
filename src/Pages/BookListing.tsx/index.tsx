import { useState, useEffect } from "react";
import customAxios from "../../utils/axios";
import "./style.css";
import { errorToastWrapper } from "../../utils";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { getRandomImage } from "../../utils";

export interface IBooksList {
  title: string;
  author: string;
  condition: string;
  genre: string;
  availability: boolean;
}

const BookListing = () => {
  const [books, setBooks] = useState<IBooksList[]>({} as any);

  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    setRandomImage(getRandomImage());
  }, []);

  const fetchData = async () => {
    try {
      const response = await customAxios.get<IBooksList[]>("books");
      setBooks([...response.data]);
    } catch (error) {
      errorToastWrapper("Error while fetching book");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bookListingContainer">
    { Array.isArray(books) && books.map((book, bookIndex) => (
      <div className="bookCard">
    <Card
      className="bookCard"
      style={{ borderRadius: "10px", cursor: "pointer" }}
    >
      <CardMedia
        component="img"
        height="140"
        image={randomImage}
        alt="Book Cover"
      />
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{
            display: "flex",
            justifyContent: "space-between",
            textTransform: "capitalize",
            marginBottom: "16px",
            alignItems: "flex-end",
            alignContent: "flex-end",
          }}
        >
          {book.title}
          <Typography
            variant="h6"
            component="div"
            className="textTransform"
            style={{ marginTop: "8px" }}
          >
          </Typography>
        </Typography>
        <Typography variant="body1" component="div" className="textTransform">
          <b>Author:</b> {book.author}
        </Typography>
        <Typography variant="body1" component="div" className="textTransform">
          <b>Genre:</b> {book.genre}
        </Typography>
        <Typography variant="body1" component="div" className="textTransform">
          {book.condition} Book
        </Typography>
        <Typography
          variant="body1"
          component="div"
          className="textTransform"
        >
          {book.availability ? "Available" : "Not Available"}
        </Typography>
      </CardContent>
    </Card>
    </div>
    ))}
    </div>
  );
};

export default BookListing;
