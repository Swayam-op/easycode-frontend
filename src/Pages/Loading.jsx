
import { useSelector } from 'react-redux';
import { getIsLoadingStateOfUser } from "../Redux/Reducers/UserReducer";
import LoadingGlobal from "../Components/LoadingGlobal";
const Loading = ()=>{
    const loading = useSelector(getIsLoadingStateOfUser);

    return(
        <>
        <div className={`${loading? "flex" : "hidden" } fixed inset-0 z-50 bg-dark-2 bg-opacity-50 justify-center items-center`}>
            <LoadingGlobal/>
        </div>
        </>
    )
}

export default Loading;