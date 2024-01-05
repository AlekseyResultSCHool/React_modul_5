import { useState } from 'react';

export const useRequestAddTodo = (refreshTodos, inputValue) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = () => {
		setIsCreating(true);
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: inputValue,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('в список добавлено новое дело:', response);
				refreshTodos();
			})
			.finally(() => setIsCreating(false));
	};
	return {
		isCreating,
		requestAddTodo,
	};
};
