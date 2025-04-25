import updateUserCredits from "@/services/UpdateCredits";
import useAPI from "./useAPI";
const usePhoto =  async( ImagePrompt : any) => {
    try {
        const dataURL = useAPI('/photoAPI', {ImagePrompt});
        updateUserCredits();
        return dataURL;
    } catch (error) {
        console.log("Error in usePhoto: ", error);
    }
}
export default usePhoto;