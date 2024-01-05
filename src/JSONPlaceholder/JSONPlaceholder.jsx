import { useEffect, useState } from 'react';
import styles from './style.module.css';

export const JSONPlaceholder = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedProducts) => {
				setProducts(loadedProducts);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<>
			<div className={styles.container}>
				{isLoading
					?	<div className={styles.loader}></div>
					:products.map((item) => (
					<li key={item.id}>
						<a  href="#">{item.title}</a>
					</li>
				))}
			</div>
		</>
	);
};
