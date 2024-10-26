import { cardInterface, columnInterface } from '@/interface/board-interface'

export const capitalizeFirstLetter = (val: string) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceholderCard = (
  column: columnInterface
): cardInterface => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}

export const interceptorLoadingElements = (calling: boolean) => {
  // DOM lấy ra toàn bộ phần tử trên page hiện tại có className là 'interceptor-loading'
  const elements = document.querySelectorAll('.interceptor-loading')
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      console.log('calling')
      // Nếu đang trong thời gian chờ gọi API (calling === true) thì sẽ làm mờ phần tử và chặn click bằng css pointer-events
      ;(elements[i] as HTMLElement).style.opacity = '0.5'
      ;(elements[i] as HTMLElement).style.pointerEvents = 'none'
    } else {
      // Ngược lại thì trả về như ban đầu, không làm gì cả
      ;(elements[i] as HTMLElement).style.opacity = 'initial'
      ;(elements[i] as HTMLElement).style.pointerEvents = 'initial'
    }
  }
}
