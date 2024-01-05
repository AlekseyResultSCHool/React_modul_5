import { useDebounce } from 'use-debounce';

export const useSearchTodos = (todos, searchTodos) => {
    
	const [filterredTodos] = useDebounce(
		todos.filter((todo) => {
			return todo.title.toLowerCase().trim().includes(searchTodos.toLowerCase().trim());
	}), 1000);
	return {
    	filterredTodos,
	};
}


