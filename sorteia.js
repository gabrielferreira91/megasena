const printNumbers = document.getElementById('numeros')
const lista = document.querySelector('#ulList')

const maximo = 60
const maximo2 = 59
const maximo3 = 55

const rangedNum = 4
let qtidade = 10

let qtdadeNumerosSorteados = 6

/*Declarando as váriaveis do programa*/
let todosnum = []
let sequencia1 = 0
let sequencia2 = 0
var uniqueArr = []

/* Funções utilizadas */

function sorteiaNumero(maximo) {
  let numero
  numero = Math.floor(Math.random() * maximo + 1)
  return numero
}

function sorteiaNovoNumero(maximo) {
  const novoNum = Math.floor(Math.random() * maximo) + 1;

  if (todosnum.includes(novoNum)) {
    return sorteiaNovoNumero(maximo); 
  }
  return novoNum; 
}

function escolheSeq1(nome, maximo) {
  nome = sorteiaNumero(maximo)
  todosnum.push(nome)
  todosnum.push(nome + 1)
  return nome
}

// function escolheSeq2(nome, maximo, ranged) {
//   nome = sorteiaNovoNumero(maximo-1)
//   todosnum.push(nome)
//   numero = Math.floor(Math.random() * ranged + 2)
//   todosnum.push(nome + numero)
//   return nome
// }

function escolheSeq2(nome, maximo, ranged) {
  nome = sorteiaNovoNumero(maximo-1)
  //todosnum.push(nome)
  numero = Math.floor(Math.random() * ranged + 2)

  //todosnum.push(nome + numero)
  if (todosnum.includes(nome+numero)) {
    return escolheSeq2(nome, maximo, ranged); 
  }
  else {
    todosnum.push(nome)
    todosnum.push(nome + numero)
  }
  return nome
}

function arrumaNum(a, b) {
  if (a > b) return 1
  if (a < b) return -1
  if (a == b) return todosnum.push(sorteiaNovoNumero(maximo))
  return 0
}

function arrumaSeq(a, b) {
  return a - b; // Retorna os números em ordem crescente
}

function sortearJogo() {
  qtdadeNumerosSorteados = document.querySelector('input[name="numero"]:checked').value;

  sequencia1 = escolheSeq1(sequencia1, maximo2)
  sequencia2 = escolheSeq2(sequencia1, maximo3, rangedNum)
  
  while (todosnum.length < qtdadeNumerosSorteados)
  {
    todosnum.push(sorteiaNovoNumero(maximo))
  }

  todosnum.sort(arrumaNum)

  console.log(todosnum)
  uniqueArr = [...new Set(todosnum)]

  while (uniqueArr.length < qtdadeNumerosSorteados) {    
      uniqueArr.push(sorteiaNovoNumero(maximo))
    }
  uniqueArr.sort(arrumaSeq)
  uniqueArr = uniqueArr.join(' - ')

  return uniqueArr
}

function handleSort() {
  qtidade = document.getElementById("qtd").value

  for (let i = 0; i < qtidade; i++) {
    sortearJogo()

    const numeroDeJogos = Array.from(lista.querySelectorAll('li')).length
    const item = document.createElement('li')

    item.value = uniqueArr

    item.id = `item-${numeroDeJogos + 1}`

    item.innerHTML = uniqueArr
    lista.appendChild(item)

    uniqueArr.length = 0
    todosnum.length = 0
  }
}