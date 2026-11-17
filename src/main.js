import './style.css';
import { WordList } from './word-list.js';
import { renderWordList } from './renderers.js';

const wordList = new WordList();

// тестовые данные
wordList.addWord('кот', 'домашнее животное');
wordList.addWord('лес', 'место, где растут деревья');
wordList.addWord('море', 'большое водное пространство');

const container = document.getElementById('word-list');
const form = document.getElementById('word-form');

let selectedWord = null; // Шаг 6: выбранное слово для редактирования

// ---------- Отрисовка ----------
function render() {
  container.innerHTML = renderWordList(wordList);
}
render();

// ---------- Шаг 7: колбек автообновления ----------
wordList.onChange = render;

// ---------- Шаг 3: удаление слов (делегирование) ----------
container.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-action="delete"]');
  if (!btn) return;

  const item = btn.closest('.word-item');
  const word = item.dataset.word;

  // Шаг 6: сброс выбора, если удаляем выделенное слово
  if (selectedWord && selectedWord.word === word) {
    selectedWord = null;
    form.reset();
  }

  wordList.removeWord(word); // render() вызовется через onChange
});

// ---------- Шаг 6: выбор слова для редактирования ----------
container.addEventListener('click', (event) => {
  const item = event.target.closest('.word-item');
  if (!item) return;
  if (event.target.closest('[data-action="delete"]')) return;

  const word = item.dataset.word;
  const found = wordList.words.find(w => w.word === word);
  if (!found) return;

  selectedWord = found;
  form.elements.word.value = found.word;
  form.elements.description.value = found.description;
  form.elements.word.focus();

  document.querySelectorAll('.word-item').forEach(el => el.classList.remove('selected'));
  item.classList.add('selected');

  wordList.changeCurrentWord(found.word);
});

// ---------- Шаг 5 + Шаг 6: отправка формы ----------
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const wordInput = form.elements.word;
  const descInput = form.elements.description;
  const word = wordInput.value.trim();
  const description = descInput.value.trim();

  if (!word) {
    wordInput.focus();
    return;
  }

  if (selectedWord) {
    // режим редактирования
    wordList.updateWord(selectedWord.word, description);
    selectedWord = null;
  } else {
    // режим добавления
    wordList.addWord(word, description);
  }

  form.reset();
  wordInput.focus();
});