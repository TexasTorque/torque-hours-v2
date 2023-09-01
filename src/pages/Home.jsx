import Header from "../components/Header";
import { Button, Dropdown } from "react-bootstrap";
import "../index.css";
import {
    getAllUsers,
    getRank,
} from "../firebase.jsx"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdown, setDropdown] = useState("Pick User");
    const [showGreeting, setShowGreeting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const resolveUsers = async () => {
            getAllUsers().then(setUsers);
        }

        resolveUsers();
    });

    return (
        <>
            <Header />
            <div className="main">
                <div className="select-name">
                    <h1 className="name-prompt">Select Your Name:</h1>
                    <Dropdown className="dropdown-button" onBlur={() => setSearchQuery("")}>
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
                                users.filter((user) =>
                                    user.name.toLowerCase().includes(searchQuery.toLowerCase())
                                ).map((user, index) => {
                                    return (
                                    <Dropdown.Item onClick={() => {setUser(user); setDropdown(user.name); setShowGreeting(true)}} key={index}>
                                        {user.name}
                                    </Dropdown.Item>
                                    );
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                
                {showGreeting && 
                <>
                    <div className="greeting">
                        <h2>Hi {user.name}!</h2>
                    </div>

                    <div className="statistics">
                        <p className="stat">Your Hours This Season: {user.hours}</p>
                        <p className="stat">Your Meetings Attended: {user.meetings.length}</p>
                        <p className="stat">Your Hours Rank (Out of 71): #{getRank(users, user)}</p>
                    </div>

                    <div className="sign-button-container">
                        <Button className="sign-button">Sign In</Button>
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