# Automato_Simulator

## 1. Objetivo
Desenvolver o entendimento de Linguagens Regulares e seu potencial de representação através da implementação de um simulador.

## 2. Descrição
O trabalho deve ser preferencialmente realizado em duplas. Cada dupla deve projetar e desenvolver a aplicação abaixo, empregando a linguagem de livre escolha.

### Simulador de Linguagens Regulares – Requisitos:
- **Representação 1:** Especificar e simular expressões regulares (ER) – maiores detalhes no Anexo 1;
- **Representação 2:** Especificar e simular autômatos finitos através de diagramas de transições:
  - Tratar autômatos finitos determinísticos (AFD) e não-determinísticos (AFND);
  - Permitir a edição/remoção de estados e transições;
  - Permitir o reconhecimento de uma única entrada;
  - Permitir o reconhecimento de múltiplas entradas;
  - Permitir o reconhecimento de palavras passo a passo;
- **Representação 3:** Especificar e simular gramáticas regulares (GR).

## 3. Produto
O programa a ser implementado neste projeto deverá atender rigorosamente os requisitos apresentados acima.

### Prazos:
- Representação 1: **13/09**
- Representação 2: **18/09**
- Representação 3: **20/09**

Além do programa, um relatório com a descrição do trabalho deverá ser entregue (ver seção Critérios).

## 4. Critérios
Os critérios de correção dos trabalhos são:
- **(80%)** O programa funciona corretamente para todos os casos de teste;
- **(20%)** Documentação: relatório simples explicando as técnicas utilizadas para implementar a máquina escolhida, a qualidade da solução e a estruturação do código.

### Atenção:
- O plágio de programas não será tolerado. Programas similares terão nota zero independente de qual for o original e a cópia.
- Cada integrante será avaliado individualmente.

## Anexo 1 – Representação ER
O simulador de ER poderá ser desenvolvido utilizando a biblioteca `stringmatch` (REGEX) do Java. A entrada para a expressão regular deverá conter:
- Dígitos: `0-9`
- Símbolos: `a-zA-Z`
- Operadores: `*` (fechamento), `+` ou `|` (união), `.` (concatenação)
- Parênteses para agrupar expressões.

### Exemplo de Entrada:
- Linguagem formada por `{a,b}` com comprimento igual a 3.
- Exemplo de ER: `(a|b).(a|b).(a|b)`
- Exemplo de entradas aceitas: `aaa`, `aba`, `bbb`...

#### Observações:
- O objetivo é limitar o uso do REGEX às funcionalidades básicas necessárias para a conversão entre ER e autômatos.
- A representação do símbolo ε fica a critério de cada dupla.

Usando REGEX, a expressão pode ser abreviada da seguinte maneira: `^(a|b){3}$`

Onde:
- `^` indica o início da ER;
- `{x, y}` indica o comprimento mínimo `x` e máximo `y` da expressão `(a|b)`;
- `$` indica o fim da ER.
