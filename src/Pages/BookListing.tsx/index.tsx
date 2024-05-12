import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import customAxios from "../../utils/axios";
import "./style.css";
import { errorToastWrapper } from "../../utils";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { getRandomImage, getLocalStorageItem } from "../../utils";

export interface IBooksList {
  title: string;
  author: string;
  condition: string;
  genre: string;
  availability: boolean;
  username: string;
}

const BookListing = () => {
  const [books, setBooks] = useState<IBooksList[]>([]);
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    setRandomImage(getRandomImage());
  }, []);

  const role = getLocalStorageItem("role");
  const username = getLocalStorageItem("userName");

  const fetchData = async () => {
    try {

      if(role === "admin"){
        const response = await customAxios.get<IBooksList[]>("books");
        setBooks([...response.data]);
      } else {
        const response = await customAxios.get<IBooksList[]>("books/"+ username);
        setBooks([...response.data]);
      }
    } catch (error) {
      errorToastWrapper("Error while fetching book");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bookListingContainer">
      {books.map((book, bookIndex) => (
        <div key={bookIndex} className="bookCard">
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
                ></Typography>
              </Typography>
              <Typography
                variant="body1"
                component="div"
                className="textTransform"
              >
                <b>Author:</b> {book.author}
              </Typography>
              <Typography
                variant="body1"
                component="div"
                className="textTransform"
              >
                <b>Genre:</b> {book.genre}
              </Typography>
              <Typography
                variant="body1"
                component="div"
                className="textTransform"
              >
                {book.condition} Book
              </Typography>
              <Typography
                variant="body1"
                component="div"
                className="textTransform"
              >
                {book.availability ? "Available" : "Not Available"}
              </Typography>
              <Link to="/exchangerequests"> {/* Use Link component */}
                <button>Exchange</button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BookListing;