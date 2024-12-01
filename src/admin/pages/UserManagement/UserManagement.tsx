import React from 'react'
import { Button, Space, Table, Tag, Typography } from 'antd'
import type { TableProps } from 'antd'
import { useFetchUser } from '@/reactQuery/queryUserFn'
import { userInterface } from '@/interface/user-interface'
import LoadingSpinner from '@/components/Loading/LoadingSpinner'
import { userPagination, userRoles } from '@/utils/constants'
import { Avatar, Box } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { activateUserAPI, deactivateUserAPI } from '@/apis/userAPI'
import { userKeys } from '@/reactQuery/queryKeys'
import { toast } from 'react-toastify'
import AutoCompleteSerachUser from '@/admin/pages/UserManagement/AutoComplete/AutoComplete'

const UserManagement: React.FC = () => {
  const [searchParams] = useSearchParams()
  const { page, limit } = Object.fromEntries(searchParams)

  const { isPending, error, data } = useFetchUser({
    isKeepPreviousData: true,
    page: page ? +page : userPagination.pageDefault,
    limit: limit ? +limit : userPagination.limitDefault
  })

  const queryClient = useQueryClient()

  const mutationDeactivate = useMutation({
    mutationFn: (userId: string) => {
      return deactivateUserAPI(userId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.fetchUsersPagination(+page)
      })
      toast.success('Deactivate user successfully')
    }
  })

  const mutationActivate = useMutation({
    mutationFn: (userId: string) => {
      return activateUserAPI(userId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.fetchUsersPagination(+page)
      })
      toast.success('Activate user successfully')
    }
  })

  const navigate = useNavigate()

  const users =
    data?.users.map((item, index) => ({ ...item, key: index + 1 })) || []

  if (isPending) return <LoadingSpinner />

  if (error) return <div>An error has occurred: {error.message}</div>

  const columns: TableProps<userInterface>['columns'] = [
    // {
    //   title: 'STT',
    //   dataIndex: 'key',
    //   key: 'key'
    // },
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
      render: (text, { avatar }) => (
        <Box
          sx={{
            display: 'flex',
            gap: 1.4,
            alignItems: 'center'
          }}
        >
          <Avatar
            sx={{ width: 34, height: 34 }}
            alt={text}
            src={avatar || ''}
          />
          {text}
        </Box>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: (_, { role }) => (
        <>
          <Tag color={role === userRoles.ADMIN ? 'green' : 'blue'} key={role}>
            {role.toUpperCase()}
          </Tag>
        </>
      )
    },
    {
      title: 'Status',
      key: 'isActive',
      dataIndex: 'isActive',
      render: (_, { isActive }) => (
        <>
          <Tag color={isActive ? 'green' : 'red'}>
            {isActive ? 'Active' : 'Inactive'}
          </Tag>
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { isActive, _id }) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          {isActive ? (
            <Button onClick={() => mutationDeactivate.mutate(_id)} danger>
              Deactivate
            </Button>
          ) : (
            <Button
              onClick={() => mutationActivate.mutate(_id)}
              style={{ color: 'green', borderColor: 'green' }}
            >
              Activate
            </Button>
          )}
          <Button>Details</Button>
        </Space>
      )
    }
  ]

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '20px'
        }}
      >
        <Typography.Title
          style={{
            marginLeft: '20px'
          }}
          level={2}
        >
          User Management
        </Typography.Title>
        <AutoCompleteSerachUser />
      </Box>
      <Table<userInterface>
        pagination={{
          pageSize: userPagination.limitDefault,
          total: data?.total || 0,
          showQuickJumper: true,
          onChange: (page, pageSize) => {
            navigate(`/admin/users?page=${page}&limit=${pageSize}`)
          }
        }}
        columns={columns}
        dataSource={users}
      />
    </>
  )
}

export default UserManagement
