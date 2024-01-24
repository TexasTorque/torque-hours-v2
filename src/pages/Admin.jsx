import { useNavigate } from "react-router-dom";
import AdminPassword from "../components/AdminPassword";
import Header from "../components/Header";
import "../index.css";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import default_user from "../assets/default_user.png"
import {
    getAllUsers,
    createUser,
} from "../firebase";
import EditUser from "../components/EditUser";
import Settings from "../components/Settings";
import Autocomplete from "../components/Autocomplete";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [editUser, setEditUser] = useState({});
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

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
        if (i == -1) {
            return;
        }

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
            <AdminPassword setSignedIn={setSignedIn} />

            { signedIn &&
                <>
                    <div className="select-user">
                        <Autocomplete width={"21rem"} users={users} height={"300px"} onClick={setSearch}/>
                    </div>

                    {user.create && 
                        <div className="center">
                            <img src={default_user} alt="" style={{borderRadius: "500px", width: "200px"}}/>
                            <h3 style={{ color: "white", marginTop: ".25em", textDecoration: "underline"}}>{user.name}</h3>

                            <div className="statistics">
                                <p className="stat">Recorded Hours: 0</p>
                                <p className="stat">Volunteer Sessions: 0</p>  
                                <p className="stat">Meetings Attended: 0</p>
                                <p className="stat">Graduation Year: {new Date().getFullYear() + 4}</p>
                            </div>
                            
                            <Button className="edit-button" onClick={() => { createUser(user.name).then((uid) => addUser({uid: uid, name: user.name, hours: 0, meetings: [], volunteer: 0, graduation: new Date().getFullYear() + 4}))}}>Create User</Button>
                        </div>
                    }

                    {user.hours >= -99999999 && 
                        <div className="center">
                            <img src={default_user} alt="" style={{borderRadius: "500px", width: "200px"}}/>
                            <h3 style={{ color: "white", marginTop: ".25em", textDecoration: "underline"}}>{user.name}</h3>
                            <p style={{ color: "white"}}>{user.uid}</p>

                            <div className="statistics" style={{marginTop: "-10px"}}>
                                <p className="stat">Recorded Hours: {user.hours}</p>   
                                <p className="stat">Volunteer Sessions: {user.volunteer}</p>   
                                <p className="stat">Meetings Attended: {user.meetings.length}</p>   
                                <p className="stat">Graduation Year: {user.graduation}</p>   
                            </div>
                            
                            <Button className="edit-button" onClick={() => setEditUser(user) }>Edit User</Button>
                        </div>
                    }

                    <EditUser user={editUser} setEditUser={setEditUser} saveUser={saveUser}/>
                    <Settings visible={settingsVisible} setSettingsVisible={setSettingsVisible}/>

                    <div className="footer-buttons">
                        <Button className="footer-button" onClick={() => navigate("/")}>Home</Button>
                        <Button className="footer-button" onClick={() => setSettingsVisible(true)}>Settings</Button>
                    </div>
                </>
            }
        </>
    )
}