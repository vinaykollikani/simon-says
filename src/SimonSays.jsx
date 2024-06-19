import React, { useState, useEffect } from "react";
import "./index.css";

const colorList = ["red", "blue", "green", "yellow"];

function SimonSays() {
	const [gameSequence, setGameSequence] = useState([]);
	const [userSequence, setUserSequence] = useState([]);
	const [gameRound, setGameRound] = useState(1);
	const [message, setMessage] = useState("");
	const [activeState, setActiveState] = useState({
		red: false,
		blue: false,
		green: false,
		yellow: false,
		start: true,
	});

	const shadowToggle = (color) => {
		setActiveState((prevState) => ({
			...prevState,
			[color]: true,
		}));
		setTimeout(() => {
			setActiveState((prevState) => ({
				...prevState,
				[color]: false,
			}));
		}, 500);
	};

	const handleColorClick = (color) => {
		setUserSequence((prevState) => [...prevState, color]);
		shadowToggle(color);
	};

	const generateRandomColor = () => {
		const random = Math.floor(Math.random() * colorList.length);
		return colorList[random];
	};

	const handleStart = () => {
		setTimeout(() => {
			const newColor = generateRandomColor();
			shadowToggle(newColor);
			setGameSequence([newColor]);
			setUserSequence([]);
			setGameRound(1);
			setMessage(`Watch the sequence: Round 1`);
		}, 200);
		setActiveState((prevState) => ({
			...prevState,
			start: false,
		}));
	};

	useEffect(() => {
		if (userSequence.length > 0) {
			const lastIndex = userSequence.length - 1;
			if (userSequence[lastIndex] !== gameSequence[lastIndex]) {
				setMessage("Game Over! Try again.");
				setGameSequence([]);
				setUserSequence([]);
				setGameRound(1);
				setActiveState((prevState) => ({
					...prevState,
					start: true,
				}));
				return;
			}
			if (userSequence.length === gameSequence.length) {
				if (gameRound === 8) {
					setMessage("Congratulations! You completed all rounds.");
					setGameSequence([]);
					setUserSequence([]);
					setGameRound(1);
					setActiveState((prevState) => ({
						...prevState,
						start: true,
					}));
				} else {
					setMessage(`Correct! Get ready for Round ${gameRound + 1}`);
					setTimeout(() => {
						const newColor = generateRandomColor();
						shadowToggle(newColor);
						setGameSequence((prevSequence) => [...prevSequence, newColor]);
						setUserSequence([]);
						setGameRound((prevRound) => prevRound + 1);
					}, 1200);
				}
			}
		}
	}, [userSequence, gameSequence, gameRound]);

	return (
		<div className="w-screen h-screen flex justify-center">
			<div className="max-w-[400px] h-fit p-8 mt-20 md:mt-48 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
				<h1 className="text-3xl font-bold text-center underline">Simon Says Game</h1>
				<div className="box-container grid grid-cols-2 mt-12 max-w-fit mx-auto border-4 relative bg-white">
					<button
						className={`w-36 h-36 border-4 outline-none dark:bg-red-500 bg-red-500 ${activeState.red ? "active" : ""}`}
						id="red"
						onClick={(e) => handleColorClick(e.target.id)}
					></button>
					<button
						className={`w-36 h-36 border-4 outline-none dark:bg-blue-500 bg-blue-500 ${
							activeState.blue ? "active" : ""
						}`}
						id="blue"
						onClick={(e) => handleColorClick(e.target.id)}
					></button>
					<button
						className={`w-36 h-36 border-4 outline-none dark:bg-green-500 bg-green-500 ${
							activeState.green ? "active" : ""
						}`}
						id="green"
						onClick={(e) => handleColorClick(e.target.id)}
					></button>
					<button
						className={`w-36 h-36 border-4 outline-none dark:bg-yellow-500 bg-yellow-500 ${
							activeState.yellow ? "active" : ""
						}`}
						id="yellow"
						onClick={(e) => handleColorClick(e.target.id)}
					></button>
					<button
						className={`start-btn w-24 h-24 border-8 rounded-full bg-[#121212] grid place-items-center font-bold text-2xl  ${
							activeState.start ? "startActive" : "startHidden"
						} transition-all duration-200`}
						id="start"
						onClick={handleStart}
					>
						Start
					</button>
				</div>
				<p className="mt-8 text-center font-bold text-xl underline drop-shadow-2xl">{message}</p>
			</div>
			<p className="absolute bottom-4 max-w-[1000px] text-white px-4 text-sm">
				<span className="font-bold">Objective:</span>
				<br />
				The goal of Simon Says is to follow and repeat a growing sequence of colors. Each round, the game adds one new
				color to the sequence, challenging your memory and attention. Your task is to remember and click the colors in
				the correct order as the sequence gets longer.
			</p>
		</div>
	);
}

export default SimonSays;
