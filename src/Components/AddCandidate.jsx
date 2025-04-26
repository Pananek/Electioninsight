    import React, { useState } from "react";

    const AddCandidate = ({ addCandidate, backToHome }) => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === "") {
        alert("กรุณากรอกชื่อผู้สมัคร");
        return;
        }
        addCandidate(name);
        setName("");
    };

    return (
        <div className="add-candidate-container">
        <h1>เพิ่มผู้สมัคร</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="ชื่อผู้สมัคร"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-candidate"
            />
            <button type="submit" className="submit-button">
            เพิ่ม
            </button>
        </form>
        <button onClick={backToHome} className="back-button">
            กลับหน้าแรก
        </button>
        </div>
    );
    };

    export default AddCandidate;
