import { useEffect, useState } from 'react';

export const useRequestGetTodo = (refreshTodosFlag, refreshTodos) => {

    const [isLoading, setIsLoading] = useState(false);
    const [todos, setTodos] = useState([]);
	const [sortTodos, setSortTodos] = useState(false);
    const [url, setUrl] = useState('http://localhost:3005/todos');
  	
    useEffect(() => {
		setIsLoading(true);
		fetch(url)
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodosFlag]);

	const clickSortTodo = () => {
        setSortTodos(!sortTodos);
    	if (sortTodos === false) {
        	setUrl('http://localhost:3005/todos?_sort=title&_order=asc');
    	}
    	if (sortTodos === true) {
        setUrl('http://localhost:3005/todos');
    	}
    	refreshTodos();
	};

    return {
		clickSortTodo,
		sortTodos,
		isLoading,
		todos,
	};
}