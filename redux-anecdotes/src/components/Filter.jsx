import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";
import {
	changeNotification,
	clearNotification,
	setNotification,
} from "../reducers/notificationReducer";

const Filter = () => {
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const content = e.target.value;
		dispatch(setFilter(content));
		dispatch(changeNotification("filtering", 10));
	};

	const style = {
		marginBottom: 10,
	};

	return (
		<div style={style}>
			Filter: <input name="filter" onChange={handleChange} />
		</div>
	);
};

export default Filter;
