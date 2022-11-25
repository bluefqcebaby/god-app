import {ComponentRef, FC, forwardRef} from 'react';
import {
  KeyboardAvoidingView,
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import CustomText from './custom-text';
import {colors} from '../constants/styles';

//label: string

interface Props {
  label?: string;
  props?: TextInputProps;
  style?: ViewStyle;
}

const CustomTextInput = forwardRef<TextInput, Props>(
  ({label, props, style}, ref) => {
    return (
      <View style={{marginTop: 5}}>
        {label && (
          <CustomText
            style={{
              position: 'absolute',
              top: -10,
              left: 15,
              backgroundColor: colors.DARK_BACKGROUND,
              zIndex: 1,
              paddingHorizontal: 6,
            }}
            size={15}
            secondary>
            {label}
          </CustomText>
        )}
        <TextInput
          {...props}
          ref={ref}
          style={{
            borderColor: colors.GRAY,
            paddingHorizontal: 24,
            paddingVertical: 10,
            borderWidth: 1,
            color: colors.WHITE,
            fontSize: 17,
            borderRadius: 8,
            width: '100%',
            ...style,
          }}
        />
      </View>
    );
  },
);

export default CustomTextInput;
