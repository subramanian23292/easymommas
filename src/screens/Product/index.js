import { useCallback, useEffect, useRef, useReducer } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import  Animated, { scrollTo, useSharedValue, useAnimatedRef, runOnUI } from 'react-native-reanimated';
import AppHoc from '../../components/AppHoc';
import { styles } from './style';
import ImageSlider from './ImageSlider';
import Info from './Info';
import Description from './Description';
import CartButton from './CartButton';
import RelatedProducts from './RelatedProducts';
import Variation from './Variation';
import Reviews from './Reviews';
import Delivery from './Delivery';
import { selectProductById, productFetch, productCancel } from '../../store/product/productSlice';
import { cancelCart, addtoCart } from '../../store/cart/cartSlice';
import Loader from '../../components/Loader';
import SizeguideModal from './SizeguideModal';
import { signinAlertFn } from '../../store/component/componentSlice';
import CartLoader from '../../components/Loader/CartLoader';

function sortObjByKeys(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((sortedObj, key) => {
            sortedObj[key] = obj[key];
            return sortedObj;
        }, {});
}

function deepEqual(obj1, obj2) {
    if (obj1 === obj2) { return true; }

    if (typeof obj1 !== 'object' || obj1 === null ||
        typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) { return false; }

    for (const key of keys1) {
        if (!obj2.hasOwnProperty(key)) { return false; }
        if (!deepEqual(obj1[key], obj2[key])) { return false; }
    }

    return true;
}

function variantReducer(state, action) {
    switch (action.type) {
        case 'SET_ALL':
            return {
                ...state,
                options: action.payload.options,
                defaultop: action.payload.defaultop,
                variant: action.payload.variant,
                prodimages: action.payload.prodimages ?? state.prodimages,
            };
        default:
            return state;
    }
}

function Product() {
    const guidemodalRef = useRef();
    const route = useRoute();
    const productId = route.params.id;
    const dispatch = useDispatch();
    const cusId = useSelector((state)=> state.auth.cusId);
    const prodata = useSelector(selectProductById(productId));
    const prodLoading = useSelector(state => state.product.prodLoading);
    const scrollRef = useAnimatedRef();
    const reviewY = useSharedValue(0);
    const [state, dispatchVariant] = useReducer(variantReducer, {
        prodimages: [],
        variant: {},
        options: [],
        defaultop: {},
    });
    const { prodimages, variant, options, defaultop } = state;

    useFocusEffect(
        useCallback(() => {
            const controller = new AbortController();
            if (!prodata) {
                dispatch(productFetch({ product_id: productId, controller }));
            }
            return () => {
                dispatch(productCancel({ product_id: productId }));
                dispatch(cancelCart());
            };
        }, [dispatch, prodata, productId])
    );

    useEffect(() => {
        if (prodata) {
            dispatchVariant({
                type: 'SET_ALL',
                payload: {
                    prodimages: prodata?.images || [],
                    options: prodata?.variations || [],
                    defaultop: prodata?.def_combo ?? {},
                    variant: {
                        sp: prodata?.def_sp ?? 0,
                        mrp: prodata?.def_mrp ?? 0,
                        stock: prodata?.def_stock ?? 0,
                        sku: prodata?.def_sku ?? '',
                        comboid: prodata?.def_combo_id ?? 0,
                        comboname: prodata?.def_combo_name ?? '',
                    },
                },
            });
        }
    }, [prodata]);

    function updateoption(opid, opvalid, opname, opvalname, prodgal) {
        const nextState = {};
        const updatedOptions = options.map((option) => {
            if (option.op_id === opid) {
                const updatedValues = option.op_values.map((opvalue) => ({
                    ...opvalue,
                    selected: opvalue.op_val_id === opvalid,
                }));
                return { ...option, op_values: updatedValues };
            }
            return option;
        });
        if (!deepEqual(options, updatedOptions)) {
            nextState.options = updatedOptions;
            const updatedDefaultop = {
                ...defaultop,
                [opname]: opvalname,
            };
            let newvariant = {};
            if (Object.keys(updatedDefaultop).length !== 0) {
                nextState.defaultop = updatedDefaultop;
                const targetCombination = sortObjByKeys(updatedDefaultop);
                const combinations = prodata?.combinations ?? [];

                const selected = combinations.find((item) => {
                    const sortedCombObj = sortObjByKeys(item.combobj);
                    return deepEqual(targetCombination, sortedCombObj);
                });
                newvariant = selected
                ?   {
                        sp: selected.price ?? 0,
                        mrp: selected.mrp ?? 0,
                        stock: selected.stock ?? 0,
                        sku: selected.sku ?? '',
                        comboid: selected?.id ?? 0,
                        comboname: selected?.comboname ?? '',
                    }
                :   {
                        sp: undefined,
                        mrp: undefined,
                        stock: undefined,
                        sku: undefined,
                        comboid: undefined,
                        comboname: undefined,
                    };
            }
            nextState.variant = newvariant;

            if (prodgal?.length) {
                nextState.prodimages = prodgal;
            }
            dispatchVariant({ type: 'SET_ALL', payload: { ...state, ...nextState } });
        }
    }

    const cartAdd = () => {
        if (cusId === null) {
            dispatch(signinAlertFn(true));
        } else {
            const payload = {
                action: 'addtocart',
                cus_id: cusId,
                prod_id: prodata.prod_id,
                prod_type: prodata.prod_type,
                combo_id: variant.comboid,
                prod_name: prodata.prod_name,
                img: prodimages?.[0]?.imgpath ?? '',
                sp: variant.sp,
                combo_name: variant.comboname,
            };
            dispatch(addtoCart(payload));
        }
    };

    const handleScrollToReview = () => {
        runOnUI(() => {
          scrollTo(scrollRef, 0, reviewY.value, true);
        })();
    };

    const handleReviewLayout = useCallback((e) => {
        reviewY.value = e.nativeEvent.layout.y;
    }, [reviewY]);

    return (
        <>
        {prodata && (
        <>
        <Animated.ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollcontainer} bounces={false}>
            {Array.isArray(prodimages) && prodimages.length > 0 &&
            <>
            <ImageSlider images={prodimages} />
            <Info reviews={prodata?.reviews} variation={variant} prodname={prodata?.prod_name} sizeguide={prodata?.size_guide} guidemodalRef={guidemodalRef} scrollToReview={handleScrollToReview} />
            <Variation data={options} defaultobj={defaultop} updateoption={updateoption} />
            </>}
            <Delivery />
            <Description data={prodata?.prod_desc} />
            <Reviews reviews={prodata?.reviews} onLayout={handleReviewLayout} productId={productId} />
            <RelatedProducts data={prodata?.relatedprod} />
        </Animated.ScrollView>
        <SizeguideModal ref={guidemodalRef} data={prodata?.size_guide} />
        {Object.keys(variant).length > 0 && <CartButton stock={variant.stock} cartAdd={cartAdd} />}
        </>)}
        {prodLoading && <Loader bgcolor="#fff" />}
        <CartLoader />
        </>
    );
}

export default AppHoc(Product);
