import { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

function Status({ orderstate = [] }) {
    const [heights, setHeights] = useState({});

    const onTextLayout = (index, event) => {
        const height = event.nativeEvent.layout.height;
        setHeights(prev => ({ ...prev, [index]: height + 52 }));
    };

    return (
        <View style={styles.statuscontainer}>
            {orderstate.map((item, i) => (
                <View style={styles.statusrow} key={i}>
                    <View style={styles.indicatorcontainer}>
                        {i !== 0 && <View style={[styles.indicatorline, { height: (heights[i]) ?? 52 }]} />}
                        <View style={styles.dotround} />
                    </View>
                    <View style={styles.infocontainer}>
                        <Text style={styles.statuslabel}>{item.name}</Text>
                        <Text style={styles.statusinfo}>{item.date_added}</Text>
                        {item.comment && <Text style={styles.statusinfo} onLayout={(e) => onTextLayout(i + 1, e)}>{item.comment}</Text>}
                    </View>
                </View>
            ))}
        </View>
    );
}

export default Status;
