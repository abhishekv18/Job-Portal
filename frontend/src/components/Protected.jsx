import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({children}) => {
    const {user} = useSelector(store=>store.auth);

    const navigate = useNavigate();

    useEffect(()=>{
        if(user === null || user.role == 'recruiter'){
            navigate("/");//galat hai to ye
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
};
export default Protected;