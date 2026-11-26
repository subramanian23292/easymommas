import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from '../components/Theme';
import CartBag from '../components/Header/CartBag';
import BackButton from '../components/Header/BackButton';
import Header from '../components/Header';
import HomeHeader from '../components/Header/HomeHeader';
import Home from '../screens/Home';
import Category from '../screens/Category';
import ProductList from '../screens/ProductList';
import Product from '../screens/Product';
import Cart from '../screens/Cart';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Account from '../screens/Account';
import Filter from '../screens/Filter';
import OrderList from '../screens/OrderList';
import Order from '../screens/Order';
import AddressList from '../screens/AddressList';
import Address from '../screens/Address';
import ChangePassword from '../screens/ChangePassword';
import ProductImage from '../screens/ProductImage';
import Profile from '../screens/Profile';
import CheckoutAddress from '../screens/Checkout/CheckoutAddress';
import DeliveryMethod from '../screens/Checkout/DeliveryMethod';
import Payment from '../screens/Checkout/Payment';
import Review from '../screens/Review';
import WriteReview from '../screens/WriteReview';
import Success from '../screens/Success';
import DeliveryAddress from '../screens/SelectAddress/DeliveryAddress';
import BillingAddress from '../screens/SelectAddress/BillingAddress';
import Search from '../screens/Search';

const cardFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
const HeaderBack = () => <BackButton />;
const HeaderCart = () => <CartBag />;
const HeaderRight = () => <Header />;
const HomeLogo = () => <HomeHeader/>;

const Stack = createStackNavigator();
function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyleInterpolator: cardFade,
        headerLeft: HeaderBack,
        headerTitleStyle: {
          fontWeight: 400,
          fontFamily: Theme.fontstyle.regular,
          fontSize: 18,
          marginStart: Platform.OS === 'ios' ? null : 20,
        },
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: Theme.colors.primary,
          elevation: 0,
          height: 56,
          borderBottomWidth: 0,
          shadowOpacity: 0,
        },
        headerStatusBarHeight: 0,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: HomeLogo,
          headerRight: HeaderCart,
          title: '',
        }}
      />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="OrderList" component={OrderList} options={{ title: 'My Orders' }} />
      <Stack.Screen name="Order" component={Order} options={{ title: 'Order Details' }} />
      <Stack.Screen name="AddressList" component={AddressList} options={{ title: 'My Addresses' }} />
      <Stack.Screen name="Address" component={Address} options={{ title: 'Add Address' }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Change Password' }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} options={{ title: 'Select delivery address' }} />
      <Stack.Screen name="BillingAddress" component={BillingAddress} options={{ title: 'Add billing address' }} />
      <Stack.Screen name="CheckoutAddress" options={{ title: 'Checkout' }}>{(props) => <CheckoutAddress {...props} currentStep={0} />}</Stack.Screen>
      <Stack.Screen name="DeliveryMethod" options={{ title: 'Checkout' }}>{(props) => <DeliveryMethod {...props} currentStep={1} />}</Stack.Screen>
      <Stack.Screen name="Payment" options={{ title: 'Checkout' }}>{(props) => <Payment {...props} currentStep={2} />}</Stack.Screen>
      <Stack.Screen name="WriteReview" component={WriteReview} options={{ title: 'Write Review'}} />
      <Stack.Screen name="Review" component={Review} options={{ title: 'All Reviews'}} />
      <Stack.Group
        screenOptions={{
          headerRight: HeaderRight,
        }}
      >
        <Stack.Screen name="Category" component={Category} options={{ title: 'Categories' }}/>
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={({ route }) => ({
            headerTitleContainerStyle: {
              alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
              width: Platform.OS === 'ios' ? '46%' : '56%',
            },
            title: route.params?.title || '',
          })}
        />
        <Stack.Screen
          name="Product"
          component={Product}
          options={({ route }) => ({
            headerTitleContainerStyle: {
              alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
              width: Platform.OS === 'ios' ? '46%' : '56%',
            },
            title: route.params?.title || '',
          })}
        />
        <Stack.Screen name="Account" component={Account} options={{ title: 'My Account' }} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            height: 0,
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerLeft: null,
          title: '',
        }}
      >
        <Stack.Screen name="Success" component={Success} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Filter" component={Filter} />
        <Stack.Screen name="ProductImage" component={ProductImage} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default AppStack;
