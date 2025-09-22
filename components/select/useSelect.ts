import { resolvePath } from '@/utils/resolve-path'
import {
  useState,
  type Dispatch,
  type FocusEvent,
  type SelectHTMLAttributes,
  type SetStateAction,
} from 'react'

export type ISelectState = {
  value: string
  error?: boolean
  message?: string
}

export type SelectOption = { value: string; label: string }

export function createSelectOptions<T>(
  data: T[],
  labelPath: string,
  valuePath: string,
): SelectOption[] {
  return data.map((item) => ({
    label: resolvePath(item, labelPath),
    value: resolvePath(item, valuePath),
  }))
}

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  options: SelectOption[]
  state: ISelectState
  placeholder: string
  setState: React.Dispatch<
    React.SetStateAction<{
      value: string
    }>
  >
  required?: boolean
  className?: string
}

export default function useSelect(
  state: ISelectState,
  required: boolean,
  setState: Dispatch<
    SetStateAction<{
      value: string
    }>
  >,
) {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState((prev: any) => ({
      ...prev,
      value: event.target.value,
      error: false,
      dirty: true,
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validateOnBlur = (_e: FocusEvent<HTMLSelectElement, Element>) => {
    if (state.value.length < 1 && required)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setState((prev: any) => ({
        ...prev,
        error: true,
        message: `Please select an option`,
      }))
    else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setState((prev: any) => ({
        ...prev,
        error: false,
        message: '',
      }))
    }
  }

  return { isOpen, setIsOpen, validateOnBlur, handleChange }
}
