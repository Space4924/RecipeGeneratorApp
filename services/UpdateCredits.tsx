import AsyncStorage from "@react-native-async-storage/async-storage";

const updateUserCredits = async () => {
  try {
    const userData = await AsyncStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);
      user.credits = Math.max((user.credits || 0) - 1, 0); // prevent negative credits

      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("Updated user credits:", user.credits);
    } else {
      console.warn("No user found in AsyncStorage");
    }
  } catch (error) {
    console.error("Error updating user credits:", error);
  }
};
export default updateUserCredits;