import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput
const convertToGameObject = (input: string) => {
	const games: {
		[key: string]: { green?: number; blue?: number; red?: number }[]
	} = {}
	const lines = input.split("\n")
	lines.forEach((line) => {
		games[line.split(": ")[0].replace("Game ", "").replaceAll("\t", "")] =
			line
				.split(": ")[1]
				.split("; ")
				.map((round) => round.split(", "))
				.map((round) => {
					let roundTotals = {}
					round.forEach((item) => {
						roundTotals[item.split(" ")[1]] = parseInt(
							item.split(" ")[0],
						)
					})
					return roundTotals
				})
	})
	return games
}

const part1 = (rawInput: string) => {
	let input = convertToGameObject(parseInput(rawInput))
	const totals = {
		red: 12,
		green: 13,
		blue: 14,
	}
	let sum = 0
	Object.entries(input).forEach((game) => {
		let gamePlayable = true
		game[1].forEach((round) => {
			Object.entries(round).forEach((item) => {
				if (item[1] > totals[item[0]]) {
					gamePlayable = false
				}
			})
		})
		if (gamePlayable) {
			sum += parseInt(game[0])
		}
	})
	return sum
}

const part2 = (rawInput: string) => {
	const input = convertToGameObject(parseInput(rawInput))
	let power = 0
	Object.entries(input).forEach((game) => {
		let minimums = {
			red: 0,
			green: 0,
			blue: 0,
		}
		game[1].forEach((round) => {
			if (round.red > minimums.red) minimums.red = round.red
			if (round.green > minimums.green) minimums.green = round.green
			if (round.blue > minimums.blue) minimums.blue = round.blue
		})
		power += minimums.red * minimums.green * minimums.blue
	})
	return power
}

run({
	part1: {
		tests: [
			{
				input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
				Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
				Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
				Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
				Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
				`,
				expected: 8,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
				Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
				Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
				Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
				Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
				`,
				expected: 2286,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
})
