import { useState } from 'react';

export const useRequestDeleteTodo = (refreshTodos, dataTodo) => {

    const [isDeleting, setIsDeleting] = useState(false);

    const requesDeleteTodo = () => {
		setIsDeleting(true);
		fetch(`http://localhost:3005/todos/${dataTodo}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('дело удалено:', response);
				refreshTodos();
			})
			.finally(() => setIsDeleting(false));
	};
    return {
		isDeleting,
		requesDeleteTodo,
	};
}