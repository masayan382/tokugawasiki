//東軍のみで開発開始
interface Scoreable {
  readonly totalScore: number;
  render (): void;
}
interface westScoreable {
  readonly totalScore: number;
  render (): void;
}
interface Cardable {
  element: HTMLDivElement;
  clickEventHandler (): void;
}
interface Soldiersable {
  elements: NodeListOf<HTMLDivElement>;
  readonly activeElements: HTMLDivElement[];
  readonly activeElementsScore: number[];
}

class Score implements Scoreable {
  private static instance: Score;
  get totalScore () {
    const soldiers = Soldiers.getInstance();
    return soldiers.activeElementsScore.reduce((total, score) => total + score, 0)
  }
  render () {
    document.querySelector('.score-east-number')!.textContent = String(this.totalScore)
  }
  private constructor() { };

  static getInstance () {
    if (!Score.instance) {
      Score.instance = new Score();
    }
    return Score.instance;
  }
}

class westScore implements westScoreable {
  private static instance: westScore;
  get totalScore () {
    const soldiers = Soldiers.getInstance();
    let eastsoldiersTotal = soldiers.activeElementsScore.reduce((total, score) => total + score, 0)
    return 174400 - eastsoldiersTotal;
  }
  render () {
    document.querySelector('.score-west-number')!.textContent = String(this.totalScore)
  }
  private constructor() { };

  static getInstance () {
    if (!westScore.instance) {
      westScore.instance = new westScore();
    }
    return westScore.instance;
  }
}


class Card implements Cardable {
  constructor(public element: HTMLDivElement) {
    element.addEventListener('click', this.clickEventHandler.bind(this));
  }
  clickEventHandler () {
    this.element.classList.toggle('is-active');
    const score = Score.getInstance();
    score.render();
    const westscore = westScore.getInstance()
    westscore.render();
  }
}
class Soldiers implements Soldiersable {
  private static instance: Soldiers;
  elements = document.querySelectorAll<HTMLDivElement>('.legion-card');
  private _activeElements: HTMLDivElement[] = [];
  private _activeElementsScore: number[] = [];
  get activeElements () {
    this._activeElements = [];
    this.elements.forEach(element => {
      if (element.classList.contains('is-active')) {
        this._activeElements.push(element);
      }
    })
    return this._activeElements;
  }
  get activeElementsScore () {
    this._activeElementsScore = [];
    this.activeElements.forEach(element => {
      const soldiersScore = element.querySelector('.soldiers-score');
      if (soldiersScore) {
        this._activeElementsScore.push(Number(soldiersScore.textContent))
      }
    })
    return this._activeElementsScore;
  }
  private constructor() {
    this.elements.forEach(element => {
      new Card(element);
    })
  }
  static getInstance () {
    if (!Soldiers.instance) {
      Soldiers.instance = new Soldiers
    }
    return Soldiers.instance;
  }
}
const soldiers = Soldiers.getInstance();
