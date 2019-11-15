# API
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Uma API para gerenciar horários de uma clínica.

### Instalação

Requer [Node.js](https://nodejs.org/) v12+ e [Typescript](https://www.typescriptlang.org/) v3+ para rodar.

Abra um terminal, na raiz do projeto, e instale as dependências. 
```sh
$ npm install 
```
### Para ambiente Dev
Abra uma segunda guia do terminal, na raiz do projeto, e execute:
```sh
$ npm run gulp-linux ou $ npm run gulp-win
```
Na primeira guia do terminal, na raiz do projeto, execute:
```sh
$ npm run dev ou  npm run dev-win
```

### Para ambiente Prod

```sh
$ npm run prod ou npm run prod-win
```
----
 >O Gulp realizará a transpilação do código .ts em .js, e alocará no diretório dist na raiz do projeto. Esse é o diretório para publicação.
 
 ----
 >No ambiente de DEV, o gulp ficará assistindo os arquivos .ts, logo a cada alteração em um arquivo .ts, dentro de 5 segundos, um novo arquivo .js será gerado ou atualizado.
 ----
 >No ambiente de PROD, o gulp gerará um única vez o diretório dist com a transpilação dos arquivos Typescript e acionará o node para levantar a aplicação apontando para o server na raiz do dist.
 ---
 # Estrutura de Dados
 >Por se tratar de um gerenciamento de dados em arquivo json, o mesmo deve conter uma estrutura inicial pré-determinada para realizar a sequence correta para adição e exclusão de registros:
```
/** /src/model/data/schedules.json **/
{
    sequence:0,
    schedules:[]
}
``` 
 
 ---
 # Postman - Testes
 ---
 Importar no Postman a collection Desafio-Cubos-Clinica.postman_collection.json que encontra-se dentro do diretório postman.
 >/postman/Desafio-Cubos-Clinica.postman_collection.json
 
 ---
 # Rotas da Aplicação
 #### Host: localhost:5000
 
## Criação de Horário de Atendimento  Semanal
|Request| POST|
|---|---| 
|Content-Type|application/json| 
|Rota|/schedule|

```
Example:
 {
            "employee":"Dr. Gustavo",
            "day":null,
            "weekly":true,
            "week_days": ["Terça-feira", "Quinta-feira"], 
            "daily":false,
            "intervals": [{ "start": "13:15", "end": "13:45" }, { "start": "14:00", "end": "14:30" }]
 }
```
|Response JSON| Status 200| 
|---|---|  

```
{
    "success": true,
    "error": null
}
```
|Response JSON| Status 400| 
|---|---|  

```
/** Se o horário conflitar com algum existente no mesmo dia da semana **/
{
    "success": false,
    "error": "schedule unavailable"
}
```
---
## Criação de Horário de Atendimento  Diário
|Request| POST|
|---|---| 
|Content-Type|application/json| 
|Rota|/schedule| 

```
Example:
  {
            "employee":"Dra. Chris",
            "day":null,
            "weekly":false,
            "week_days": [], 
            "daily":true,
            "intervals": [{ "start": "07:00", "end": "07:30" }, { "start": "07:30", "end": "08:00" }]
 	
 }
```
|Response JSON| Status 200| 
|---|---|  

```
{
    "success": true,
    "error": null
}

```
|Response JSON| Status 400| 
|---|---|  
```
/** Se o horário conflitar com algum existente diariamente **/
{
    "success": false,
    "error": "schedule unavailable"
}
```
---
## Criação de Horário de Atendimento por Data/Dia Específico
|Request| POST| 
|---|---| 
|Content-Type| application/json| 
|Rota| /schedule| 

```
Example:
 {
            "employee":"Dra. Silvana",
            "day":"2019-11-25",
            "weekly":false,
            "week_days": [], 
            "daily":false,
            "intervals": [{ "start": "08:10", "end": "08:30" }, { "start": "09:30", "end": "10:00" }]
 	
 }
```
|Response JSON| Status 200| 
|---|---|  

```
{
    "success": true,
    "error": null
}

```
|Response JSON| Status 400| 
|---|---|  
```
/** Se o horário conflitar com algum existente nesta data **/
{
    "success": false,
    "error": "schedule unavailable"
}
```
---
## Exclusão de um Horário pelo Id
|Request || 
|---| ---| 
|Content-Type|application/json| 
|DELETE: | /schedule/:id|
|PARAM| id: number|


|Response JSON |Status 200|  
|---|---|  
```
Example:
 {
    "success": true,
    "error": null
}
```
|Response JSON| Status 400| 
|---|---|  

```
{
    "success": false,
    "error": error message
}
```
---
## Requisição de Listagem de Todos os  Horários
| Request|GET| 
|---| ---| 
|Content-Type|application/json|
|Rota|schedules/all| 



|Response JSON| Status 200| 
|---|---|  

```
Example:
{ 
"success": true,
    "list": [
        {
            "id": 23,
            "employee": "Dr. Gustavo",
            "day": null,
            "weekly": true,
            "week_days": [
                "terça-feira",
                "quinta-feira"
            ],
            "daily": false,
            "intervals": [
                {
                    "start": "13:15",
                    "end": "13:45"
                },
                {
                    "start": "14:00",
                    "end": "14:30"
                }
            ]
        },
        .
        .
        .
      }   
```
|Response JSON| Status 200| 
|---|---|  
```
/** Não existem horários **/
{
    "success": true,
    "list": [],
    "error": null
}
```
|Response JSON| Status 400| 
|---|---|  
```
{
    "success": false,
    "list": [],
    "error": message error
}
```

---
## Listagem de Horários de uma Data Específica
| Request|GET| 
|---| ---| 
|Content-Type| application/json|
|Rota   |schedules/day/:day   |


|PARAM  |  day: string| 
|---| ---|  
|Format  |  YYY-MM-DD | 
|Example  | 2019-11-25 | 


|Response JSON| Status 200| 
|---|---|  
```
Example:
{ 
    "success": true,
    "list": [
        {
            "id": 27,
            "employee": "Dra. Silvana",
            "day": "2019-11-25",
            "weekly": false,
            "week_days": [],
            "daily": false,
            "intervals": [
                {
                    "start": "08:10",
                    "end": "08:30"
                },
                {
                    "start": "09:30",
                    "end": "10:00"
                }
            ]
        }
    ],
    "error": null
}   
```
|Response JSON| Status 200| 
|---|---|  
```
/** Não existem horários **/
{
    "success": true,
    "list": [],
    "error": null
}
```
|Response JSON| Status 400| 
|---|---|  
```
{
    "success": false,
    "list": [],
    "error": message error
}
```
---
## Listagem de Horários de um Intervalo de Datas
| Request|GET| 
|---| ---|
|Content-Type|application/json|
|Rota   |/schedules/dates/intervals   |

|HEADERS  | | 
|---| ---|  
|key | start: string| 
|key | end: string| 
|Format  |  YYY-MM-DD | 
|Example  |  |
|start | 2019-11-19  |
|end  | 2019-11-25 |

|Response JSON| Status 200| 
|---|---|  
```
Example:
{ 
    "success": true,
    "list": [
        {
            "id": 23,
            "employee": "Dr. Gustavo",
            "day": null,
            "weekly": true,
            "week_days": [
                "terça-feira",
                "quinta-feira"
            ],
            "daily": false,
            "intervals": [
                {
                    "start": "13:15",
                    "end": "13:45"
                },
                {
                    "start": "14:00",
                    "end": "14:30"
                }
            ]
        },
        {
            "id": 24,
            "employee": "Dr. Gustavo",
            "day": null,
            "weekly": true,
            "week_days": [
                "terça-feira",
                "quinta-feira"
            ],
            "daily": false,
            "intervals": [
                {
                    "start": "11:15",
                    "end": "11:45"
                }
            ]
        },
        {
            "id": 26,
            "employee": "Dra. Chris",
            "day": null,
            "weekly": false,
            "week_days": [],
            "daily": true,
            "intervals": [
                {
                    "start": "07:00",
                    "end": "07:30"
                },
                {
                    "start": "07:30",
                    "end": "08:00"
                }
            ]
        },
        {
            "id": 27,
            "employee": "Dra. Silvana",
            "day": "2019-11-25",
            "weekly": false,
            "week_days": [],
            "daily": false,
            "intervals": [
                {
                    "start": "08:10",
                    "end": "08:30"
                },
                {
                    "start": "09:30",
                    "end": "10:00"
                }
            ]
        }
    ],
    "error": null
}  
```
|Response JSON| Status 200| 
|---|---|  
```
/** Não existem horários **/
{
    "success": true,
    "list": [],
    "error": null
}
```
|Response JSON| Status 400| 
|---|---|  
```
{
    "success": false,
    "list": [],
    "error": message error
}
```
---



