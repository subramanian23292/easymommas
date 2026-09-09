import { useSelector } from 'react-redux';
import Loader from '.';

function CouponLoader() {
    const couponLoading = useSelector((state) => state.checkout.couponLoading);

    return (
        couponLoading && <Loader bgcolor={'rgba(255, 255, 255, 0.5)'} />
    );
}

export default CouponLoader;
