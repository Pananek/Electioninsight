import React from 'react';
import { Link } from 'react-router-dom';
import './Developer.css'; // import css ของหน้านี้ด้วย

const developers = [
  {
    name: "ภัณฑ์เอนก ชินบุตร",
    role: "Full Stack Developer",
    image: "https://studentscms.spu.ac.th/stdempimg.cfm?empstdtype=STD&vdata=0FDFC9ECD781FDA5052BCED5DA0ECBDC82E7160ED6F8DCDE",
  },
  {
    name: "ณภัทร ใจตั้งมั่น",
    role: "Smart Contract Engineer",
    image: "https://media.discordapp.net/attachments/1338111493522063410/1365685572886204527/IMG_1691.jpg?ex=680e354d&is=680ce3cd&hm=70762c7b815db50f76b8b4d28db6a32591b099c46f96f4006601a9fbafb69bf5&=&format=webp&width=234&height=350",
  },
  {
    name: "อัครนาจ ตุลาธาร",
    role: "UI/UX Designer",
    image: "https://media.discordapp.net/attachments/1338111493522063410/1365685473326137444/stdempimg.png?ex=680e3536&is=680ce3b6&hm=9306077ac905d1e2d47b68ee7452d39816432fad3d4b61d836c4041a9356eaff&=&format=webp&quality=lossless",
  },
];

function Developer() {
  return (
    <div className="developer-container">
      <h1>ทีมผู้พัฒนา</h1>
      <div className="developer-cards">
        {developers.map((dev, index) => (
          <div className="developer-card" key={index}>
            <img src={dev.image} alt={dev.name} />
            <h2>{dev.name}</h2>
            <p>{dev.role}</p>
          </div>
        ))}
      </div>
      <Link to="/">
        <button className="back-button">กลับหน้าหลัก</button>
      </Link>
    </div>
  );
}

export default Developer;
