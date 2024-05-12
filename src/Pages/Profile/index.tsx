import { useEffect, useState } from "react";
import customAxios from "../../utils/axios";
import { errorToastWrapper } from "../../utils";
import "./styles.css";
import { getLocalStorageItem } from "../../utils";

export type Genres = [
  "Psychological",
  "Fiction",
  "Fantasy",
  "Thriller"
];

type UserProfileData = {
  firstName: string;
  lastName: string;
  phoneNo: string;
  bookOwnedList: string[];
  readingPref: string[];
  favGenre: string[];
  bookWishList: string[];
  username: string;
};


const UserProfilePopup = () => {

  const [UserProfileData, setUserProfileData] = useState<UserProfileData>({
    firstName: '',
    lastName: '',
    phoneNo: '',
    bookOwnedList: [],
    readingPref: [],
    favGenre: [],
    bookWishList: [],
    username: ''
  });

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genres = e.target.value.split(",").map((genre) => genre.trim());
    setUserProfileData({ ...UserProfileData, favGenre: genres });
  };

  const handlebookOwnedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bookOwned = e.target.value.split(",").map((book) => book.trim());
    setUserProfileData({ ...UserProfileData, bookOwnedList: bookOwned });
  };

  const handleReadingPrefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const readingPref = e.target.value.split(",").map((book) => book.trim());
    setUserProfileData({ ...UserProfileData, readingPref: readingPref });
  };

  const handlebookWishListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bookWish = e.target.value.split(",").map((book) => book.trim());
    setUserProfileData({ ...UserProfileData, bookWishList: bookWish });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfileData({ ...UserProfileData, [e.target.name]: e.target.value });
  };

  const username = getLocalStorageItem('userName') ?? '';
  useEffect(() => {
    setUserProfileData(prevData => ({ ...prevData, username }));
  }, []);

  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await customAxios.put("userProfile", UserProfileData);
      if (response) {
        setRegistrationStatus('User Profile updation success!');
      } else {
        setRegistrationStatus('User Profile updation failed!');
      }
    } catch (err: any) {
      errorToastWrapper("Error while updating profile");
    }
  };

  return (
    <div className="container">
      <h2>{username} Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={UserProfileData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={UserProfileData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="phoneNo"
          value={UserProfileData.phoneNo}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="favGenre"
          value={UserProfileData.favGenre}
          onChange={handleGenreChange}
          placeholder="Genres"
        />
        <input
          type="text"
          name="bookOwnedList"
          value={UserProfileData.bookOwnedList}
          onChange={handlebookOwnedChange}
          placeholder="Books Owned"
        />
        <input
          type="text"
          name="readingPref"
          value={UserProfileData.readingPref}
          onChange={handleReadingPrefChange}
          placeholder="Books Preferences"
        />
        <input
          type="text"
          name="bookWishList"
          value={UserProfileData.bookWishList}
          onChange={handlebookWishListChange}
          placeholder="Books WishList"
        />
        <button type="submit">Update profile</button>
        {registrationStatus && <p>{registrationStatus}</p>}
      </form>
    </div>
  );
};

export default UserProfilePopup;
