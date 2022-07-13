import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MeetingElement from './MeetingElement';
import WalletButton from '../../components/WalletButton';
import RNPickerSelect from 'react-native-picker-select';
import DoubleModal from '../../components/DoubleModal';
import DatePicker from '../../components/DatePicker';

function MeetingMarket({navigation}) {
  const [locationCheck, setlocationCheck] = useState(false);
  const [regionSelect, setRegionSelect] = useState(0);
  const [sortSelect, setSortSelect] = useState(undefined);
  const [filterPeopleSelect, setFilterPeopleSelect] = useState(undefined);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date());
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
  const RegionDropDownData = [
    {label: '서울 전체', value: 0},
    {label: '강남구', value: 1},
    {label: '강동구', value: 2},
    {label: '강북구', value: 3},
    {label: '강서구', value: 4},
    {label: '관악구', value: 5},
    {label: '광진구', value: 6},
    {label: '구로구', value: 7},
    {label: '금천구', value: 8},
    {label: '노원구', value: 9},
    {label: '도봉구', value: 10},
    {label: '동대문구', value: 11},
    {label: '동작구', value: 12},
    {label: '마포구', value: 13},
    {label: '서대문구', value: 14},
    {label: '서초구', value: 15},
  ];
  const SortDropDownData = [
    {label: '정렬', value: 0},
    {label: '시간 가까운 순', value: 1},
    {label: '위치 가까운 순', value: 2},
    {label: '나이 젊은 순', value: 3},
  ];
  const FilterPeopleDropDownData = [
    {label: '1:1', value: 1},
    {label: '2:2', value: 2},
    {label: '3:3', value: 3},
  ];
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.areaEnd}
        onPress={() => {
          setlocationCheck(!locationCheck);
        }}>
        <RNPickerSelect
          placeholder={{}}
          onValueChange={value => {
            setRegionSelect(value);
          }}
          items={RegionDropDownData}
          value={regionSelect}
        />
        <Icon name="arrow-drop-down" size={19} />
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
        <TouchableOpacity
          style={styles.listfilter}
          onPress={() => {
            setFilterModalVisible(true);
          }}>
          <Icon name="filter-alt" size={15} />
          <Text> 조건 설정</Text>
          <DoubleModal
            body={
              <View style={styles.filterContent}>
                <View style={styles.filterElement}>
                  <Text style={styles.filterText}>인원</Text>
                  <RNPickerSelect
                    placeholder={{label: '선택'}}
                    onValueChange={value => {
                      setFilterPeopleSelect(value);
                    }}
                    items={FilterPeopleDropDownData}
                    value={filterPeopleSelect}
                  />
                </View>
                <View style={styles.filterElement}>
                  <Text style={styles.filterText}>날짜</Text>
                  <DatePicker
                    value={filterDate}
                    onChange={(event, date) => {
                      console.log(date);
                      setFilterDate(date);
                    }}
                  />
                </View>
                <View style={styles.filterElement}>
                  <Text style={styles.filterText}>태그</Text>
                </View>
              </View>
            }
            nButtonText="닫기"
            pButtonText="적용"
            modalVisible={filterModalVisible}
            setModalVisible={setFilterModalVisible}
            pFunction={() => {}}
            nFunction={() => {
              setFilterModalVisible(!filterModalVisible);
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listfilter}>
          <RNPickerSelect
            placeholder={{}}
            onValueChange={value => {
              setSortSelect(value);
            }}
            items={SortDropDownData}
            value={sortSelect}
          />
          <Icon name="arrow-drop-down" size={19} />
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
    alignContent: 'flex-start',
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
  filterContent: {
    marginBottom: 30,
    marginHorizontal: 10,
  },
  filterElement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontWeight: 'bold',
    marginHorizontal: 30,
  },
});

export default MeetingMarket;
