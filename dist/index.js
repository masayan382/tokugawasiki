"use strict"
class Score {
	constructor() {}
	get totalScore() {
		const soldiers = Soldiers.getInstance()
		return soldiers.activeElementsScore.reduce(
			(total, score) => total + score,
			0
		)
	}
	render() {
		document.querySelector(".score-east-number").textContent = String(
			this.totalScore
		)
	}
	static getInstance() {
		if (!Score.instance) {
			Score.instance = new Score()
		}
		return Score.instance
	}
}
class westScore {
	constructor() {}
	get totalScore() {
		const soldiers = Soldiers.getInstance()
		let eastsoldiersTotal = soldiers.activeElementsScore.reduce(
			(total, score) => total + score,
			0
		)
		return 174400 - eastsoldiersTotal
	}
	render() {
		document.querySelector(".score-west-number").textContent = String(
			this.totalScore
		)
	}
	static getInstance() {
		if (!westScore.instance) {
			westScore.instance = new westScore()
		}
		return westScore.instance
	}
}
class Card {
	constructor(element) {
		this.element = element
		element.addEventListener("click", this.clickEventHandler.bind(this))
	}
	clickEventHandler() {
		this.element.classList.toggle("is-active")
		const score = Score.getInstance()
		score.render()
		const westscore = westScore.getInstance()
		westscore.render()
	}
}
class Soldiers {
	constructor() {
		this.elements = document.querySelectorAll(".legion-card")
		this._activeElements = []
		this._activeElementsScore = []
		this.elements.forEach((element) => {
			new Card(element)
		})
	}
	get activeElements() {
		this._activeElements = []
		this.elements.forEach((element) => {
			if (element.classList.contains("is-active")) {
				this._activeElements.push(element)
			}
		})
		return this._activeElements
	}
	get activeElementsScore() {
		this._activeElementsScore = []
		this.activeElements.forEach((element) => {
			const soldiersScore = element.querySelector(".soldiers-score")
			if (soldiersScore) {
				this._activeElementsScore.push(Number(soldiersScore.textContent))
			}
		})
		return this._activeElementsScore
	}
	static getInstance() {
		if (!Soldiers.instance) {
			Soldiers.instance = new Soldiers()
		}
		return Soldiers.instance
	}
}
const soldiers = Soldiers.getInstance()
