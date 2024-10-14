import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification(state, action) {
			return action.payload;
		},
		clearNotification() {
			return initialState;
		},
	},
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const changeNotification = (content, interval) => {
	return async (dispatch) => {
		dispatch(setNotification(content));
		setTimeout(() => {
			dispatch(clearNotification());
		}, interval);
	};
};

export default notificationSlice.reducer;
