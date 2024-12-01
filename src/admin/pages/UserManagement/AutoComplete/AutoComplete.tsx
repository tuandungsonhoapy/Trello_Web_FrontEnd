import React, { useEffect, useState } from 'react'
import { AutoComplete, Typography } from 'antd'
import type { AutoCompleteProps } from 'antd'
import useDebounceValue from '@/hooks/useDebounceValue'
import { userInterface } from '@/interface/user-interface'
import { Avatar, Box } from '@mui/material'
import { useFetchUser } from '@/reactQuery/queryUserFn'
import { createSearchParams } from 'react-router-dom'

const handleCreateOptions = (users: userInterface[]) => {
  return users.map((user) => ({
    value: user._id,
    label: (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Avatar
          sx={{ width: 32, height: 32 }}
          alt={user.displayName}
          src={user.avatar || ''}
        />
        <Typography.Text>{user.displayName}</Typography.Text>
      </Box>
    )
  }))
}

const AutoCompleteSerachUser: React.FC = () => {
  const [value, setValue] = useState('')
  const debounceValue = useDebounceValue(value, 1000)

  const [options, setOptions] = useState<AutoCompleteProps['options']>([])

  const { data } = useFetchUser({
    isKeepPreviousData: true,
    searchPath: `?${createSearchParams({ 'q[displayName]': debounceValue })}`
  })

  const onSelect = (data: string) => {
    console.log('onSelect', data)
  }

  const onChange = (data: string) => {
    setValue(data)
  }

  useEffect(() => {
    if (data) {
      setOptions(handleCreateOptions(data.users))
    }
  }, [data])

  return (
    <AutoComplete
      value={value}
      options={options}
      style={{ width: 220 }}
      onSelect={onSelect}
      onChange={onChange}
      placeholder="search user"
    />
  )
}

export default AutoCompleteSerachUser
