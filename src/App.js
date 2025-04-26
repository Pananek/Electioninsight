import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Login from './Components/Login';
import Connected from './Components/Connected';
import { contractABI, contractAddress } from './Contract/Contract';
import AddCandidate from './Components/AddCandidate';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Developer from './Components/Developer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState("");
  const [canVote, setCanVote] = useState(true);
  const [isAddingCandidate, setIsAddingCandidate] = useState(false);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [votingActive, setVotingActive] = useState(false);

  // สร้าง instance ของ contract
  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  };

  useEffect(() => {
    if (window.ethereum) {
      fetchOwner();
      fetchVotingStatus();
      checkCanVote();
      getCandidates();
      window.ethereum.on('accountsChanged', async (accounts) => {
        if (accounts.length > 0) {
          const newAddress = accounts[0];
          setAccount(newAddress);
          setIsConnected(true);
          await checkCanVote(newAddress);
          await getCandidates();
        } else {
          setAccount(null);
          setIsConnected(false);
        }
      });
    }
  }, []);

  async function connectMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);
        await checkCanVote(address);
        await getCandidates();
        await fetchVotingStatus();
      } catch (error) {
        console.error("Connect error:", error);
      }
    } else {
      toast.error("กรุณาติดตั้ง MetaMask ก่อนใช้งาน");
    }
  }

  async function fetchOwner() {
    const contract = getContract();
    const ownerAddress = await contract.owner();
    setOwner(ownerAddress);
  }

  async function fetchVotingStatus() {
    try {
      const contract = getContract();
      const status = await contract.votingActive();
      setVotingActive(status);
    } catch (error) {
      console.error("Error fetching voting status:", error);
    }
  }

  async function startVoting() {
    try {
      setLoading(true);
      const contract = getContract();
      const tx = await contract.startVoting();
      await tx.wait();
      alert("Voting started!");
      await fetchVotingStatus();
    } catch (error) {
      console.error("Error starting voting:", error);
      alert("Start voting failed.");
    } finally {
      setLoading(false);
    }
  }

  async function endVoting() {
    try {
      setLoading(true);
      const contract = getContract();
      const tx = await contract.endVoting();
      await tx.wait();
      alert("Voting ended!");
      await fetchVotingStatus();
    } catch (error) {
      console.error("Error ending voting:", error);
      alert("End voting failed.");
    } finally {
      setLoading(false);
    }
  }

  async function getCandidates() {
    try {
      const contract = getContract();
      const candidatesList = await contract.getCandidates();
      const formattedCandidates = candidatesList.map((candidate, index) => ({
        index: index + 1,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber(),
      }));
      setCandidates(formattedCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }

  async function handleAddCandidate(name) {
    try {
      const contract = getContract();
      const tx = await contract.addCandidate(name);
      await tx.wait();
      toast.success("เพิ่มผู้สมัครสำเร็จ");
      await getCandidates();
      setIsAddingCandidate(false);
    } catch (error) {
      console.error("เพิ่มผู้สมัครผิดพลาด:", error);
      toast.error("เพิ่มผู้สมัครไม่สำเร็จ โปรดลองใหม่");
    }
  }

  async function handleNumber(e) {
    setNumber(e.target.value);
  }

  async function checkCanVote(address) {
    try {
      const contract = getContract();
      const voted = await contract.hasVoted(address);
      setCanVote(!voted);
    } catch (error) {
      console.error("Error checking vote status:", error);
    }
  }

  async function handleVote() {
    try {
      if (!number) {
        toast.error("กรุณากรอกหมายเลขผู้สมัครก่อนโหวต");
        return;
      }
      const contract = getContract();
      const tx = await contract.vote(parseInt(number));
      await tx.wait();
      toast.success("โหวตสำเร็จ!");
      await checkCanVote(account);
      await getCandidates();
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("โหวตไม่สำเร็จ โปรดลองใหม่");
    }
  }

  return (
    <BrowserRouter>
     <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={
          <div className="App">
            {/* หน้า Home */}
            {isConnected ? (
              isAddingCandidate ? (
                <AddCandidate addCandidate={handleAddCandidate} backToHome={() => setIsAddingCandidate(false)} />
              ) : (
                <>
                  <Connected
                    account={account}
                    candidates={candidates}
                    number={number}
                    handleNumber={handleNumber}
                    handleVote={handleVote}
                    canVote={canVote}
                  />
                  {account?.toLowerCase() === owner?.toLowerCase() && (
                    <div className="admin-panel">
                      <div className={`status-badge ${votingActive ? "status-active" : "status-inactive"}`}>
                        {votingActive ? "Voting Active" : "Voting Inactive"}
                      </div>

                      <div className="buttons">
                        <button onClick={startVoting} disabled={loading || votingActive}>
                          Start Voting
                        </button>
                        <button onClick={endVoting} disabled={loading || !votingActive} className="destructive">
                          End Voting
                        </button>
                      </div>

                      <button className="add-candidate-button" onClick={() => setIsAddingCandidate(true)}>
                        เพิ่มผู้สมัคร
                      </button>
                    </div>
                  )}
                </>
              )
            ) : (
              <Login connectWallet={connectMetamask} />
            )}

            {/* ปุ่มดูหน้าผู้พัฒนา */}
            <div className="developer-link">
              <Link to="/developer">
                <button className="developer-button">ผู้พัฒนา</button>
              </Link>
            </div>
          </div>
        } />

        <Route path="/developer" element={<Developer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
