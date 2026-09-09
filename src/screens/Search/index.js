import { useCallback, useRef } from 'react';
import { View, Text, TextInput, useWindowDimensions, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { AppIcon } from '../../img/AppIcon';
import AppHoc from '../../components/AppHoc';
import Loader from '../../components/Loader';
import { styles } from './style';
import { debounce} from '../../components/debounce';
import { searchFetch, searchCancel } from '../../store/search/searchSlice';

const Search = () => {
	const inputRef = useRef();
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { width } = useWindowDimensions();
	const searchLoading = useSelector((state) => state.search.searchLoading);
	const prodlist = useSelector((state) => state.search.product);

	useFocusEffect(
		useCallback(() => {
			const id = requestIdleCallback(() => {
				inputRef.current?.focus();
			});
			return () => cancelIdleCallback(id);
		}, [inputRef])
	);

	useFocusEffect(
		useCallback(() => {
			return () => {
				dispatch(searchCancel());
			};
		}, [dispatch])
	);
	
	function handleback() {
		navigation.goBack();
	}

	function navigproduct(title, id) {
        navigation.push('Product', { id, title });
    }

	const renderSeparator = () => <View style={styles.itemseparator} />;

	const renderProduct = ({ item }) => {
		return (
			<Pressable style={styles.prodcard} onPress={() => navigproduct(item.prod_name, item.prod_id)}>
				<FastImage source={{ uri: item.img }} resizeMode="cover" style={styles.prodimg} />
				<Text numberOfLines={2} ellipsizeMode="tail" style={styles.prodlabel}>{item.prod_name}</Text>
			</Pressable>
		);
	};

	const searchprod = (text) => {
        dispatch(searchFetch({ search: text }));
    }

	const onchange = debounce(searchprod, 500);

	return (
		<View style={styles.pagecontainer}>		
			<View style={styles.header}>
				<Pressable style={styles.backbtn} onPress={handleback}>
					<AppIcon.BackDark width={24} height={24} />
				</Pressable>
				<TextInput
					style={[styles.searchinp, {width: width - 86}]}
					placeholderTextColor="#dddddd"
					placeholder="Search..."
					ref={inputRef}
					onChangeText={onchange}
				/>
			</View>
			<View style={styles.pagecontainer}>
				{searchLoading ?
					<Loader bgcolor="#fff" />
				:
				<FlashList
					contentContainerStyle={styles.listcontainer}
					data={prodlist ?? []}
					renderItem={renderProduct}
					keyExtractor={(item) => item.prod_id.toString()}
					showsVerticalScrollIndicator={false}
					bounces={false}
					ItemSeparatorComponent={renderSeparator}
				/>
				}
			</View>
		</View>
		
	);
};

export default AppHoc(Search);
