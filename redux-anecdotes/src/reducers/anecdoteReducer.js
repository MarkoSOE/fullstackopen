import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		addVote(state, action) {
			const id = action.payload;
			console.log(id);
			const annecToChange = state.find((n) => n.id === id);
			console.log(annecToChange);
			const changedAnnec = {
				...annecToChange,
				votes: annecToChange.votes + 1,
			};
			return state.map((annec) => (annec.id !== id ? annec : changedAnnec));
		},
		appendAnecdote(state, action) {
			state.push(action.payload);
		},
		setAnecdotes(state, action) {
			console.log(action.payload);
			return action.payload;
		},
	},
});

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initalizeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		dispatch(appendAnecdote(content));
	};
};

export default anecdoteSlice.reducer;
