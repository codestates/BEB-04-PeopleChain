import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../../components/common/BackButton';

function InviteFriend() {
  const [searchNickName, setSearchNickName] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const navigation = useNavigation();
  const handleSubmit = () => {
    //return 시 검색 결과를 받아옴
    setSearchResult(['아현동 돌려차기', '아현동 불주먹', '토마토스위스기러기']);
  };

  return (
    <SafeAreaView>
      <View style={styles.headerBar}>
        <BackButton />
        <Text style={styles.title}>친구 초대하기</Text>
      </View>
      <View>
        <View style={styles.searchBar}>
          <Icon name="search" size={26} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="닉네임 검색"
            onChangeText={setSearchNickName}
            multiline={true}
            blurOnSubmit={true}
            onSubmitEditing={handleSubmit}
          />
        </View>
        <View>
          {searchResult.map((el, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.userElement}
              onPress={() => {
                navigation.navigate('MeetingCreate', {friends: el});
              }}>
              <Image
                source={require('../ChattingPage/dummydata/images/26.png')}
                style={styles.userImage}
              />
              <Text style={styles.username}>{el}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5,
    marginLeft: 10,
  },
  searchBar: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: 60,
  },
  textInput: {
    margin: 5,
  },
  icon: {
    margin: 5,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  userElement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  username: {
    fontSize: 16,
    paddingLeft: 15,
  },
});
export default InviteFriend;
