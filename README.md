# My API Gateway

Depois de ler o artigo [System Design - API Gateways](https://fidelissauro.dev/api-gateway/), fiquei curioso para saber como seria implementar um com Node.js

>Ótimo artigo, recomendo a leitura, leia e compartilhe :D 

Você deve estar se perguntando por que usar o Node.js. Meu intuito é aprender na prática, e a melhor maneira de fazer isso é com a tecnologia que eu mais conheço.

Encontrei essa implementação no artigo [Build a custom api gateway with node js](https://www.freecodecamp.org/news/build-a-custom-api-gateway-with-node-js/).

> Lembre-se, depois de entender para que serve um API Gateway, meu objetivo era implementar um e ver o funcionamento básico, não me julgue por usar o código do mano, abraço 😁!

# Diagrama

[![](https://mermaid.ink/img/pako:eNpVkEFrwzAMhf-K0Lllh20XHwZts5XBYGVlp7gHYatNWBIXxV4ppf99iinF08n-9N6T0AVd8IwG9104uYYkwseXHQAW9WLzDmuKfKLzDubzF1jW8JBGlnGXBZmtlAXx_2Gl8CjBJxcnPDWWufFab1l-W8fwPeUY6IKjrgljNI9aRfoq69_u-s88ozQ8aZWjq-xY3x2b2wKl51mr3Axn2LP01Hq9wGVKsRgb7tmi0acn-bFoh6vqKMWwPQ8OTZTEM5SQDg2aPXWj_tLR66Wqlg5C_Y1e_wCprXHz?type=png)](https://mermaid.live/edit#pako:eNpVkEFrwzAMhf-K0Lllh20XHwZts5XBYGVlp7gHYatNWBIXxV4ppf99iinF08n-9N6T0AVd8IwG9104uYYkwseXHQAW9WLzDmuKfKLzDubzF1jW8JBGlnGXBZmtlAXx_2Gl8CjBJxcnPDWWufFab1l-W8fwPeUY6IKjrgljNI9aRfoq69_u-s88ozQ8aZWjq-xY3x2b2wKl51mr3Axn2LP01Hq9wGVKsRgb7tmi0acn-bFoh6vqKMWwPQ8OTZTEM5SQDg2aPXWj_tLR66Wqlg5C_Y1e_wCprXHz)


# Tecnologias

- Express
- Cors
- Helmet
- Morgan
- json-server (simular apis)

> Para testa não precisa das libs Cors e Helmet :D
> Morgan pelo que eu entendi é um middleware de logger :D 

# Rápida explicação 

- `services`: é onde informo os serviços que o gateway vai intermediar 
- `rateLimit`: quantidade máxima de requisições que pode ser feito no `interval` (intervalo) de tempo.
- `rateLimitAndTimeout`: é um middleware que verifica se o `ip` excedeu o numero máximo de requisições configurada em `rateLimit`.

# Como testar

```bash
git clone
npm install
npm run dev
```

```bash
# api fake roda na porta 3333
# abra outro terminal e:
npm run api1
```

```bash
# api fake roda na porta 4444
# abra outro terminal e:
npm run api2
```

```bash
# api fake roda na porta 5555
# abra outro terminal e:
npm run api3
```

# Rotas

Use a ferramenta da sua escolha para fazer as requisições

- ``http://localhost:5000/users``
- ``http://localhost:5000/orders``
- ``http://localhost:5000/products``

:D