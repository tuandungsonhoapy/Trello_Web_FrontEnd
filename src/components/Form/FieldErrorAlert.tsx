import Alert from '@mui/material/Alert'
import { FieldErrors } from 'react-hook-form'

// Component này có nhiệm vụ trả về một Alert Message cho field chỉ định (nếu có).
function FieldErrorAlert({
  errors,
  fieldName
}: {
  errors: FieldErrors | undefined
  fieldName: string
}) {
  if (!errors || !errors[fieldName]) return null
  return (
    <Alert
      severity="error"
      sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}
    >
      {typeof errors[fieldName]?.message === 'string'
        ? errors[fieldName]?.message
        : null}
    </Alert>
  )
}

export default FieldErrorAlert
