export const boardId = '67132df2f05aebf2893b58ba'

let apiRoot = ''
if (import.meta.env.DEV) {
  apiRoot = 'http://localhost:8080/api/v1'
}
if (import.meta.env.PROD) {
  apiRoot = 'https://trello-web-backend-xjnq.onrender.com/api/v1'
}

export const API_ROOT = apiRoot

export const cssTextFieldCustomText = {
  '& label': { color: 'customText.primary' },
  '& input': { color: 'customText.primary' },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'customText.primary'
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': { borderColor: 'customText.primary' },
    '&:hover fieldset': { borderColor: 'customText.primary' }
  },
  '& label.Mui-focused': { color: 'customText.primary' }
}

export const cssTextFieldContrastText = {
  '& label': { color: 'constrastMode.main' },
  '& input': { color: 'constrastMode.main' },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'constrastMode.main'
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'constrastMode.main'
    },
    '&:hover fieldset': { borderColor: 'constrastMode.main' }
  },
  '& label.Mui-focused': { color: 'constrastMode.main' }
}

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT_PER_PAGE = 12

export const CARD_MEMBER_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}

export const userRoles = {
  ADMIN: 'admin',
  USER: 'user'
}

export const userPagination = {
  pageDefault: 1,
  limitDefault: 5
}
