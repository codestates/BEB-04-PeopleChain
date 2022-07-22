import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DoubleModal from '../common/DoubleModal';
import DatePicker from '../common/DatePicker';
import RNPickerSelect from 'react-native-picker-select';

function FilterModal({
  setFilterPeopleSelect,
  filterPeopleSelect,
  FilterPeopleDropDownData,
  filterDate,
  setFilterDate,
  filterModalVisible,
  setFilterModalVisible,
}) {
  return (
    <DoubleModal
      text="필터 설정"
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
          </View>
          <View style={styles.filterElement}>
            <Text style={styles.filterText}>날짜</Text>
            <DatePicker
              value={filterDate}
              onChange={(event, date) => {
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
  );
}

const styles = StyleSheet.create({
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
    fontSize: 16,
    marginHorizontal: 30,
  },
});

export default FilterModal;
