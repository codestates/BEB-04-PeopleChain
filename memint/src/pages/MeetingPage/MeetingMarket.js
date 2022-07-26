import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MeetingElement from '../../components/meetingComponents/MeetingElement';
import WalletButton from '../../components/common/WalletButton';
import SingleModal from '../../components/common/SingleModal';
import {getMeetings} from '../../lib/Meeting';
import {useIsFocused} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import FilterModal from '../../components/meetingComponents/FilterModal';
import {getUser} from '../../lib/Users';
import {signOut} from '../../lib/Auth';
import useAuthActions from '../../utils/hooks/UseAuthActions';
import useUser from '../../utils/hooks/UseUser';

function MeetingMarket({navigation}) {
  const [meetings, setMeetings] = useState([]);
  const [regionMeetings, setRegionMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [regionSelect, setRegionSelect] = useState(0);
  const [sortSelect, setSortSelect] = useState(undefined);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filter, setFilter] = useState({
    peopleNum: undefined,
    meetDate: new Date(),
  });

  const user = useUser();
  console.log(user);

  const isFocused = useIsFocused();

  useEffect(() => {
    getMeetingMarket();
  }, [isFocused, getMeetingMarket]);

  const getMeetingMarket = useCallback(async () => {
    try {
      const res = await getMeetings();
      const data = res.docs.map(el => {
        return {
          ...el.data(),
          id: el.id,
          // meetDate: handleDate(el.data().meetDate),
        };
      });

      const dataWithHostInfo = await Promise.all(
        data.map(async el => {
          const hostInfo = await getUser(el.hostId);
          return {
            ...el,
            hostInfo: {...hostInfo},
          };
        }),
      );
      setMeetings(dataWithHostInfo);
      setRegionMeetings(dataWithHostInfo);
      setFilteredMeetings(dataWithHostInfo);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleFilter = () => {
    if (filter.peopleNum && filter.meetDate) {
      setFilteredMeetings(
        regionMeetings.filter(meeting => {
          return (
            meeting.peopleNum === filter.peopleNum &&
            meeting.meetDate.toDate() >= filter.meetDate
          );
        }),
      );
    } else if (filter.peopleNum) {
      setFilteredMeetings(
        regionMeetings.filter(meeting => {
          return meeting.peopleNum === filter.peopleNum;
        }),
      );
    } else if (filter.meetDate) {
      setFilteredMeetings(
        regionMeetings.filter(meeting => {
          return meeting.meetDate.toDate() >= filter.meetDate;
        }),
      );
    } else {
      getMeetingMarket();
    }
  };

  const handleRegion = value => {
    setFilter({peopleNum: undefined, meetDate: new Date()});
    setRegionMeetings(
      meetings.filter(meeting => {
        return meeting.region === value;
      }),
    );
    setFilteredMeetings(regionMeetings);
  };

  const RegionDropDownData = [
    {label: '서울 전체', value: '서울 전체'},
    {label: '강남구', value: '강남구'},
    {label: '강동구', value: '강동구'},
    {label: '강북구', value: '강북구'},
    {label: '강서구', value: '강서구'},
    {label: '관악구', value: '관악구'},
    {label: '광진구', value: '광진구'},
    {label: '구로구', value: '구로구'},
    {label: '금천구', value: '금천구'},
    {label: '노원구', value: '노원구'},
    {label: '도봉구', value: '도봉구'},
    {label: '동대문구', value: '동대문구'},
    {label: '동작구', value: '동작구'},
    {label: '마포구', value: '마포구'},
    {label: '서대문구', value: '서대문구'},
    {label: '서초구', value: '서초구'},
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
  const {logout} = useAuthActions();
  const handleSignOut = useCallback(async () => {
    try {
      logout();
      await signOut();
    } catch (e) {
      console.log(e);
    } finally {
      navigation.navigate('SignIn');
    }
  }, [navigation, logout]);
  return (
    <SafeAreaView style={styles.container}>
      <Button title="로그아웃 하기" color="red" onPress={handleSignOut} />
      <TouchableOpacity style={styles.areaEnd}>
        <RNPickerSelect
          placeholder={{}}
          onValueChange={value => {
            setRegionSelect(value);
            handleRegion(value);
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

      <View style={styles.listfilterArea}>
        <TouchableOpacity
          style={styles.listfilter}
          onPress={() => {
            setFilterModalVisible(true);
          }}>
          <Icon name="filter-alt" size={15} />
          <Text> 조건 설정</Text>
          <FilterModal
            setFilter={setFilter}
            FilterPeopleDropDownData={FilterPeopleDropDownData}
            filter={filter}
            filterModalVisible={filterModalVisible}
            setFilterModalVisible={setFilterModalVisible}
            handleFilter={handleFilter}
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
        {filteredMeetings.map((meeting, idx) => {
          return <MeetingElement key={idx} item={meeting} />;
        })}
      </ScrollView>
      <WalletButton />
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
