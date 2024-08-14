import useAuth from "./useAuth";
import useAxiosPrivate from "./usePrivate";

export default function useUser() {
  const { isLoggedIn, setUser, setIsLoggedIn } = useAuth();
  const axiosPrivateInstance = useAxiosPrivate();
  console.log(isLoggedIn, "isLoggedIn");

  async function getUser() {
    if (!isLoggedIn) {
      return;
    }

    try {
      const { data } = await axiosPrivateInstance.get("auth/user");
      console.log(data, "datatatat");

      setUser(data);
    } catch (error) {
      console.log("===", error.response);
    }
  }

  return getUser;
}
