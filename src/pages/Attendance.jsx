import { Button, Table } from "react-bootstrap";
import Header from "../components/Header";
import {
    getAllUsers,
} from "../firebase";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Attendance() {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const resolveUsers = async () => {
            getAllUsers().then(users => {
                setUsers(users
                    .filter(user => user.signin)
                    .sort((a, b) => a.signin - b.signin));
            });
        }

        resolveUsers();
    }, []);

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

    const getRank = (rank) => {
        if (rank === 1) return " 👑";
        else if (rank === users.length) return " 😭";
        else if (rank === 2) return " 🥈";
        else if (rank === 3) return " 🥉";
        else return rank;
    }

    return (
        <>
            <Header />
            <Table
                striped
                bordered
                hover
                className="hours-table"
                style={{ marginLeft: "auto", marginRight: "auto", width: "70%", marginBottom: "30px"}}
            >
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th style={{ color: "white", backgroundColor: "black"}}>Name</th>
                        <th style={{ color: "white", backgroundColor: "black", width: "15em"}}>Signed In Time</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .map((user, index) => (
                            <tr key={index}>
                                <th className="hours-cell" style={{ color: "white", backgroundColor: "black"}}>{user.name + getRank(index + 1)}</th>
                                <th className="hours-cell" style={{ color: "white", backgroundColor: "black"}}>{secondsToTime(Math.floor(new Date().getTime() / 1000) - user.signin)}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <div className="footer-buttons">
                <Button className="footer-button" onClick={() => navigate("/leaderboard")}>Leaderboard</Button>
                <Button className="footer-button" onClick={() => navigate("/")}>Home</Button>
                <Button className="footer-button" onClick={() => navigate("/admin")}>Admin</Button>
            </div>
        </>
    )
}