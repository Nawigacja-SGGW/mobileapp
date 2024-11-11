import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet, View, Image } from 'react-native';

const logoSize = 70;

export const Logo: React.FC<TouchableOpacityProps> = forwardRef<TouchableOpacity, TouchableOpacityProps>(({...touchableProps }, ref) => {
  return (
    <View style={styles.logo}>
        <View style={[styles.box, styles.leftBox]}>
        <View style={styles.circle}>
            <Text>Logo</Text>
        </View>
        </View>

        <View style={[styles.box, styles.rightBox]}>
        <View  style={[styles.circle,{backgroundColor: '#fff'}]}>
            <Image source={require("./../../assets/logoSGGW.png")} alt="Hide icon" style={styles.image} resizeMode="contain"/>
        </View>
        </View>
    </View>
  );
}
);

const styles = StyleSheet.create({
    logo: {
        flexDirection: 'row',
      },
      box: {
        flex: 1,
        justifyContent: 'center',
      },
      leftBox: {
        alignItems: 'flex-end',
        paddingRight: 35,
        borderRightWidth: 1,
        borderColor: '#000',
      },
      rightBox: {
        alignItems: 'flex-start',
        paddingLeft: 35,
      },
      circle:{
        height : logoSize,
        width : logoSize,
        borderRadius: logoSize,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#cccccc',
      },
      image:{
        width: '100%',
        height: logoSize,
      },
});