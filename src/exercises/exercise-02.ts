interface Users {
  id: number;
  name: string;
  bio: string;
  [key: string]: any;
}

export let list: Users[] = [
  {
    id: 1,
    name: 'Ada Lovelace',
    bio: 'Ada Lovelace, foi uma matemática e escritora inglesa reconhecida por ter escrito o primeiro algoritmo para ser processado por uma máquina',
  },
  {
    id: 2,
    name: 'Alan Turing',
    bio: 'Alan Turing foi um matemático, cientista da computação, lógico, criptoanalista, filósofo e biólogo teórico britânico, ele é amplamente considerado o pai da ciência da computação teórica e da inteligência artificial',
  },
  {
    id: 3,
    name: 'Nikola Tesla',
    bio: 'Nikola Tesla foi um inventor, engenheiro eletrotécnico e engenheiro mecânico sérvio, mais conhecido por suas contribuições ao projeto do moderno sistema de fornecimento de eletricidade em corrente alternada.',
  },
  {
    id: 4,
    name: 'Nicolau Copérnico',
    bio: 'Nicolau Copérnico foi um astrônomo e matemático polonês que desenvolveu a teoria heliocêntrica do Sistema Solar.',
  },
];

/**
 *
 * Dado o array [list]:
 * a) Crie uma função que retorne a bio do id passado
 *
 */
export function getBio(id: number) {
  return list.find(user => user.id === id)?.bio;
}

/**
 *
 * b) Crie uma função que retorne o name do id passado
 *
 */
export function getName(id: number) {
  return list.find(user => user.id === id)?.name;
}

/**
 *
 * c) Crie uma função que apague um item da lista a partir de um id passado
 *
 */
export function deleteUser(id: number) {
  list = list.filter(user => user.id !== id);
}

/**
 *
 * d) Crie uma função que altere a bio ou o name a partir de um id passado
 *
 */
export function updateUser(id: number, data: { bio?: string; name?: string }) {
  const user = list.find(user => user.id === id);
  if (!user) return;

  for (const [key, value] of Object.entries(data)) {
    if (value) user[key] = value;
  }
}

/**
 *
 * e) Demonstre todas as funções com o paradigma funcional e com o imperativo
 *
 */
export function getBioImp(id: number) {
  const user = getUser(id);

  return user?.bio;
}

export function getNameImp(id: number) {
  const user = getUser(id);

  return user?.name;
}

function getUser(id: number) {
  for (let userIndex = 0; userIndex < list.length; userIndex++)
    if (list[userIndex]?.id === id) return list[userIndex];
}

export function deleteUserImp(id: number) {
  let index: number | undefined;
  for (let userIndex = 0; userIndex < list.length; userIndex++) {
    if (list[userIndex]?.id === id) {
      index = userIndex;
      break;
    }
  }

  if (index) list.splice(index, 1);
}

export function updateUserImp(
  id: number,
  data: { bio?: string; name?: string }
) {
  for (let userIndex = 0; userIndex < list.length; userIndex++) {
    if (list[userIndex]?.id === id) {
      if (data.bio) list[userIndex].bio = data.bio;
      if (data.name) list[userIndex].name = data.name;
      break;
    }
  }
}
