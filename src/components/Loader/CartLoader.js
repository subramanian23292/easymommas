import { useSelector } from 'react-redux';
import Loader from '.';

function CartLoader() {
    const cartLoading = useSelector((state) => state.cart.cartLoading);

    return (
        cartLoading && <Loader bgcolor={'rgba(255, 255, 255, 0.5)'} />
    );
}

export default CartLoader;
