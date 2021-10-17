import Sidebar from "../../components/Sidebar";
import { useDispatch } from "react-redux";
import cloudly from "../../icons/cloudly.svg";
import search from "../../icons/search.svg";
import "./Home.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const Home: React.FC = () => {
  return (
    <div className="homeContainer">
      <div className="navBar">
        <div className="title">WeatherApp</div>

        <Link to="/map">
          <div>Home</div>
        </Link>
        <Link to="/">
          <div>About us</div>
        </Link>
      </div>
      <div className="main">
        <div className="leftPart">
          <div className="welcomeText">Welcome</div> <img src={cloudly} />
        </div>
        <div className="rightPart">
          <Link to="/map">
            <div className="searchBox">
              Check your weather <img src={search} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
