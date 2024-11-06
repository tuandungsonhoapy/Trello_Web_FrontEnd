import VisuallyHiddenInput from '@/components/Form/VisuallyHiddenInput'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MailIcon from '@mui/icons-material/Mail'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import FieldErrorAlert from '@/components/Form/FieldErrorAlert'
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { singleFileValidator } from '@/utils/validationFile'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { updateUserAPI } from '@/redux/authSlice'

const schema = z
  .object({
    displayName: z.string().min(3).max(100).trim()
  })
  .strict()

type schemaType = z.infer<typeof schema>

function AccountTab() {
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  const dispatch = useAppDispatch()

  const initialGeneralForm = {
    displayName: currentUser?.displayName
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: initialGeneralForm
  })

  const submitChangeGeneralInformation = (data: schemaType) => {
    const { displayName } = data

    // * Nếu không có sự thay đổi gì về displayname thì không làm gì cả
    if (displayName === currentUser?.displayName) return

    // * Call API
    dispatch(updateUserAPI({ displayName }))
      .unwrap()
      .then(() => toast.success('Update successfully'))
  }

  const uploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) {
      toast.error('No file selected')
      return
    }
    // console.log('e.target?.files[0]: ', e.target?.files[0])
    const error = singleFileValidator(e.target.files[0])
    if (error) {
      toast.error(error)
      return
    }

    const formData = new FormData()
    formData.append('avatar', e.target?.files[0])
    // Cách để log được dữ liệu thông qua FormData
    // console.log('formData: ', formData)
    // for (const value of formData.values()) {
    //   console.log('formData Value: ', value)
    // }

    // * Call API
    toast
      .promise(dispatch(updateUserAPI(formData)).unwrap(), {
        pending: 'Uploading avatar...',
        success: 'Upload avatar successfully!',
        error: 'Update failed!'
      })
      .then(() => {
        e.target.value = ''
      })
      .catch(() => (e.target.value = ''))
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Avatar
              sx={{ width: 84, height: 84, mb: 1 }}
              alt="TrungQuanDev"
              src={currentUser?.avatar || ''}
            />
            <Tooltip title="Upload a new image to update your avatar immediately.">
              <Button
                component="label"
                variant="contained"
                size="small"
                sx={{ bgcolor: 'constrastMode.main' }}
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant="h6">{currentUser?.displayName}</Typography>
            <Typography sx={{ color: 'grey' }}>
              @{currentUser?.username}
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
          <Box
            sx={{
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.email}
                fullWidth
                label="Your Email"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.username}
                fullWidth
                label="Your Username"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Your Display Name"
                type="text"
                sx={{ '& input': { color: 'constrastMode.main' } }}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
                {...register('displayName')}
                error={!!errors['displayName']}
              />
              <FieldErrorAlert errors={errors} fieldName={'displayName'} />
            </Box>

            <Box>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="primary"
                sx={{ bgcolor: 'constrastMode.main' }}
                fullWidth
              >
                Update
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default AccountTab
