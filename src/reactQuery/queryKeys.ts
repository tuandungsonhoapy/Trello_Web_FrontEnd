export const userKeys = {
  all: ['fetchUsers'],
  fetchUsersPagination: (page: number | undefined | null) => {
    if (page) {
      return [...userKeys.all, page]
    }

    return userKeys.all
  },
  fetchUserWithFilters: (filters: unknown) => [...userKeys.all, filters],
  fetchUser: (id: number) => ['fetchUser', id]
}

export const boardKeys = {
  all: ['fetchBoards'],
  fetchBoardsPagination: (page: number | undefined | null) => {
    if (page) {
      return [...boardKeys.all, page]
    }

    return boardKeys.all
  },
  fetchBoard: (id: number) => ['fetchBoard', id]
}
