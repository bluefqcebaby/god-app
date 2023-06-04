import { FC } from 'react'
import { Pressable } from 'react-native'
import { s } from './style'
import * as UI from '@shared/ui'

interface Props {
  name: string
  onPress: () => void
}

export const SearchList = () => {}

export const SearchCard: FC<Props> = ({ name, onPress }) => {
  return (
    <Pressable style={s.box} onPress={onPress}>
      <UI.Text>{name}</UI.Text>
    </Pressable>
  )
}
