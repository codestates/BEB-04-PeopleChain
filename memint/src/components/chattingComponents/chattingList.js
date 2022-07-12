import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';

function ChattingList({chattings}) {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={chattings}
      renderItem={({item}) => (
        <TouchableOpacity>
          <View style={styles.item}>
            <Text>{item.text}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});

export default ChattingList;
