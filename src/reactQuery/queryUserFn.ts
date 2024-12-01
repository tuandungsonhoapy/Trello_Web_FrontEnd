import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { userKeys } from './queryKeys'

import { fetchUsers, getUsers } from '@/apis/userAPI'
import { userPagination } from '@/utils/constants'
import { userInterface } from '@/interface/user-interface'

export interface useFetchUserProps {
  isKeepPreviousData?: boolean
  page?: number
  limit?: number
  searchPath?: string
}

export const useFetchUser = ({
  isKeepPreviousData = false,
  page = userPagination.pageDefault,
  limit = userPagination.limitDefault,
  searchPath = ''
}: useFetchUserProps) => {
  const queryInfo = useQuery({
    queryKey: searchPath
      ? userKeys.fetchUserWithFilters(searchPath)
      : userKeys.fetchUsersPagination(+page),
    queryFn: async (): Promise<{
      users: userInterface[]
      total: number
    }> => {
      if (searchPath) {
        return await getUsers(searchPath)
      }
      return await fetchUsers(page, limit)
    },
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    staleTime: 1000 * 60 * 5
  })

  return queryInfo
}
