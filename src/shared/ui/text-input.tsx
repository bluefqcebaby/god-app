import { forwardRef } from 'react'
import * as RN from 'react-native'
import Text from './text'
import { colors } from '@shared/consts/colors'
import Spacer from './spacer'

interface Props extends RN.TextInputProps {
  label?: string
  helperText?: string
  error?: boolean
}

const TextInput = forwardRef<RN.TextInput, Props>(
  ({ label = '', helperText = '', error = false, ...props }, ref) => {
    return (
      <>
        <Spacer size={5} />
        <RN.View>
          {label !== '' ? (
            <Text style={[s.label, error && s.errorLabel]} size={15} secondary>
              {label}
            </Text>
          ) : null}
          <RN.TextInput
            ref={ref}
            style={[s.input, error && s.errorInput]}
            {...props}
          />
          {helperText !== '' ? (
            <Text size={12} style={[s.helperText, error && s.helperTextError]}>
              {helperText}
            </Text>
          ) : null}
        </RN.View>
        <Spacer size={10} />
      </>
    )
  },
)

const s = RN.StyleSheet.create({
  container: {},
  input: {
    borderColor: colors.GRAY,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderWidth: 1,
    color: colors.WHITE,
    fontSize: 17,
    borderRadius: 8,
    width: '100%',
  },
  errorInput: {
    borderColor: colors.RED,
  },
  helperText: {
    height: 20,
    marginTop: 5,
    marginLeft: 10,
  },
  helperTextError: {
    color: colors.RED,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: colors.DARK_BACKGROUND,
    zIndex: 1,
    paddingHorizontal: 6,
  },
  errorLabel: {
    color: colors.RED,
  },
})

export default TextInput
