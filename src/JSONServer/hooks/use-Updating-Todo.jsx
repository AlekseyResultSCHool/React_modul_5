import { useState } from 'react';

export const useRequestUpdatingTodo = (refreshTodos, inputValue, dataTodo) => {

    const [isUpdating, setIsUpdating] = useState(false);

    const requesUpdateTodo = () => {
		setIsUpdating(true);
		fetch(`http://localhost:3005/todos/${dataTodo}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: inputValue,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('список обновлен:', response);
				refreshTodos();
			})
			.finally(() => setIsUpdating(false));

	};
    return {
		isUpdating,
		requesUpdateTodo,
	};
}