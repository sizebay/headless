# @sizebay/headless
Sizebay Headless Package. O conceito de Headless indica que toda a disponibilidade do Provador Virtual será concentrada somente nos métodos e chamadas para os serviços da Sizebay, enquanto o cliente/desenvolvedor será responsável pelo layout. 

# Ordem de Módulos Recomendada
1. `getProduct`: busca os dados do produto primeiro, para verificar se o Provador Virtual é compatível com aquela sessão
2. `createUser`: cria o usuário com base nos dados informados na UI. Você não precisa buscar o usuário novamente, pois o retorno deste método já retorna a assinatura atualizada.
3. `getRecommendation`: retorna a recomendação com base no perfil ativo do usuário
4. `updateUser`: caso o usuário altere medidas, gênero ou dados do shape do corpo. Você não precisa buscar o usuário novamente, pois o retorno deste método já retorna a assinatura atualizada.

# Boas Práticas
1. Utilize sempre os types assistidos da lib (e.g `import { type SizebayProduct } from '@sizebay/headless')` para manter a assinatura dos seus objetos consistentes
2. Caso a criação de custom hooks seja feita em volta desses métodos, lembre-se de usar corretamente `useMemo` e `useCallback` para evitar memory drains and obsessive computing
3. Lembre-se que o headless não oferece UI alguma. O intuito é expandir a integração da Sizebay com qualquer plataforma que tenha o interesse de integrar nossos sistemas e nosso algoritmo de recomendação.
4. Caso venha a fazer stress test com a lib ou com os recursos que a mesma oferece, entre em contato com a Sizebay antes e compartilhe o scheduling desse stress test, para que possamos acompanhar as métricas do nosso lado.
