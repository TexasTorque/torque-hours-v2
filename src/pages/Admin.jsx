import { useNavigate } from "react-router-dom";
import AdminPassword from "../components/AdminPassword";
import Header from "../components/Header";
import "../index.css";
import { Button, Dropdown, InputGroup, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import default_user from "../assets/default_user.png"
import {
    getAllUsers,
} from "../firebase";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const resolveUsers = async () => {
            getAllUsers().then(setUsers);
        }

        resolveUsers();
    }, []);

    const navigate = useNavigate();

    const setSearch = (search) => {
        if (users.filter(user => user.name.toLowerCase() === search.toLowerCase())[0]) {
            setUser(users.filter(user => user.name.toLowerCase() === search.toLowerCase())[0]);
        } else {
            setUser({});
        }
    }

    return (
        <>
            <Header />
            <AdminPassword />

            <div className="select-user-group">
                <InputGroup>
                    <Form.Control
                        placeholder="Enter Name or Select from Dropdown"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Dropdown className="dropdown-button">
                        <Dropdown.Toggle variant="primary">Select User</Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                            <input
                                className="dropdown-search"
                                autoFocus
                                autoComplete="none"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            ></input>
                            { 
                                users.filter((user) => {
                                    return user.name.toLowerCase().includes(searchQuery.toLowerCase())
                                }).map((user, index) => {
                                    return (
                                    <Dropdown.Item key={index} onClick={(e) => { e.target.parentNode.parentNode.children[0].value=user.name; setUser(user)}}>
                                        {user.name}
                                    </Dropdown.Item>
                                    );
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </InputGroup>
            </div>

            {user.name && 
                <div className="center">
                    <img src={default_user} alt="" style={{borderRadius: "500px", width: "200px"}}/>
                    <h3 style={{ color: "white", marginTop: ".25em"}}>{user.name}</h3>

                    <div className="statistics">
                        <p className="stat">Recorded Hours: {user.hours}</p>   
                        <p className="stat">Volunteer Hours: {user.volunteer}</p>   
                        <p className="stat">Meetings Attended: {user.meetings.length}</p>   
                    </div>
                    
                    <Button className="edit-button">Edit User</Button>
                </div>
            }

            <div className="footer-buttons">
                <Button className="footer-button" onClick={() => navigate("/leaderboard")}>Leaderboard</Button>
                <Button className="footer-button" onClick={() => navigate("/")}>Home</Button>
                <Button className="footer-button" onClick={() => navigate("/attentance")}>Attentance</Button>
            </div>
        </>
    )
}