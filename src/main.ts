import { countVowels } from './exercises/exercise-01';
import { deleteUser, list, updateUser } from './exercises/exercise-02';
import './style.css';

// 1.b) Dar um exemplo de uso com uma palavra recebida via input no formulário.
document
  .getElementById('text-form')
  ?.addEventListener('submit', ($event: SubmitEvent) => {
    $event.preventDefault();

    const $form = new FormData($event.target as HTMLFormElement);
    const inputValue = String($form.get('text-input'));
    if (!inputValue) return;

    const vowelsCount = countVowels(inputValue);
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

// Tabela de usuários
function renderUserTable() {
  document.querySelector('#user-table tbody')!.innerHTML = `
  ${list
    .map(
      user => `
    <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.bio}</td>
      <td>
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

renderUserTable();

(window as any).deleteUserFromTable = (id: number) => {
  deleteUser(id);
  renderUserTable();
};

// Atualizar dados do usuário
document
  .getElementById('user-form')
  ?.addEventListener('submit', ($event: SubmitEvent) => {
    $event.preventDefault();

    const $form = new FormData($event.target as HTMLFormElement);
    const id = Number($form.get('user-id'));
    const data = {
      bio: String($form.get('user-bio')),
      name: String($form.get('user-name')),
    };

    updateUser(id, data);
    renderUserTable();
    resetUserForm();
  });

// Resetar form do usuário após o envio
function resetUserForm() {
  (document.getElementById('user-form') as HTMLFormElement).reset();
}

// 1.a) Dar um exemplo de uso com uma palavra recebida via parâmetro da função.
const text = 'Olá mundo!';
const totalVowels = countVowels(text);
console.log(createAnswerMessage(text, totalVowels));
