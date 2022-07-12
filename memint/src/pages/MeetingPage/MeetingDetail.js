import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import BackButton from '../../components/BackButton';

function MeetingDetail({route}) {
  const {title, tags, host, location, people, age, date} = route.params;
  return (
    <SafeAreaView>
      <BackButton />
      <Text>MeetingDetail+ {title}</Text>
    </SafeAreaView>
  );
}

export default MeetingDetail;
