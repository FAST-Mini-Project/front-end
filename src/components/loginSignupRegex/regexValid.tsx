import { useState, useEffect } from 'react'
import { Tooltip } from 'antd'
import { emailRegex, passwordRegex } from '@/utils/constants/regex'
import style from './regexValid.module.scss'

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onValidate: (isValid: boolean) => void
}

export const EmailInput = ({ value, onChange, onValidate }: InputProps) => {
  const [emailValidateText, setEmailValidateText] = useState('')
  const [emailFocused, setEmailFocused] = useState(false)

  useEffect(() => {
    const isValid = emailRegex.test(value)
    if (value === '') {
      setEmailValidateText('🙂이메일을 입력해주세요.')
    } else {
      setEmailValidateText(
        emailRegex.test(value) ? '✅올바른 이메일 형식입니다.' : '❌이메일 형식이 올바르지 않습니다.'
      )
    }
    if (onValidate) {
      onValidate(isValid)
    }
  }, [value])

  return (
    <Tooltip title={emailValidateText} open={emailFocused} placement="right">
      <input
        className={style.input}
        type="email"
        placeholder="이메일 입력"
        value={value}
        onChange={onChange}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        required
      />
    </Tooltip>
  )
}

export const PasswordInput = ({ value, onChange, onValidate }: InputProps) => {
  const [passwordValidateText, setPasswordValidateText] = useState('')
  const [passwordFocused, setPasswordFocused] = useState(false)

  useEffect(() => {
    const isValid = passwordRegex.test(value)
    if (value === '') {
      setPasswordValidateText('🙂비밀번호를 입력해주세요.')
    } else {
      setPasswordValidateText(
        passwordRegex.test(value) ? '✅올바른 비밀번호 형식입니다.' : '❌4자 이상의 비밀번호를 작성해주세요'
      )
    }
    if (onValidate) {
      onValidate(isValid)
    }
  }, [value])

  return (
    <Tooltip title={passwordValidateText} open={passwordFocused} placement="right">
      <input
        className={style.input}
        type="password"
        placeholder="비밀번호 입력"
        value={value}
        onChange={onChange}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        required
      />
    </Tooltip>
  )
}
