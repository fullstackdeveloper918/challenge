import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import useUser from "../../hooks/useUser";
import Web3 from "web3";
export default function User() {
  const { user } = useAuth();

  const navigate = useNavigate();
  const logout = useLogout();
  const [loading, setLoading] = useState(false);
  const getUser = useUser();

  useEffect(() => {
    getUser();
  }, []);

  async function onLogout() {
    setLoading(true);

    try {
      // Remove the isReloaded flag from localStorage
      localStorage.removeItem("isReloaded");

      // Wait for the logout to complete
      await logout();

      // Navigate only after everything is done
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Set loading to false after logout and navigation
      setLoading(false);
    }
  }

  const [balance, setBalance] = useState(null);
  const walletAddress = user?.wallet_address; // Replace with your wallet address

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // Replace 'YOUR_INFURA_PROJECT_ID' with your actual Infura Project ID
        const infuraUrl = `https://mainnet.infura.io/v3/bdea6ce8c18f4713957dd559affcd2f8 `;

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
  }, [walletAddress]);
  return (
    <div className="container mt-3">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Field</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User ID</td>
            <td>{user?.id}</td>
          </tr>
          {/* <tr>
            <td>Username</td>
            <td>{user?.username}</td>
          </tr> */}
          <tr>
            <td>First Name</td>
            <td>{user?.first_name}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{user?.last_name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user?.email}</td>
          </tr>

          <tr>
            <td>Is Staff</td>
            <td>{user?.is_staff ? "Yes" : "No"}</td>
          </tr>
          {balance !== null && (
            <tr>
              <td>Wallet Balance</td>
              <td>{balance} ETH</td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        className="btn btn-primary"
        disabled={loading}
        type="button"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}
