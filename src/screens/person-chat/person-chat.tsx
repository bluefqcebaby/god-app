// import type { NativeStackScreenProps } from '@react-navigation/native-stack'
// import * as UI from 'src/shared/ui'
// import { Observer, observer } from 'mobx-react-lite'
// import { FC, useContext, useEffect, useState } from 'react'
// import {
//   FlatList,
//   Keyboard,
//   Pressable,
//   StyleSheet,
//   TextInput,
//   View,
// } from 'react-native'
// import ArrowRight from '../../assets/svg/arrow-right'
// import Screen from '../../shared/ui/screen'
// import { colors } from '../../constants/styles'
// import { Message } from './views/message'
// import { ScrollView } from 'react-native-gesture-handler'
// import { useNavigation, useRoute } from '@react-navigation/native'

// export const PersonChat = observer(() => {
//   const chatStore = useChatStore()

//   const { messageField, setMessageField, sendNewMessage } = chatStore

//   const navigation = useNavigation()

//   const {
//     params: { id },
//   } = useRoute()

//   const sendMessage = () => {
//     sendNewMessage(id)
//   }

//   useEffect(() => {
//     navigation.setOptions({ title: id })
//   }, [])

//   // if (isLoading) {
//   //   return (
//   //     <Screen>
//   //       <Loader
//   //         style={{
//   //           position: 'absolute',
//   //           left: 0,
//   //           right: 0,
//   //           top: 0,
//   //           bottom: 0,
//   //         }}
//   //       />
//   //     </Screen>
//   //   )
//   // }
//   return (
//     <>
//       <Screen pressable onPress={() => Keyboard.dismiss()}>
//         <FlatList
//           inverted
//           contentContainerStyle={{
//             paddingBottom: 10,
//             paddingHorizontal: 12,
//             flexDirection: 'column-reverse',
//           }}
//           data={chatStore.messages.get(id)?.slice()}
//           renderItem={({ item }) => (
//             <Message
//               text={item.message}
//               isMyself={item.from !== id}
//               time={item.time}
//             />
//           )}
//           keyExtractor={item => item.id}
//         />
//       </Screen>

//       <View style={styles.bottomView}>
//         <TextInput
//           style={styles.input}
//           placeholder="Сообщение"
//           placeholderTextColor="gray"
//           multiline
//           value={messageField}
//           onChangeText={setMessageField}
//         />
//         {messageField.trim().length > 0 && (
//           <Pressable onPress={sendMessage} style={styles.sendButton}>
//             <ArrowRight />
//           </Pressable>
//         )}
//       </View>
//     </>
//   )
// })

// const styles = StyleSheet.create({
//   input: {
//     color: colors.WHITE,
//     fontSize: 17,
//     flex: 5,
//   },
//   bottomView: {
//     paddingHorizontal: 12,
//     backgroundColor: colors.ACCENT_DARK,
//     flexDirection: 'row',
//   },
//   sendButton: {
//     alignSelf: 'flex-end',
//     marginBottom: 8,
//   },
// })
