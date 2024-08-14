import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Custom hook to fetch Ethereum balance
const useEthereumBalance = (walletAddress) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchBalance = async () => {
      setLoading(true);
      try {
        // Connect to the Ethereum network
        const provider = new ethers.providers.InfuraProvider('mainnet'); // or any other provider

        // Fetch the balance
        const balanceBigNumber = await provider.getBalance(walletAddress);
        
        // Convert balance from wei to ether
        const balanceInEther = ethers.utils.formatEther(balanceBigNumber);

        setBalance(balanceInEther);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [walletAddress]);

  return { balance, loading, error };
};

export default useEthereumBalance;
