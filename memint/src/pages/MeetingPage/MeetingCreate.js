import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import BackButton from '../../components/common/BackButton';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useToast} from '../../utils/hooks/useToast';
import SingleModal from '../../components/common/SingleModal';
import TagElement from '../../components/meetingComponents/TagElement';
import DoubleModal from '../../components/common/DoubleModal';

function MeetingCreate({route}) {
  const [submittable, setSubmittable] = useState(false);
  const [meetingInfo, setMeetingInfo] = useState({
    title: '',
    description: '',
    date: new Date(),
    region: undefined,
    peopleNum: undefined,
    invitedFriends: [],
    tags: [],
  });
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const navigation = useNavigation();
  const {showToast} = useToast();
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
  const PeopleDropDownData = [
    {label: '1:1', value: 1},
    {label: '2:2', value: 2},
    {label: '3:3', value: 3},
    {label: '4:4', value: 4},
  ];
  const tagData = {
    mood: [
      '부어라 마셔라',
      '부어라 마셔라1',
      '부어라 마셔라2',
      '부어라 마셔라3',
    ],
    topic: ['연애', '연애1', '연애2', '연애2'],
    alcoholType: ['소주', '소주1', '소주2', '소주3'],
  };

  useEffect(() => {
    const {title, description, region, peopleNum} = meetingInfo;
    if (title && description && region && peopleNum) {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }

    handleInvitedFriends();
  }, [meetingInfo, route, handleInvitedFriends]);

  const handleInvitedFriends = useCallback(() => {
    if (route.params !== undefined) {
      if (route.params.friends === undefined) {
        return;
      }
      if (meetingInfo.invitedFriends.indexOf(route.params.friends) !== -1) {
        showToast('error', '이미 추가된 친구입니다');
        route.params.friends = undefined;
        return;
      }
      setMeetingInfo({
        ...meetingInfo,
        invitedFriends: [...meetingInfo.invitedFriends, route.params.friends],
      });
      route.params.friends = undefined;
    }
  }, [meetingInfo, route, showToast]);
  const handleSubmit = () => {
    if (!submittable) {
      showToast('error', '필수 항목들을 작성해주세요');
      return;
    } else {
      setConfirmModalVisible(true);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.headerBar}>
        <View style={styles.flexRow}>
          <BackButton />
          <Text style={styles.title}>미팅 글쓰기</Text>
        </View>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={submittable ? styles.title : styles.grayButton}>
            완료
          </Text>
        </TouchableOpacity>
      </View>
      <SingleModal
        text="미팅을 생성하시겠습니까?"
        buttonText="네"
        modalVisible={confirmModalVisible}
        setModalVisible={setConfirmModalVisible}
        pFunction={() => {
          setConfirmModalVisible(false);
          showToast('success', '미팅이 생성되었습니다');
          //새로 만들어진 미팅 세부 페이지로 이동
        }}
      />
      <View style={styles.createContainer}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="제목"
            onChangeText={text => {
              setMeetingInfo({...meetingInfo, title: text});
            }}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="설명"
            multiline={true}
            onChangeText={text => {
              setMeetingInfo({...meetingInfo, description: text});
            }}
          />
        </View>
        <View style={[styles.createElement, styles.flexRow]}>
          <Text style={styles.text}>날짜</Text>
          <RNDateTimePicker
            value={meetingInfo.date}
            mode="datetime"
            locale="ko"
            style={styles.datepicker}
            onChange={(event, date) =>
              setMeetingInfo({...meetingInfo, date: date})
            }
          />
        </View>
        <View style={[styles.createElement, styles.flexRow]}>
          <TouchableOpacity style={styles.selectButton}>
            <RNPickerSelect
              placeholder={{label: '지역'}}
              onValueChange={value => {
                setMeetingInfo({...meetingInfo, region: value});
              }}
              items={RegionDropDownData}
              value={meetingInfo.region}
              style={{
                inputIOS: {
                  fontSize: 16,
                  color: 'black',
                },
                placeholder: {
                  fontSize: 16,
                  color: 'gray',
                },
              }}
            />
            <Icon name="arrow-drop-down" size={19} color={'gray'} />
          </TouchableOpacity>
        </View>
        <View style={[styles.createElement, styles.flexRow]}>
          <TouchableOpacity style={[styles.selectButton, styles.rightMargin]}>
            <RNPickerSelect
              placeholder={{label: '인원'}}
              onValueChange={value => {
                setMeetingInfo({...meetingInfo, peopleNum: value});
              }}
              items={PeopleDropDownData}
              value={meetingInfo.peopleNum}
              style={{
                inputIOS: {
                  fontSize: 16,
                  color: 'black',
                },
                placeholder: {
                  fontSize: 16,
                  color: 'gray',
                },
              }}
            />
            <Icon name="arrow-drop-down" size={19} color={'gray'} />
          </TouchableOpacity>
          <ScrollView style={styles.invitedFriends} horizontal={true}>
            {meetingInfo.invitedFriends.map((el, idx) => (
              <View key={idx} style={styles.invitedFriend}>
                <Text>{el}</Text>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            onPress={() => {
              setInviteModalVisible(true);
            }}>
            <Text style={[styles.text, styles.leftMargin]}>친구 초대하기</Text>
          </TouchableOpacity>
        </View>
        <DoubleModal
          text="친구 초대 시 하트가 차감됩니다.    초대하시겠습니까?"
          nButtonText="아니요"
          pButtonText="네"
          modalVisible={inviteModalVisible}
          setModalVisible={setInviteModalVisible}
          pFunction={() => {
            setInviteModalVisible(!inviteModalVisible);
            navigation.navigate('InviteFriend');
          }}
          nFunction={() => {
            setInviteModalVisible(!inviteModalVisible);
          }}
        />
        <View style={styles.tagElement}>
          <Text style={[styles.text, styles.tagTitle]}>태그</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.tagCategory}>
              <Text style={styles.tagCategoryTitle}>분위기</Text>
              <ScrollView style={styles.tags} horizontal={true}>
                {tagData.mood.map((tag, idx) => (
                  <TagElement
                    key={idx}
                    tag={tag}
                    meetingInfo={meetingInfo}
                    setMeetingInfo={setMeetingInfo}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={styles.tagCategory}>
              <Text style={styles.tagCategoryTitle}>주제</Text>
              <ScrollView style={styles.tags} horizontal={true}>
                {tagData.topic.map((tag, idx) => (
                  <TagElement
                    key={idx}
                    tag={tag}
                    meetingInfo={meetingInfo}
                    setMeetingInfo={setMeetingInfo}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={styles.tagCategory}>
              <Text style={styles.tagCategoryTitle}>술</Text>
              <ScrollView style={styles.tags} horizontal={true}>
                {tagData.alcoholType.map((tag, idx) => (
                  <TagElement
                    key={idx}
                    tag={tag}
                    meetingInfo={meetingInfo}
                    setMeetingInfo={setMeetingInfo}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    alignItems: 'center',
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
  grayButton: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5,
    marginLeft: 10,
    color: 'gray',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createContainer: {
    backgroundColor: 'white',
  },
  createElement: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 60,
  },
  tagElement: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  datepicker: {
    width: 240,
  },
  textInput: {
    backgroundColor: 'white',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagTitle: {
    marginTop: 10,
  },
  tagsContainer: {
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
  },
  tagCategoryTitle: {
    marginTop: 5,
    marginBottom: 10,
    color: 'gray',
  },
  tagCategory: {
    marginVertical: 5,
  },
  invitedFriends: {
    flexDirection: 'row',
  },
  invitedFriend: {
    backgroundColor: 'gray',
    padding: 8,
    marginHorizontal: 8,
  },
  leftMargin: {
    marginLeft: 5,
  },
  rightMargin: {
    marginRight: 5,
  },
});

export default MeetingCreate;
