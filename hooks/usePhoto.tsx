import useAPI from "./useAPI";
const usePhoto =  async( ImagePrompt : any) => {
    // const data=JSON.stringify(ImagePrompt)
    console.log("data in usePhoto ",ImagePrompt);
    try {
        const dataURL = useAPI('/photoAPI', {ImagePrompt});
        return dataURL;
    } catch (error) {
        console.log("Error in usePhoto: ", error);
    }
}
export default usePhoto;