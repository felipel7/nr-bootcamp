import { list } from './data/list';
import { countVowels } from './exercises/exercise-01';
import { deleteUserImp, updateUser } from './exercises/exercise-02';
import './style.css';

/**
 * createAnswerMessage
 *
 * Retorna uma string concatenada com o texto e o número de vogais presentes nele.
 *
 * @param text - Uma string que pode ou não conter vogais.
 * @param totalVowels - O número de vogais contidos em `text`.
 * @returns A `string` que corresponde a mensagem informando o número de vogais no texto.
 *
 * @remarks A função apenas concatena a mensagem. A contagem de vogais deve ser feita anteriormente e passada através do parâmetro `totalVowels`.
 */
function createAnswerMessage(text: string, totalVowels: number): string {
  return `A frase: "${text}" possui ${totalVowels} vogais.`;
}

/**
 * appendAnswerMessage
 *
 * Anexa ou atualiza uma mensagem no DOM. Se o container não existir, ele será criado.
 *
 * @param message - Uma string que representa a mensagem que será anexada ao elemento no DOM.
 * @returns Não deve retornar nada.
 *
 * @remarks A função procura por um elemento com o ID `counter__result`. Se o elemento não for encontrado, um novo elemento `<p>` será criado e adicionado ao container com a classe `counter`.
 */
function appendAnswerMessage(message: string): void {
  let $container = document.getElementById('counter__result');

  if (!$container) {
    $container = document.createElement('p');
    $container.id = 'counter__result';
    document.querySelector('.counter')?.appendChild($container);
  }

  $container.innerText = message;
}

/**
 * renderUserTable
 *
 * Atualiza a tabela de usuários no DOM.
 *
 * @returns Não deve retornar nada.
 *
 * @remarks A função procura a tabela de usuários e altera o seu HTML interno passando os dados de cada usuário conforme a lista atualizada.
 */
function renderUserTable(): void {
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

/**
 * deleteUserFromTable
 *
 * Anexa ao objeto global (window) do navegador uma função que será responsável por chamar a função de excluir um usuário e atualizar a exibição da tabela de usuários no DOM.
 *
 * @param id - Um número que corresponde ao ID do usuário que será excluído.
 * @returns Não deve retornar nada.
 *
 * @remarks Após a exclusão do usuário, a tabela de usuários no DOM é atualizada.
 */
(window as any).deleteUserFromTable = (id: number): void => {
  deleteUserImp(id);
  renderUserTable();
};

(document.querySelector('.counter__form') as HTMLFormElement)?.addEventListener(
  'submit',
  ($event: SubmitEvent) => {
    $event.preventDefault();

    const $form = new FormData($event.target as HTMLFormElement);
    const inputValue = $form.get('counter__input');
    if (!inputValue || typeof inputValue !== 'string') return;

    const vowelsCount = countVowels(inputValue);
    const message = createAnswerMessage(inputValue, vowelsCount);

    appendAnswerMessage(message);
  }
);

document.querySelector('.counter__form')?.addEventListener('reset', () => {
  document.getElementById('counter__result')?.remove();
});

/**
 * clearEditFormInputs
 *
 * Reseta o formulário que é responsável por editar os dados do usuário.
 *
 * @returns Não deve retornar nada.
 *
 * @remarks A função procura o formulário através da classe `edit__form` e reseta todos os seus campos.
 */
function clearEditFormInputs(): void {
  (document.querySelector('.edit__form') as HTMLFormElement).reset();
}

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
    clearEditFormInputs();
  }
);

// Exemplo de uso com uma palavra recebida via parâmetro da função.
const text = 'Olá mundo!';
const totalVowels = countVowels(text);
console.log(createAnswerMessage(text, totalVowels));

renderUserTable();
