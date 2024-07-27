import { store } from "../redux/store/aioutputstore";

const checkSessionExpiry = () => {
    const loginTimeStamp = localStorage.getItem('loginTimeStamp');
    const currentTime = new Date().getTime();
    const twentyFourHours= 24 * 60 * 60 * 1000;

    if(loginTimeStamp && (currentTime - loginTimeStamp) > twentyFourHours) {
        localStorage.clear();
        store.dispatch({ type: "RESET" });
        window.location.reload();
        toast.error("Session Expired! Please login again.");
    }
};

export default checkSessionExpiry;