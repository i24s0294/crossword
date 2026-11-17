import { Word } from './word.js';

export class WordList {
  constructor() {
    this.words = [];
    this.onChange = null;        // колбек при изменении списка
    this.onCurrentChange = null; // колбек при смене выбранного слова
  }

  _notify() {
    if (this.onChange) this.onChange();
  }

  addWord(word, description) {
    this.words.push(new Word(word, description));
    this._notify();
  }

  removeWord(word) {
    this.words = this.words.filter(w => w.word !== word);
    this._notify();
  }

  updateWord(word, description) {
    const found = this.words.find(w => w.word === word);
    if (found) {
      found.description = description;
      this._notify();
    }
  }

  changeCurrentWord(word) {
    if (this.onCurrentChange) this.onCurrentChange(word);
  }
}