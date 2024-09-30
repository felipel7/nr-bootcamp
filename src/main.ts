import { findVowels } from './exercises/exercise-01';
import './style.css';

/**
 *
 * a) Dar um exemplo de uso com uma palavra recebida via parâmetro da função.
 *
 */
const phrase = 'Olá mundo!';
const vowelsCount = findVowels(phrase);
console.log(createAnswerMessage(phrase, vowelsCount));

/**
 *
 * b) Dar um exemplo de uso com uma palavra recebida via input no formulário.
 *
 */
document
  .getElementById('text-form')
  ?.addEventListener('submit', ($event: SubmitEvent) => {
    $event.preventDefault();

    const $form = new FormData($event.target as HTMLFormElement);
    const inputValue = String($form.get('text-input'));
    if (!inputValue) return;

    const vowelsCount = findVowels(inputValue);
    const message = createAnswerMessage(inputValue, vowelsCount);

    appendAnswerMessage(message);
  });

function createAnswerMessage(phrase: string, vowelsCount: number) {
  return `A frase: "${phrase}" possui ${vowelsCount} vogais.`;
}

// Adiciona a resposta no DOM
function appendAnswerMessage(message: string) {
  let $container = document.getElementById('first-exercise-answer');

  if (!$container) {
    $container = document.createElement('p');
    $container.id = 'first-exercise-answer';
    document.getElementById('first-exercise')?.appendChild($container);
  }

  $container.innerText = message;
}

// Retira a resposta do DOM quando o usuário limpa o form
document.getElementById('text-form')?.addEventListener('reset', () => {
  document.getElementById('first-exercise-answer')?.remove();
});
