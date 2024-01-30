import { useDispatch } from "react-redux";
import { getSolutionsThunk } from "../Redux/Reducers/SolutionReducer";

const dispatch = useDispatch();
function callGetSolutions(){
    dispatch(getSolutionsThunk())
}