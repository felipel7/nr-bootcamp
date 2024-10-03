import { list, UpdateUserData, User } from '../data/list';

/**
 * getBio
 *
 * Procura a biografia de um usuário com base no ID fornecido.
 *
 * @param id - Número que corresponde ao ID do usuário.
 * @returns Uma `string` com a biografia do usuário ou `undefined` caso não seja encontrado.
 *
 */
export function getBio(id: number): string | undefined {
  return list.find(user => user.id === id)?.bio;
}

/**
 * getName
 *
 * Procura o Nome de um usuário com base no ID fornecido.
 *
 * @param id - Número que corresponde ao ID do usuário.
 * @returns Uma `string` com a nome do usuário ou `undefined` caso não seja encontrado.
 *
 */
export function getName(id: number): string | undefined {
  return list.find(user => user.id === id)?.name;
}

/**
 * deleteUser
 *
 * Exclui um usuário da lista a partir de um ID fornecido.
 *
 * @param id - Número que corresponde ao ID do usuário a ser excluído.
 * @returns A lista de usuários filtrada, sem o usuário especificado.
 *
 */
export function deleteUser(id: number): User[] {
  return list.filter(user => user.id !== id);
}

/**
 * updateUser
 *
 * Atualiza os dados de um usuário da lista a partir de um ID fornecido.
 *
 * @param id - Número que corresponde ao ID do usuário.
 * @param data - Objeto do tipo `UpdateUserData` contendo os campos opcionais `bio` e/ou `name`.
 * @returns Não deve retornar nada.
 *
 * @remarks Apenas os campos `bio` e `name` presentes em `data` e que não são `undefined` serão atualizados no usuário.
 *
 */
export function updateUser(id: number, data: UpdateUserData): void {
  const user = list.find(user => user.id === id);
  if (!user) return;

  for (const [key, value] of Object.entries(data)) {
    if (value) user[key] = value;
  }
}

/**
 * getBioImp
 *
 * Procura a biografia de um usuário com base no ID fornecido.
 *
 * @param id - Número que corresponde ao ID do usuário.
 * @returns Uma `string` com a biografia do usuário ou `undefined` caso não seja encontrado.
 *
 */
export function getBioImp(id: number): string | undefined {
  const user = getUser(id);

  return user?.bio;
}

/**
 * getNameImp
 *
 * Procura o Nome de um usuário com base no ID fornecido.
 *
 * @param id - Número que corresponde ao ID do usuário.
 * @returns Uma `string` com a nome do usuário ou `undefined` caso não seja encontrado.
 *
 */
export function getNameImp(id: number): string | undefined {
  const user = getUser(id);

  return user?.name;
}

/**
 * getUser
 *
 * Procura o usuário com base no ID fornecido.
 *
 * @param id - Número que corresponde ao ID do usuário.
 * @returns Um usuário do tipo `User` ou `undefined` caso não seja encontrado.
 *
 * @remarks A função utiliza uma abordagem imperativa, iterando manualmente sobre a lista para encontrar o usuário com base no ID fornecido.
 *
 */
function getUser(id: number): User | undefined {
  for (let userIndex = 0; userIndex < list.length; userIndex++)
    if (list[userIndex]?.id === id) return list[userIndex];
}

/**
 * deleteUserImp
 *
 * Exclui um usuário da lista a partir de um ID fornecido.
 *
 * @param id - Número que corresponde ao ID do usuário a ser excluído.
 * @returns Não deve retornar nada.
 *
 */
export function deleteUserImp(id: number): void {
  let index: number | undefined;
  for (let userIndex = 0; userIndex < list.length; userIndex++) {
    if (list[userIndex]?.id === id) {
      index = userIndex;
      break;
    }
  }

  if (typeof index === 'number') list.splice(index, 1);
}

/**
 * updateUserImp
 *
 * Atualiza os dados de um usuário da lista a partir de um ID fornecido.
 *
 * @param id - Número que corresponde ao ID do usuário.
 * @param data - Objeto do tipo `UpdateUserData` contendo os campos opcionais `bio` e/ou `name`.
 * @returns Não deve retornar nada.
 *
 * @remarks Apenas os campos `bio` e `name` presentes em `data` e que não são `undefined` serão atualizados no usuário.
 */
export function updateUserImp(id: number, data: UpdateUserData): void {
  for (let userIndex = 0; userIndex < list.length; userIndex++) {
    if (list[userIndex]?.id === id) {
      if (data.bio) list[userIndex].bio = data.bio;
      if (data.name) list[userIndex].name = data.name;
      break;
    }
  }
}
