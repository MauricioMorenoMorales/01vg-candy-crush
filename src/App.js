import { useState, useEffect } from 'react';
const width = 8;
const candyColors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow'];

const App = () => {
	const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
	// This changes the color of a square when there is a group of three colors side by side

	const createBoard = () => {
		const randomColorArrangement = [];
		for (let i = 0; i < width * width; i++) {
			const randomNumberFrom0to5 = Math.floor(
				Math.random() * candyColors.length,
			);
			const randomColor = candyColors[randomNumberFrom0to5];
			randomColorArrangement.push(randomColor);
		}
		setCurrentColorArrangement(randomColorArrangement);
	};
	useEffect(() => {
		createBoard();
	}, []);
	//Verifies when a square color is on the side of another square with the same color
	useEffect(() => {
		// if there is a problem try to put out these functions on the component scope and add its names to useEffect dependency three
		const checkForColumnOfThree = () => {
			for (let i = 0; i < 47; i++) {
				const columnOfThree = [i, i + width, i + width * 2];
				const decidedColor = currentColorArrangement[i];

				if (
					columnOfThree.every(
						square => currentColorArrangement[square] === decidedColor,
					)
				) {
					columnOfThree.forEach(
						square => (currentColorArrangement[square] = ''),
					);
				}
			}
		};
		const CheckForColumnOfFour = () => {
			for (let i = 0; i < 39; i++) {
				const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
				const decidedColor = currentColorArrangement[i];

				if (
					columnOfFour.every(
						square => currentColorArrangement[square] === decidedColor,
					)
				) {
					columnOfFour.forEach(
						square => (currentColorArrangement[square] = ''),
					);
				}
			}
		};
		const CheckForRowOfThree = () => {
			for (let i = 0; i < 64; i++) {
				const rowOfThree = [i, i + 1, i + 2];
				const decidedColor = currentColorArrangement[i];
				const notValid = [
					6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
				];

				if (notValid.includes(i)) continue;

				if (
					rowOfThree.every(
						square => currentColorArrangement[square] === decidedColor,
					)
				) {
					rowOfThree.forEach(square => (currentColorArrangement[square] = ''));
				}
			}
		};
		const CheckForRowOfFour = () => {
			for (let i = 0; i < 64; i++) {
				const rowOfFour = [i, i + 1, i + 2, i + 3];
				const decidedColor = currentColorArrangement[i];
				const notValid = [
					5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47,
					53, 54, 55, 62, 63, 64,
				];

				if (notValid.includes(i)) continue;

				if (
					rowOfFour.every(
						square => currentColorArrangement[square] === decidedColor,
					)
				) {
					rowOfFour.forEach(square => (currentColorArrangement[square] = ''));
				}
			}
		};
		const timer = setInterval(() => {
			CheckForColumnOfFour();
			CheckForRowOfFour();
			checkForColumnOfThree();
			CheckForRowOfThree();
			setCurrentColorArrangement([...currentColorArrangement]);
		}, 100);
		return () => clearInterval(timer);
	}, [currentColorArrangement]);
	console.log(currentColorArrangement);

	return (
		<div className="app">
			<div class="game">
				{currentColorArrangement.map((candyColor, index) => (
					<img
						key={index}
						style={{ backgroundColor: candyColor }}
						alt={candyColor}
						title={candyColor}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
