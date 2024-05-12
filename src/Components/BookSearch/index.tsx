import React, { useState, useEffect } from "react";
import customAxios from "../../utils/axios";
import "./index.css";
import { errorToastWrapper } from "../../utils";
import { getRandomImage } from "../../utils";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export interface IBook {
    title: string;
    author: string;
    genre: string;
    availability: boolean;
}

const BookSearch = () => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
    const [randomImage, setRandomImage] = useState("");
    const [searchCriteria, setSearchCriteria] = useState<{ [key: string]: RegExp }>({
        title: new RegExp('', 'i'),
        author: new RegExp('', 'i'),
        genre: new RegExp('', 'i'),
        availability: new RegExp('', 'i'),
    });

    useEffect(() => {
        setRandomImage(getRandomImage());
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await customAxios.get<IBook[]>("books");
            setBooks(response.data);
        } catch (error) {
            errorToastWrapper("Error while fetching books");
        }
    };

    useEffect(() => {
        const filteredResults = books.filter(book => {
            return Object.entries(searchCriteria).every(([key, regex]) => {
                if (regex.source === '') return true;
                if (key === 'title' || key === 'author' || key === 'genre') {
                    return regex.test(book[key]);
                }
                return true;
            });
        });
        setFilteredBooks(filteredResults);
    }, [books, searchCriteria]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSearchCriteria({ ...searchCriteria, [name]: new RegExp(value, 'i') });
    };

    return (
        <div className="bookSearchContainer">
            <h2 className="searchHeader">Book Search</h2>
            <div className="searchCriteria">
                <input
                    type="text"
                    placeholder="Search by title"
                    name="title"
                    className="searchInput"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Search by author"
                    name="author"
                    className="searchInput"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Search by genre"
                    name="genre"
                    className="searchInput"
                    onChange={handleInputChange}
                />
                <select name="availability" className="searchInput" onChange={handleInputChange}>
                    <option value="">All</option>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
            </div>
            <div className="bookList">
                {filteredBooks.map((book, bookIndex) => (
                    <div className="bookCard" key={bookIndex}>
                        <Card className="bookCard" style={{ borderRadius: "10px", cursor: "pointer" }}>
                            <CardMedia component="img" height="140" image={randomImage} alt="Book Cover" />
                            <CardContent>
                                <Typography variant="h5" component="div" className="bookTitle">
                                    {book.title}
                                </Typography>
                                <Typography variant="body1" component="div" className="bookInfo">
                                    <b>Author:</b> {book.author}
                                </Typography>
                                <Typography variant="body1" component="div" className="bookInfo">
                                    <b>Genre:</b> {book.genre}
                                </Typography>
                                <Typography variant="body1" component="div" className="bookInfo">
                                    {book.availability ? "Available" : "Not Available"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
            {filteredBooks.length === 0 && <p className="noBooksMessage">No books found.</p>}
        </div>
    );
};

export default BookSearch;