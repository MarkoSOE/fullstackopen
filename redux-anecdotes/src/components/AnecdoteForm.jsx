import React from "react";
import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdote";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
	changeNotification,
	clearNotification,
	setNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(createAnecdote(newAnecdote));

		event.target.anecdote.value = "";

		dispatch(
			changeNotification(
				`Successfully added anecdote: ${newAnecdote.content}`,
				5000
			)
		);
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote} autoComplete="false">
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
