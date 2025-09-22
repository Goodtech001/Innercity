import useSelect, { type ISelectProps } from './useSelect'

export default function Select({
  name,
  options,
  required = false,
  state,
  placeholder = 'Select an option',
  className,
  setState,
  ...rest
}: ISelectProps) {
  const { handleChange, validateOnBlur } = useSelect(state, required, setState)

  return (
    <div className="relative flex w-full flex-col gap-1">
      {/* //* SELECT */}
      <select
        name={name}
        id={name}
        className={`input ${state.error ? 'border-red-600' : 'border-dark/20'} ${className}`}
        value={state.value}
        onChange={handleChange}
        onBlur={(e) => validateOnBlur(e)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        onFocus={(_e) => setState((prev: any) => ({ ...prev, dirty: true }))}
        required={required}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option className="bg-light-300 text-dark" key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* //* ERROR MESSAGE */}
      <p className="text-sm text-error">{state.message}</p>
    </div>
  )
}
