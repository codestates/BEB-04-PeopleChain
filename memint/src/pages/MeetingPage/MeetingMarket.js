import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MeetingElement from '../../components/meetingComponents/MeetingElement';
import WalletButton from '../../components/common/WalletButton';
import SingleModal from '../../components/common/SingleModal';
import {getMeetings} from '../../lib/Meeting';
import {useIsFocused} from '@react-navigation/native';
import {handleDate} from '../../utils/common/Functions';
import RNPickerSelect from 'react-native-picker-select';
import FilterModal from '../../components/meetingComponents/FilterModal';

function MeetingMarket({navigation}) {
  const [meetings, setMeetings] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [regionSelect, setRegionSelect] = useState(0);
  const [sortSelect, setSortSelect] = useState(undefined);
  const [filterPeopleSelect, setFilterPeopleSelect] = useState(undefined);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date());

  const isFocused = useIsFocused();

  useEffect(() => {
    getMeetingMarket();
  }, [isFocused]);

  const getMeetingMarket = async () => {
    const res = await getMeetings();
    const data = res.docs.map(el => {
      return {
        ...el.data(),
        id: el.id,
        meetDate: handleDate(el.data().meetDate),
      };
    });
    //hostNickname, hostAge 데이터 추가,
    //members 데이터 추가
    setMeetings(data);
  };

  const RegionDropDownData = [
    {label: '서울 전체', value: 1},
    {label: '강남구', value: 2},
    {label: '강동구', value: 3},
    {label: '강북구', value: 4},
    {label: '강서구', value: 5},
    {label: '관악구', value: 6},
    {label: '광진구', value: 7},
    {label: '구로구', value: 8},
    {label: '금천구', value: 9},
    {label: '노원구', value: 10},
    {label: '도봉구', value: 11},
    {label: '동대문구', value: 12},
    {label: '동작구', value: 13},
    {label: '마포구', value: 14},
    {label: '서대문구', value: 15},
    {label: '서초구', value: 16},
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
    {label: '4:4', value: 4},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.areaEnd}>
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
          onPress={() => {
            setConfirmModalVisible(true);
          }}>
          <Icon name="add-box" size={35} />
        </TouchableOpacity>
      </View>
      <SingleModal
        text="미팅을 생성하시겠습니까?"
        //body={<Text>정말로?</Text>}
        buttonText="네"
        modalVisible={confirmModalVisible}
        setModalVisible={setConfirmModalVisible}
        pFunction={() => {
          setConfirmModalVisible(!confirmModalVisible);
          navigation.navigate('MeetingCreate');
        }}
      />
      <View style={styles.listfilterArea}>
        <TouchableOpacity
          style={styles.listfilter}
          onPress={() => {
            setFilterModalVisible(true);
          }}>
          <Icon name="filter-alt" size={15} />
          <Text> 조건 설정</Text>
          <FilterModal
            setFilterPeopleSelect={setFilterPeopleSelect}
            FilterPeopleDropDownData={FilterPeopleDropDownData}
            filterPeopleSelect={filterPeopleSelect}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            filterModalVisible={filterModalVisible}
            setFilterModalVisible={setFilterModalVisible}
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
        {meetings.map((meeting, idx) => {
          return (
            <MeetingElement
              key={idx}
              id={meeting.id}
              title={meeting.title}
              meetingTags={meeting.meetingTags}
              hostId={meeting.hostId}
              region={meeting.region}
              peopleNum={meeting.peopleNum}
              meetDate={meeting.meetDate}
              description={meeting.description}
              members={meeting.members}
              waiting={meeting.waiting}
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
});

export default MeetingMarket;
