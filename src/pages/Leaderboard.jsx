import "../index.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAllUsers } from "../firebase";

export default function Leaderboard() {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const resolveUsers = async () => {
            getAllUsers().then(users => {
                users.sort((a, b) => b.hours - a.hours);

                setUsers(users);
            });
        }

        resolveUsers();
    }, []);

    const getRank = (rank) => {
        if (rank === 1) return " 👑";
        else if (rank === users.length) return " 😭";
        else if (rank === 2) return " 🥈";
        else if (rank === 3) return " 🥉";
        else return "";
    }

    return (
        <>
            <Header />
            <Table
                striped
                bordered
                hover
                className="hours-table"
                style={{ marginLeft: "auto", marginRight: "auto", width: "80%", marginBottom: "30px"}}
            >
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th style={{ color: "white", backgroundColor: "black", width: "10%"}}>Rank</th>
                        <th style={{ color: "white", backgroundColor: "black", width: "70%"}}>Name</th>
                        <th style={{ color: "white", backgroundColor: "black", width: "10%"}}>Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .map((user, index) => (
                            <tr key={index}>
                                <th className="hours-cell" style={{ color: "white", backgroundColor: "black"}}>{index + 1}</th>
                                <th className="hours-cell" style={{ color: "white", backgroundColor: "black"}}>{user.name + getRank(index + 1)}</th>
                                <th className="hours-cell" style={{ color: "white", backgroundColor: "black"}}>{user.hours}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <div className="footer-buttons-free">
                <Button className="footer-button-free" onClick={() => navigate("/attendance")}>Attendance</Button>
                <Button className="footer-button-free" onClick={() => navigate("/")}>Home</Button>
                <Button className="footer-button-free" onClick={() => navigate("/admin")}>Admin</Button>
            </div>
        </>
    );
}