import { countVowels } from './exercises/exercise-01';
import { deleteUser, list, updateUser } from './exercises/exercise-02';
import './style.css';

function createAnswerMessage(text: string, totalVowels: number): string {
  return `A frase: "${text}" possui ${totalVowels} vogais.`;
}

function appendAnswerMessage(message: string) {
  let $container = document.getElementById('counter__result');

  if (!$container) {
    $container = document.createElement('p');
    $container.id = 'counter__result';
    document.querySelector('.counter')?.appendChild($container);
  }

  $container.innerText = message;
}

function renderUserTable() {
  document.querySelector('.table__body')!.innerHTML = `
  ${list
    .map(
      user => `
    <tr>
      <td class="table__data">${user.id}</td>
      <td class="table__data">${user.name}</td>
      <td class="table__data">${user.bio}</td>
      <td class="table__data">
        <button onclick="deleteUserFromTable(${user.id})" title="Excluir ${user.name}" >
          <img src="../trash.svg" alt="Lixeira">
        </button>
      </td>
    </tr>
    `
    )
    .join('')} 
`;
}

function resetUserForm() {
  (document.querySelector('.edit__form') as HTMLFormElement).reset();
}

(window as any).deleteUserFromTable = (id: number) => {
  deleteUser(id);
  renderUserTable();
};

// 1.b) Dar um exemplo de uso com uma palavra recebida via input no formulário.
(document.querySelector('.counter__form') as HTMLFormElement)?.addEventListener(
  'submit',
  ($event: SubmitEvent) => {
    $event.preventDefault();

    const $form = new FormData($event.target as HTMLFormElement);
    const inputValue = String($form.get('counter__input'));
    if (!inputValue) return;

    const vowelsCount = countVowels(inputValue);
    const message = createAnswerMessage(inputValue, vowelsCount);

    appendAnswerMessage(message);
  }
);

document.querySelector('.counter__form')?.addEventListener('reset', () => {
  document.getElementById('counter__result')?.remove();
});

(document.querySelector('.edit__form') as HTMLFormElement)?.addEventListener(
  'submit',
  ($event: SubmitEvent) => {
    $event.preventDefault();

    const $form = new FormData($event.target as HTMLFormElement);
    const id = Number($form.get('edit__id-input'));
    const data = {
      bio: String($form.get('edit__bio-input')),
      name: String($form.get('edit__name-input')),
    };

    updateUser(id, data);
    renderUserTable();
    resetUserForm();
  }
);

// 1.a) Dar um exemplo de uso com uma palavra recebida via parâmetro da função.
const text = 'Olá mundo!';
const totalVowels = countVowels(text);
console.log(createAnswerMessage(text, totalVowels));

renderUserTable();
