
import { useSelector } from 'react-redux';
import { selectLoadingState } from "../Redux/Reducers/LoadingReducer";
import LoadingGlobal from "../Components/LoadingGlobal";
const Loading = ()=>{
    const loading = useSelector(selectLoadingState);

    return(
        <>
        <div className={`${loading? "flex" : "hidden" } fixed inset-0 z-50 bg-dark-2 bg-opacity-50 justify-center items-center`}>
            <LoadingGlobal/>
        </div>
        </>
    )
}

export default Loading;