import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import Web3 from "web3";
import User from "./auth/User";
export default function Home() {
  const { user } = useAuth();
  const getUser = useUser();
  const storedData = localStorage.getItem("etherdatauser");
  const [balance, setBalance] = useState(null);
  const walletAddress = user?.wallet_address; // Replace with your wallet address

  useEffect(() => {
    // Check if the page has been reloaded before
    const isReloaded = sessionStorage.getItem("isReloaded");

    if (!isReloaded) {
      // If not reloaded, reload the page
      sessionStorage.setItem("isReloaded", "true");
      window.location.reload();
    } else {
      // Fetch the balance if the page has already been reloaded
      const fetchBalance = async () => {
        try {
          const infuraUrl = `https://mainnet.infura.io/v3/bdea6ce8c18f4713957dd559affcd2f8`;

          const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

          const balanceInWei = await web3.eth.getBalance(walletAddress);

          const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
          setBalance(balanceInEth);

          console.log(`Wallet Address: ${walletAddress}`);
          console.log(`Balance: ${balanceInEth} ETH`);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      };

      fetchBalance();
    }
  }, [walletAddress]);
  return (
    <div className="container mt-3">
      <h2>
        <div className="row">
          <div className="mb-12">
            {/* {user?.email !== undefined ? ` ${balance !== null && <p>Wallet Balance: {balance} ETH</p>}` : 'Please login first'} */}
            <User />
            {/* {balance !== null && <p>Wallet Balance: {balance} ETH</p>} */}
          </div>
        </div>
      </h2>
    </div>
  );
}
