/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { debounce } from 'lodash'
/**
 * Custom một cái hook để dùng cho việc debounce function, nhận vào 2 tham số là function và thời gian delay
 * Bài viết tham khảo tại đây:
 * https://trippingoncode.com/react-debounce-hook/
 * https://lodash.com/docs/4.17.15#debounce
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = (fnToDebounce: any, delay = 500) => {
  // Trả lỗi luôn nếu delay nhận vào không phải number
  if (isNaN(delay)) {
    throw new Error('Delay value should be a number.')
  }
  // Return if fnToDebounce is not a function
  if (!fnToDebounce || typeof fnToDebounce !== 'function') {
    throw new Error('Debounce must have a function')
  }

  return useCallback(debounce(fnToDebounce, delay), [fnToDebounce, delay])
}
