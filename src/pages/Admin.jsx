import { useNavigate } from "react-router-dom";
import AdminPassword from "../components/AdminPassword";
import Header from "../components/Header";
import "../index.css";
import { Button, Dropdown, InputGroup, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import default_user from "../assets/default_user.png"
import {
    getAllUsers,
    createUser,
} from "../firebase";
import EditUser from "../components/EditUser";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [editUser, setEditUser] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const resolveUsers = async () => {
            getAllUsers().then(setUsers);
        }

        resolveUsers();
    }, []);

    const navigate = useNavigate();

    const setSearch = (search) => {
        if (search === "") {setUser({}); return; }
        if (users.filter(user => user.name.toLowerCase() === search.toLowerCase())[0]) {
            setUser(users.filter(user => user.name.toLowerCase() === search.toLowerCase())[0]);
        } else {
            setUser({create: true, name: search});
        }
    }

    const saveUser = (newUser) => {
        if (user.name === newUser.name && user.hours === newUser.hours && user.meetings === newUser.meetings && user.volunteer === newUser.volunteer) return;
        const i = users.indexOf(user);

        let newUsers = users;
        newUsers[i] = newUser;

        setUsers(newUsers);

        document.getElementById("main-search").value = newUser.name;

        setUser(newUser);
    }

    const addUser = (user) => {
        let newUsers = users;
        newUsers.push(user);

        setUsers(newUsers);

        setUser(user);
    }

    return (
        <>
            <Header />
            <AdminPassword />

            <div className="select-user-group">
                <InputGroup>
                    <Form.Control
                        id="main-search"
                        placeholder="Select or Enter Name"
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
                                users
                                    .filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((user, index) => {
                                        return (
                                            <Dropdown.Item key={index} onClick={(e) => { e.target.parentNode.parentNode.children[0].value=user.name; setEditUser({}); setUser(user)}}>
                                                {user.name}
                                            </Dropdown.Item>
                                        );
                                    }
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </InputGroup>
            </div>

            {user.create && 
                <div className="center">
                    <img src={default_user} alt="" style={{borderRadius: "500px", width: "200px"}}/>
                    <h3 style={{ color: "white", marginTop: ".25em", textDecoration: "underline"}}>{user.name}</h3>

                    <div className="statistics">
                        <p className="stat">Recorded Hours: 0</p>   
                        <p className="stat">Volunteer Hours: 0</p>   
                        <p className="stat">Meetings Attended: 0</p>   
                    </div>
                    
                    <Button className="edit-button" onClick={() => { createUser(user.name); addUser({name: user.name, hours: 0, meetings: [], volunteer: 0}) }}>Create User</Button>
                </div>
            }

            {user.hours >= -99999999 && 
                <div className="center">
                    <img src={default_user} alt="" style={{borderRadius: "500px", width: "200px"}}/>
                    <h3 style={{ color: "white", marginTop: ".25em", textDecoration: "underline"}}>{user.name}</h3>

                    <div className="statistics">
                        <p className="stat">Recorded Hours: {user.hours}</p>   
                        <p className="stat">Volunteer Hours: {user.volunteer}</p>   
                        <p className="stat">Meetings Attended: {user.meetings.length}</p>   
                    </div>
                    
                    <Button className="edit-button" onClick={() => setEditUser(user) }>Edit User</Button>
                </div>
            }

            <EditUser user={editUser} setEditUser={setEditUser} saveUser={saveUser}/>

            <div className="footer-buttons">
                <Button className="footer-button" onClick={() => navigate("/leaderboard")}>Leaderboard</Button>
                <Button className="footer-button" onClick={() => navigate("/")}>Home</Button>
                <Button className="footer-button" onClick={() => navigate("/attendance")}>Attendance</Button>
            </div>
        </>
    )
}