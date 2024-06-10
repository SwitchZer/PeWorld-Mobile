/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {IcA, IcMessage, IcSearch} from '../../assets/icons';

function TabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon = () => {
          if (label === 'home')
            return <IcA stroke={isFocused ? '#673ab7' : '#222'} />;
          if (label === 'profile')
            return <IcMessage stroke={isFocused ? '#673ab7' : '#222'} />;
          if (label === 'seting')
            return <IcSearch stroke={isFocused ? '#673ab7' : '#222'} />;
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            <Icon />
            <Text
              style={{
                color: isFocused ? '#673ab7' : '#222',
                textAlign: 'center',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
