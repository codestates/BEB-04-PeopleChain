import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MeetingElement from './MeetingElement';
import WalletButton from '../../components/WalletButton'

function MeetingMarket({navigation}) {
  const [locationCheck, setlocationCheck] = useState(false);

  const data = [
    {
      title: '금요일 밤 노실 분',
      host: 'username',
      tags: ['#부어라 마셔라', '#술게임 환영'],
      description:
        '술 한잔 하실 여성분들 분위기 잘 맞춰드려요 ㅎㅎ \n오늘 후회없게 재밌게 한잔해요',
      location: '강남',
      people: '2(남):0(여)',
      members: [
        {username: '대현동 불주먹', gender: '남', age: '30대 초반'},
        {username: '아현동 돌려차기', gender: '남', age: '30대 초반'},
      ],
      age: '30초',
      date: '7월 8일 (금) 오후 6시',
    },
    {
      title: '금요일 밤 노실 분',
      host: 'username',
      tags: ['#부어라 마셔라', '#술게임 환영'],
      description:
        '술 한잔 하실 여성분들 분위기 잘 맞춰드려요 ㅎㅎ \n오늘 후회없게 재밌게 한잔해요',
      location: '강남',
      people: '2(남):0(여)',
      members: [
        {username: '대현동 불주먹', gender: '남', age: '30대 초반'},
        {username: '아현동 돌려차기', gender: '남', age: '30대 초반'},
      ],
      age: '30초',
      date: '7월 8일 (금) 오후 6시',
    },
    {
      title: '금요일 밤 노실 분',
      host: 'username',
      tags: ['#부어라 마셔라', '#술게임 환영'],
      description:
        '술 한잔 하실 여성분들 분위기 잘 맞춰드려요 ㅎㅎ \n오늘 후회없게 재밌게 한잔해요',
      location: '강남',
      people: '2(남):0(여)',
      members: [
        {username: '대현동 불주먹', gender: '남', age: '30대 초반'},
        {username: '아현동 돌려차기', gender: '남', age: '30대 초반'},
      ],
      age: '30초',
      date: '7월 8일 (금) 오후 6시',
    },
    {
      title: '금요일 밤 노실 분',
      host: 'username',
      tags: ['#부어라 마셔라', '#술게임 환영'],
      description:
        '술 한잔 하실 여성분들 분위기 잘 맞춰드려요 ㅎㅎ \n오늘 후회없게 재밌게 한잔해요',
      location: '강남',
      people: '2(남):0(여)',
      members: [
        {username: '대현동 불주먹', gender: '남', age: '30대 초반'},
        {username: '아현동 돌려차기', gender: '남', age: '30대 초반'},
      ],
      age: '30초',
      date: '7월 8일 (금) 오후 6시',
    },
    {
      title: '금요일 밤 노실 분',
      host: 'username',
      tags: ['#부어라 마셔라', '#술게임 환영'],
      description:
        '술 한잔 하실 여성분들 분위기 잘 맞춰드려요 ㅎㅎ \n오늘 후회없게 재밌게 한잔해요',
      location: '강남',
      people: '2(남):0(여)',
      members: [
        {username: '대현동 불주먹', gender: '남', age: '30대 초반'},
        {username: '아현동 돌려차기', gender: '남', age: '30대 초반'},
      ],
      age: '30초',
      date: '7월 8일 (금) 오후 6시',
    },
    {
      title: '금요일 밤 노실 분',
      host: 'username',
      tags: ['#부어라 마셔라', '#술게임 환영'],
      description:
        '술 한잔 하실 여성분들 분위기 잘 맞춰드려요 ㅎㅎ \n오늘 후회없게 재밌게 한잔해요',
      location: '강남',
      people: '2(남):0(여)',
      members: [
        {username: '대현동 불주먹', gender: '남', age: '30대 초반'},
        {username: '아현동 돌려차기', gender: '남', age: '30대 초반'},
      ],
      age: '30초',
      date: '7월 8일 (금) 오후 6시',
    },
  ];
  const dropDownData = [
    {label: '인원', value: 'people'},
    {label: '날짜', value: 'date'},
    {label: '태그', value: 'tag'},
  ];
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.areaEnd}
        onPress={() => {
          setlocationCheck(!locationCheck);
        }}>
        <Text>서울 전체 </Text>
        {/*지역 선택 */}
        {locationCheck ? (
          <Icon name="check-circle" size={18} />
        ) : (
          <Icon name="radio-button-unchecked" size={18} />
        )}
      </TouchableOpacity>
      <View style={styles.titleArea}>
        <Text style={styles.title}>새로운 친구들과 술 한잔 어뗘?</Text>
      </View>
      <View style={styles.areaEnd}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('MeetingCreate')}>
          <Icon name="add-box" size={35} />
        </TouchableOpacity>
      </View>
      <View style={styles.listfilterArea}>
        <TouchableOpacity style={styles.listfilter}>
          <Icon name="filter-alt" size={15} />
          <Text> 조건 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listfilter}>
          <Text>정렬</Text>
          <Icon name="arrow-drop-down" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.meetingLists}>
        {data.map((meeting, idx) => {
          return (
            <MeetingElement
              key={idx}
              title={meeting.title}
              tags={meeting.tags}
              host={meeting.host}
              location={meeting.location}
              people={meeting.people}
              age={meeting.age}
              date={meeting.date}
              description={meeting.description}
              members={meeting.members}
            />
          );
        })}
      </ScrollView>
      <WalletButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  areaEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  createButton: {},
  titleArea: {
    width: 230,
    paddingLeft: 20,
    paddingTop: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  listfilterArea: {
    marginTop: 20,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listfilter: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MeetingMarket;
