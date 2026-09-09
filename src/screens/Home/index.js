import { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AppHoc from '../../components/AppHoc';
import SearchBar from '../../components/SearchBar';
import BottomTab from '../../components/BottomTab';
import Loader from '../../components/Loader';
import Slider from './Slider';
import BestSeller from './BestSeller';
import Category from './Category';
import { styles } from './style';
import { initHome, cancelHome, newarrivals, bestsellers, banners, catlist } from '../../store/home/homeSlice';
import { productscart, cancelCart } from '../../store/cart/cartSlice';
import CartLoader from '../../components/Loader/CartLoader';

function Home() {
  const dispatch = useDispatch();
  const cusId = useSelector(state => state.auth.cusId);
  const homeLoading = useSelector((state) => state.home.homeLoading);
  const newarrival = useSelector(newarrivals);
  const bestseller = useSelector(bestsellers);
  const banner = useSelector(banners);
  const cartproduct = useSelector(productscart);
  const categories = useSelector(catlist);
  
  useFocusEffect(
    useCallback(() => {
      if (newarrival.length === 0) {
        const cusid = cartproduct.length === 0 ? cusId : '';
        dispatch(initHome({ cus_id: cusid }));
      }
      return () => {
        dispatch(cancelHome());
        dispatch(cancelCart());
      };
    }, [newarrival.length, cartproduct.length, cusId, dispatch])
  );

  return (
    homeLoading ?
      <Loader />
    : (
      <>
      <SearchBar />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollcontainer} bounces={false}>
        {Array.isArray(banner) && banner.length > 0 && <Slider data={banner} />}
        <Category data={categories} />
        <BestSeller title="Best Seller" data={bestseller} />
        <BestSeller title="New Arrivals" data={newarrival} />
      </ScrollView>
      <BottomTab page="Home" />
      <CartLoader />
      </>
    )
  );
}

export default AppHoc(Home);
