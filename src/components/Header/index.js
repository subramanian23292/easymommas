import { memo } from 'react';
import { View } from 'react-native';
import Search from './Search';
import CartBag from './CartBag';
import { styles } from './style';

function Header() {

    return (
        <View style={styles.headerRightcontainer}>
            <Search />
            <CartBag />
        </View>
    );
}

export default memo(Header);
