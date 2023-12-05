import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

type Card = {
	winning: number[]
	numbers: number[]
}

function ConvertToObjectArr(input: string) {
	let cards: {
		winning: number[]
		numbers: number[]
	}[] = []
	input.split("\n").forEach((line) => {
		let card = line.split(":")
		let winningNumbers = card[1].split("|")[0].trim()
		let cardNumbers = card[1].split("|")[1].trim()
		cards.push({
			winning: winningNumbers.split(/\s+|\|/).map((n) => parseInt(n)),
			numbers: cardNumbers.split(/\s+|\|/).map((n) => parseInt(n)),
		})
	})
	return cards
}

function CalculatePointTotal(matches: number) {
	return matches > 0 ? Math.pow(2, matches - 1) : 0
}

function CalculateMatchTotal(card: { winning: number[]; numbers: number[] }) {
	let matches = 0
	card.winning.forEach((num) => {
		if (card.numbers.includes(num)) {
			matches++
		}
	})
	return { matches, points: CalculatePointTotal(matches) }
}

const part1 = (rawInput: string) => {
	const input = ConvertToObjectArr(parseInput(rawInput))

	let total = 0
	input.forEach((card) => {
		total += CalculateMatchTotal(card).points
	})
	return total
}

const part2 = (rawInput: string) => {
	const input = ConvertToObjectArr(parseInput(rawInput))
	let winnings: { card: Card; instances: number }[] = input.map((card, i) => {
		return { card: card, instances: 1 }
	})
	winnings.forEach((card, i) => {
		let matches = CalculateMatchTotal(card.card).matches
		for (let j = 0; j < matches; j++) {
			winnings[1 + i + j].instances += 1 * card.instances
		}
	})

	return winnings.map((w) => w.instances).reduce((a, b) => a + b, 0)
}

run({
	part1: {
		tests: [
			{
				input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
				Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
				Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
				Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
				Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
				Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
				expected: 13,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
				Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
				Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
				Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
				Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
				Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
				expected: 30,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
})
