import Header from "../components/Header";
import { Button, Dropdown } from "react-bootstrap";
import "../index.css";
import {
    addHours,
    getAllUsers,
    getRank,
    signIn,
    signOut,
    getUID,
    getUserFromUID,
} from "../firebase.jsx"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdown, setDropdown] = useState("Pick User");
    const [showGreeting, setShowGreeting] = useState(false);
    const [signMessage, setSignMessage] = useState("Sign In");

    const maxHours = 4;
    const navigate = useNavigate();

    useEffect(() => {
        const resolveUsers = async () => {
            getAllUsers().then(setUsers);
        }

        resolveUsers();

        if (localStorage.getItem("user")) {
            getUserFromUID(localStorage.getItem("user")).then(useUser);
        }
    }, []);

    const useUser = (user) => {
        setUser(user);
        setDropdown(user.name);
        setShowGreeting(true);
        setSignMessage(user.signin > 0 ? "Sign Out" : "Sign In");

        getUID(user.name).then(uid => localStorage.setItem("user", uid));
    }

    const signInOut = () => {
        if (user.signin) {
            let calcHours = Math.floor(((new Date().getTime() / 1000) - user.signin) / 3600);
            if (calcHours > 0) {
                if (calcHours > maxHours) calcHours = maxHours;
                
                addHours(user, calcHours);
            }
            signOut(user);
            setUser({ name: user.name, volunteer: user.volunteer, hours: user.hours + calcHours, meetings: user.meetings});
            setSignMessage("Sign In");
        } else {
            signIn(user);
            setUser({ name: user.name, volunteer: user.volunteer, hours: user.hours, meetings: user.meetings, signin: Math.floor(new Date().getTime() / 1000)});
            setSignMessage("Sign Out");
        }
    }

    const secondsToTime = (seconds) => {
        let output = "";
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        minutes -= hours * 60;

        if (hours > 0) {
            output += hours + "h ";
        }
        if (minutes > 0) {
            output += minutes + "m";
        }
        if (output === "") return "0m";
        return output;
    }

    return (
        <>
            <Header />
            <div className="main">
                <div className="select-name">
                    <h1 className="name-prompt">Select Your Name:</h1>
                    <Dropdown className="dropdown-button">
                        <Dropdown.Toggle variant="primary">
                            { dropdown }
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                            <input
                            className="dropdown-search"
                            autoFocus
                            autoComplete="none"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            ></input>
                            {
                                users
                                    .filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((user, index) => {
                                        return (
                                            <Dropdown.Item onClick={() => { useUser(user) }} key={index}>
                                                {user.name}
                                            </Dropdown.Item>
                                        );
                                    }
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                
                {showGreeting && 
                <>
                    <div className="greeting">
                        <h2>Hi <span style={{ textDecoration: "underline" }}>{user.name}</span>!</h2>
                    </div>

                    <div className="statistics">
                        <p className="stat">Your Hours This Season: {user.hours}</p>
                        <p className="stat">Your Meetings Attended: {user.meetings.length}</p>
                        <p className="stat">Your Volunteer Hours: {user.volunteer}</p>
                        <p className="stat">Your Hours Rank (Out of {users.length}): #{ getRank(users, user) }</p>
                        <br></br>
                        {user.signin &&
                            <p className="stat">Signed In Time: {secondsToTime(Math.floor(new Date().getTime() / 1000) - user.signin)}</p>
                        }
                    </div>

                    <div className="sign-button-container">
                        <Button className="sign-button" onClick={signInOut}>{signMessage}</Button>
                    </div>
                </>
                }

                <div className="footer-buttons">
                    <Button className="footer-button" onClick={() => navigate("/leaderboard")}>Leaderboard</Button>
                    <Button className="footer-button" onClick={() => navigate("/attendance")}>Attendance</Button>
                    <Button className="footer-button" onClick={() => navigate("/admin")}>Admin</Button>
                </div>
            </div>
        </>
    )
}