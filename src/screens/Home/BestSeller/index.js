import { memo } from 'react';
import { Text, View } from 'react-native';
import ProductCard from '../../../components/ProductCard';
import { styles } from './style';

function BestSeller({ title, data }) {
  return (
    <View style={styles.bestsellercontainer}>
      <Text style={styles.bestsellertitle}>{title}</Text>
      <View style={styles.divider}/>
      <View style={styles.productgrid}>
        {data?.map((item) =>(<ProductCard key={item.prod_id} data={item} />))}
      </View>
    </View>
  );
}

export default memo(BestSeller);
