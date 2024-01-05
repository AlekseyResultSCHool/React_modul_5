import React from 'react';
import styles from './style.module.css';
import { useState } from 'react';
import { useRequestAddTodo } from './hooks/use-Add-Todo';
import { useRequestUpdatingTodo } from './hooks/use-Updating-Todo';
import { useRequestDeleteTodo } from './hooks/use-Delete-Todo';
import { useRequestGetTodo } from './hooks/use-Get-Todo';
import { useSearchTodos } from './hooks/use-search-Todos';

export const JSONServer = () => {
	let inputTextValue = React.createRef();
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [dataTodo, setDataTodo] = useState('');
	const [searchTodos, setSearchTodos] = useState('');
	const [inputValue, setInputValue] = useState('');
  	
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);
	const { isLoading, todos, clickSortTodo, sortTodos } = useRequestGetTodo(refreshTodosFlag, refreshTodos);
	const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodos, inputValue);
	const { isUpdating, requesUpdateTodo } = useRequestUpdatingTodo(refreshTodos, inputValue, dataTodo);
	const { isDeleting,	requesDeleteTodo } = useRequestDeleteTodo(refreshTodos, dataTodo);
	const { filterredTodos } = useSearchTodos(todos, searchTodos);

	const clickTodo = ({ target }) => {
		setDataTodo(target.getAttribute('data'));
		inputTextValue.current.value = target.text;
		setInputValue(inputTextValue.current.value);
	};

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.header}>Список важных дел</h1>
				<div className={styles.bbb}>
					<input
						type="text"
						placeholder="Поиск....."
						className={styles.searchInput}
						onChange={(event) => setSearchTodos(event.target.value)}
					/>
				</div>

				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					filterredTodos.map((item) => (
						<li key={item.id}>
							<a href="#" onClick={clickTodo} data={item.id}>
								{item.title}
							</a>
						</li>
					))
				)}
				<section>
					<input type="text" 
					className={styles.displayInput} 
					ref={inputTextValue} 
					onChange={(event) => setInputValue(event.target.value)}
					/>
				</section>
				<button disabled={isCreating} onClick={requestAddTodo}>
					Добавить дело
				</button>
				<button disabled={isUpdating} onClick={requesUpdateTodo} >
					Изменить дело
				</button>
				<button disabled={isDeleting} onClick={requesDeleteTodo}>
					Удалить дело
				</button>
				<useRequestGetTodo />
				<button
					onClick={clickSortTodo}
					className={!sortTodos ? styles.buttomSort : styles.buttomSortRed}
				>
					Сортировка А-Я
				</button>
			</div>
		</>
	);
};
