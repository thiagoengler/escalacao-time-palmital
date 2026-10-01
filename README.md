# Escalação — Time de Palmital

Esta página usa, sem redesenho, as quatro artes exportadas do Photoshop:

- `assets/fundo.jpg`
- `assets/texto.png`
- `assets/grade.png`
- `assets/saulo-pedroso.png`

Abra `index.html`. As setas esquerda e direita percorrem a lista inteira em ordem, passando para o próximo candidato mesmo ao fim de cada linha; as setas cima e baixo mantêm a navegação por coluna. O círculo fica atrás do retrato, o escolhido ganha uma ampliação curta e o painel da direita flutua suavemente. Por enquanto, o painel animado da direita é o do Saulo Pedroso.

Para acrescentar um candidato, exporte no Photoshop um PNG de 1920 × 1080 com fundo transparente e o painel completo na mesma posição de `saulo-pedroso.png`; então informe o arquivo para adicioná-lo ao campo `art` em `app.js`. Esse é o formato mais seguro, pois preserva exatamente o enquadramento, a tipografia e o painel da arte original.

Quando houver novas artes, envie os PNGs por aqui ou compartilhe uma pasta do Google Drive. Eles serão adicionados a `assets/` e publicados na atualização seguinte.
