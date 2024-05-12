import { whatWeDoContent } from "./constants";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import "./styles.css";
import { getLocalStorageItem } from "../../utils";
import { Button } from "@mui/material";

function Home() {
  const token = getLocalStorageItem("token");
  return (
    <div className="homeContainer">
      <section className="heroImageContainer">
        <div className="mainclass" style={{ display: "flex", flexDirection: "column" }}>
          <h1>Welcome to BookSwpr!!</h1>
          <h2> Your Ultimate Book Exchange Platform</h2>
          {token && token?.length > 0 ? <Link to={ROUTES.BOOKS_LISTING} className="findBooks">
            <Button variant="contained">Find Books</Button>
            </Link> : (
            <>
            <Link
              to={ROUTES.REGISTER}
              style={{
                backgroundColor: "#ff5900",
              }}
              className="homePageButtons"
            >
              <span>Join Us</span>
            </Link>
            </>
            )}
        </div>
      </section>
      <div className="whatWeDoCards">
        {whatWeDoContent.map((item) => (
          <div className="cardContainer" key={item.heading}>
            <h2>{item.heading}</h2>
            <span>{item.content}</span>
          </div>
        ))}
      </div>
      <div className="homePageContent">
        <p>
          {`Discover the joy of reading with BookSwpr! Dive into our vibrant book club community today 
          by signing up for an account. Start sharing the magic of stories with fellow book lovers 
          from around the globe. Join us now and embark on a journey through the enchanting 
          world of literature!`}
        </p>
        <p>
          {`Immerse yourself in the thrill of discovering new stories, forging connections 
          with fellow readers, and fostering a vibrant culture of sharing within our 
          community. Experience the joy of learning, connecting, and sharing in the 
          world of literature with BookSwpr. Join us today and be part of something 
          truly special!`}
        </p>
        <p>{`Here every book holds a unique story waiting to be discovered. 
        Welcome to the captivating realm of BookSwpr!`}</p>
      </div>
    </div>
  );
}

export default Home;
