const ocrad = require("async-ocrad")

const puzzleSolve = (puzzleArray, words) => {
	wordPuzzle = parseText(puzzleArray)
	words.forEach((word) => {
		findWord(wordPuzzle, word.toUpperCase())
	})
	return getSolution(wordPuzzle)
}

const getSolution = (solvedPuzzle) => {
	let solution = ""
	for (let row = 0; row < solvedPuzzle.length; row++) {
		for (let column = 0; column < solvedPuzzle[0].length; column++) {
			if (
				solvedPuzzle[row][column] == solvedPuzzle[row][column].toUpperCase()
			) {
				solution += solvedPuzzle[row][column]
			}
		}
	}
	return solution
}

const parseText = (text) => {
	let arr = Array(10)
		.fill()
		.map(() => Array(10))
	text = text.replaceAll(" ", "")
	let lineLen = getLineLen(text)
	text = text.replaceAll("\n", "")
	for (let row = 0; row < text.length / lineLen; row++) {
		for (let column = 0; column < lineLen; column++) {
			let char = text[lineLen * row + column]

			if (char == "|") arr[row][column] = "I"
			else arr[row][column] = char.toUpperCase()
		}
	}
	return arr
}

const getLineLen = (text) => {
	let i = 0
	while (text[i] != "\n") i++

	return i
}

const findWord = (puzzleArray, toFind) => {
	for (let row = 0; row < puzzleArray.length; row++) {
		for (let column = 0; column < puzzleArray[0].length; column++) {
			if (puzzleArray[row][column].toUpperCase() == toFind[0]) {
				if (checkPostion(row, column, puzzleArray, toFind)) {
					return [row, column]
				}
			}
		}
	}
	console.log("word not found")
	return [-1, -1]
}

const checkPostion = (row, column, puzzleArray, word) => {
	wordLen = word.length - 1
	height = puzzleArray.length - 1
	width = puzzleArray[0].length - 1

	// top left
	if (row >= wordLen && column >= wordLen) {
		if (recFind(row, column, puzzleArray, word, -1, -1)) {
			return true
		}
	}
	// top
	if (row >= wordLen) {
		if (recFind(row, column, puzzleArray, word, -1, 0)) {
			return true
		}
	}
	// top right
	if (row >= wordLen && width - column >= wordLen) {
		if (recFind(row, column, puzzleArray, word, -1, 1)) {
			return true
		}
	}
	// right
	if (width - column >= wordLen) {
		if (recFind(row, column, puzzleArray, word, 0, 1)) {
			return true
		}
	}
	// bottom right
	if (width - column >= wordLen && height - row >= wordLen) {
		if (recFind(row, column, puzzleArray, word, 1, 1)) {
			return true
		}
	}
	// bottom
	if (height - row >= wordLen) {
		if (recFind(row, column, puzzleArray, word, 1, 0)) {
			return true
		}
	}
	// bottom left
	if (height - row >= wordLen && column >= wordLen) {
		if (recFind(row, column, puzzleArray, word, 1, -1)) {
			return true
		}
	}
	// left
	if (column >= wordLen) {
		if (recFind(row, column, puzzleArray, word, 0, -1)) {
			return true
		}
	}
	return false
}

const recFind = (
	row,
	column,
	puzzleArray,
	word,
	rowDirection,
	columnDirection
) => {
	if (!word) return true
	if (word[0] == puzzleArray[row][column].toUpperCase()) {
		if (
			recFind(
				row + rowDirection,
				column + columnDirection,
				puzzleArray,
				word.slice(1),
				rowDirection,
				columnDirection
			)
		) {
			puzzleArray[row][column] = puzzleArray[row][column].toLowerCase()
			return true
		}
	}
	return false
}

async function example() {
	const wordsToFind = [
		"ruby",
		"blocks",
		"heredocs",
		"classes",
		"iterator",
		"module",
		"objects",
		"flexible",
		"each",
		"happy",
		"mutable",
		"lambda",
		"hash",
		"array",
	]
	const puzzleArray = await ocrad("puzzle.png")
	const solution = puzzleSolve(puzzleArray, wordsToFind)
	console.log(solution)
}

example()
