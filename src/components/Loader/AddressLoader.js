import { useSelector } from 'react-redux';
import Loader from '.';

function AddressLoader() {
    const addrLoading = useSelector((state) => state.address.addrLoading);

    return (
        addrLoading && <Loader bgcolor={'rgba(255, 255, 255, 0.5)'} />
    );
}

export default AddressLoader;
