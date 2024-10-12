# Automato_Simulator
1. Objetivo: 
Desenvolver o entendimento de Linguagens Regulares e seu potencial de representação através da implementação de um Simulador.

2. Descrição: 
O trabalho deve ser preferencialmente realizado em duplas. Cada dupla deve projetar e desenvolver a aplicação abaixo, empregando a linguagem de livre escolha.
Simulador de Linguagens Regulares – requisitos:
a) Representação 1: especificar e simular expressões regulares (ER) – maiores detalhes no anexo 1;
b) Representação 2: especificar e simular autômatos finitos através de diagramas de transições:
tratar autômatos finitos determinístico (AFD) e autômatos finitos não-determinísticos (AFND);
permitir a edição/remoção de estados e transições;
permitir o reconhecimento de uma única entrada;
permitir o reconhecimento de múltiplas entradas;
permitir o reconhecimento de palavras passo a passo;
c) Representação 3: especificar e simular gramáticas regulares (GR);

3. Produto: 
O programa a ser implementado neste projeto deverá atender rigorosamente os requisitos apresentados acima.
O prazo final para apresentação da Representação 1 será dia 13/09, da Representação 2 será no dia 18/09 e da Representação 3, no dia 20/09. Além do programa, um relatório com a descrição do trabalho deverá ser entregue (ver seção Critérios abaixo).

4. Critérios: 
Os critérios de correção dos trabalhos são:
(80%) O programa funciona corretamente para todos os casos de teste;
(20%) Documentação: relatório simples que explica as técnicas utilizadas para implementar a máquina escolhida. Discutir a qualidade da solução implementada e a estruturação do código.
Atenção:
(-) O plágio (cópia) de programas não será tolerado. Quaisquer programas similares terão nota zero independente de qual for o original e qual for a cópia.
(--) Cada integrante será avaliado individualmente.

Anexo 1 – Representação ER
O simulador de ER poderá ser desenvolvido utilizando a biblioteca stringmatch (REGEX) do Java. A entrada para a expressão regular SÓ PODERÁ CONTER dígitos: 0-9, símbolos: a-zA-Z, operador fechamento: *, operador união: + ou |, operador concatenação: . e abre-fecha parênteses: ().
Ex: Linguagem formada por {a,b} com comprimento igual a 3.
A entrada da ER no programa deverá ser conforme o exemplo a seguir: (a|b).(a|b).(a|b)
Exemplo de entradas aceitas: aaa, aba, bbb...
Obs:
(-) A ideia é limitar o REGEX para as funcionalidades básicas necessárias para a conversão entre ER e autômatos.
(--) A representação para o símbolo ε fica a critério de cada dupla.
Usando REGEX, a expressão pode ser abreviada da seguinte maneira: ^(a|b){3}$
Onde:
^ indica o inicio da ER
{x, y} comprimento para (a|b), sendo x: o tamanho mínimo e y, o máximo.
$ fim da ER 
