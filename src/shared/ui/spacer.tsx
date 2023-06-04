import { FC } from 'react'
import { View } from 'react-native'

interface Props {
  size: number
}

const Spacer: FC<Props> = ({ size }) => {
  return <View style={{ height: size }} />
}

export default Spacer
