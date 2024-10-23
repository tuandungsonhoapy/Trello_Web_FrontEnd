export const boardId = '67132df2f05aebf2893b58ba'

let apiRoot = ''
if (import.meta.env.DEV) {
  apiRoot = 'http://localhost:8080/api/v1'
}
if (import.meta.env.PROD) {
  apiRoot = 'https://trello-web-backend-xjnq.onrender.com/api/v1'
}

export const API_ROOT = apiRoot
