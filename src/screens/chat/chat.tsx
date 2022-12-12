import Screen from '../../components/screen';
import {
  FlatList,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FC, forwardRef, useEffect, useRef, useState} from 'react';
import {keys} from '../../constants/strings';
import {SearchCard} from './views/search-card';
import {useQuery} from '@tanstack/react-query';
import {getChatUsers, searchUsers} from '../../api/chat';
import Loader from '../../components/loader';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootProps} from '../../../App';
import Search from '../../assets/svg/search';
import CustomTextInput from '../../components/custom-text-input';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '../../components/custom-text';
import {useDebounce} from 'use-debounce';
import {ChatCard} from './views/chat-card';
import Close from '../../assets/svg/icon-close';

type Props = NativeStackScreenProps<RootProps>;

const initialValue = -60;

const arr123 = new Array(150).fill(null).map((_, index) => index + 1);
export const Chat: FC<Props> = ({navigation}) => {
  const {data, isLoading} = useQuery([keys.chatUsers], getChatUsers);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedValue] = useDebounce(searchValue, 500);
  const {data: searchData, isLoading: isSearchLoading} = useQuery(
    [keys.search, debouncedValue],
    () => searchUsers(debouncedValue),
  );
  const transformValue = useSharedValue(initialValue);
  const onPress = () => {
    const {value} = transformValue;
    //if we need to show search bar
    if (value === initialValue) {
      transformValue.value = withTiming(0, {
        easing: Easing.ease,
        duration: 150,
      });
      inputRef.current?.focus();
    } else {
      transformValue.value = withTiming(initialValue, {
        easing: Easing.ease,
        duration: 150,
      });
      setIsSearching(false);
      Keyboard.dismiss();
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPress}>
          {isSearching ? <Close /> : <Search />}
        </TouchableOpacity>
      ),
    });
  }, [isSearching]);
  const animStyles = useAnimatedStyle(() => ({
    transform: [{translateY: transformValue.value}],
  }));
  const animList = useAnimatedStyle(() => ({
    transform: [{translateY: transformValue.value}],
  }));
  const inputRef = useRef<TextInput>(null);
  if (isLoading) {
    return (
      <Loader
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
    );
  }
  return (
    <Screen>
      <Animated.View style={[{marginHorizontal: 24}, animStyles]}>
        <CustomTextInput
          label="Поиск по людям"
          ref={inputRef}
          props={{
            value: searchValue,
            onChangeText: text => setSearchValue(text),
            onFocus: () => setIsSearching(true),
          }}
        />
        {isSearchLoading && (
          <Loader
            size={'small'}
            style={{position: 'absolute', right: 10, top: 5, bottom: 0}}
          />
        )}
      </Animated.View>
      <Animated.View style={[animList]}>
        {isSearching ? (
          <FlatList
            data={searchData}
            renderItem={({item}) => (
              <SearchCard
                name={item.username}
                onPress={() =>
                  navigation.navigate('ProfileChat', {
                    id: item.username,
                  })
                }
              />
            )}
            keyExtractor={item => item.username}
            contentContainerStyle={{paddingHorizontal: 24, paddingBottom: 100}}
          />
        ) : (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <ChatCard
                user={item}
                onPress={() =>
                  navigation.navigate('ProfileChat', {
                    id: item.username,
                  })
                }
              />
            )}
            contentContainerStyle={{paddingHorizontal: 24}}
            keyExtractor={item => item.username}
          />
        )}
      </Animated.View>
    </Screen>
  );
};
