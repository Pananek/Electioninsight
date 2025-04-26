# Election-insight
โปรเจกต์ระบบการโหวตออนไลน์ด้วยเทคโนโลยี Blockchain ผ่าน Smart Contract และ Frontend React.js พร้อมเชื่อมต่อกับ MetaMask

# 🚀 ฟีเจอร์
ลงชื่อเข้าใช้งานด้วยกระเป๋า MetaMask
โหวตให้ผู้สมัครได้ 1 ครั้งเท่านั้น
Owner สามารถเพิ่มผู้สมัครได้
Owner สามารถเริ่มต้นและสิ้นสุดการโหวต
แสดงสถานะ Voting Active / Inactive
แสดงคะแนนโหวตของแต่ละผู้สมัคร
มีหน้า Developer Info

# 🛠 เทคโนโลยีที่ใช้
Frontend: React.js, ethers.js, react-router-dom, react-toastify
Smart Contract: Solidity
Blockchain: รองรับ Ethereum (ผ่าน MetaMask)
📂 โครงสร้างโปรเจกต์
/src
 ├── App.js
 ├── App.css
 ├── Components/
 │    ├── Login.js
 │    ├── Connected.js
 │    ├── AddCandidate.js
 │    └── Developer.js
 ├── Contract/
 │    └── Contract.js
⚙️ วิธีติดตั้งและรันโปรเจกต์
git clone [YOUR_REPO_LINK]
cd votinggg

npm install

npm start

🛠️ Tech Stack
React (Frontend Framework)
Ethers.js (เชื่อมต่อ Blockchain)
React Router DOM (จัดการ Routing)
React Toastify (แจ้งเตือน)
Solidity (Smart Contract)
Tailwind CSS (Optional ถ้าใช้ตกแต่งเพิ่มเติม)
Metamask (กระเป๋าเงินเชื่อม Blockchain)

🖥️ การใช้งานเบื้องต้น
เชื่อมต่อกระเป๋า Metamask
เลือกผู้สมัคร → กรอกหมายเลข → กดโหวต
(เฉพาะ Owner) สามารถเพิ่มผู้สมัคร / เปิด-ปิดการโหวตได้



🖥️ ตัวอย่างหน้าเว็บ
| Frontend |
|:-:|
![ข้อความแสดงแทนรูป](https://media.discordapp.net/attachments/1338111493522063410/1365722722180530177/image.png?ex=680e57e6&is=680d0666&hm=836bd7b8ae3284a4f2bd65573ff5fe53e7e20445de755f19a7560f8d3f4b7b59&=&format=webp&quality=lossless&width=1716&height=856)
![ข้อความแสดงแทนรูป](https://media.discordapp.net/attachments/1338111493522063410/1365728232149745805/image.png?ex=680e5d08&is=680d0b88&hm=092678956b37774e3398ba0abb2a8782cfa0d7749fd47e68b74d9bb9015383fd&=&format=webp&quality=lossless&width=1744&height=856)
| ทีมผู้พัฒนา |
![ข้อความแสดงแทนรูป](https://media.discordapp.net/attachments/1338111493522063410/1365728298163896340/image.png?ex=680e5d18&is=680d0b98&hm=96fa270761a588c2886ae8f5065babe17081559bafd0c799fdbdb51e884c1bfd&=&format=webp&quality=lossless)
