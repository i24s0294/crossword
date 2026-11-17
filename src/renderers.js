export function renderWord(word) {
  return `
    <div class="word-item" data-word="${word.word}">
      <strong>${word.word}</strong>: ${word.description}
      <button class="delete-btn" data-action="delete" title="Удалить">×</button>
    </div>
  `;
}

export function renderWordList(wordList) {
  return wordList.words.map(renderWord).join('');
}