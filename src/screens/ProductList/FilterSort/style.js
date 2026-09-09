import { StyleSheet } from 'react-native';
import Theme from '../../../components/Theme';

export const styles = StyleSheet.create({
  sortcontainer: {
    height: 56,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    position: 'absolute',
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
  },
  btnconatiner: {
    width: '50%',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  btnlabel: {
    textAlign: 'center',
    fontSize: 16,
    color: Theme.colors.paragraph,
    fontFamily: Theme.fontstyle.regular,
  },
  divider: {
    borderRightColor: '#ddd',
    borderRightWidth: 1,
  },
  modalbackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
    backgroundColor: '#000',
  },
  modalouter: {
    position: 'absolute',
    bottom: 0,
  },
  modalcontent: {
    backgroundColor: '#fff',
  },
  titlecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    marginBottom: 10,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalheading: {
    fontSize: 14,
    color: '#949494',
    fontFamily: Theme.fontstyle.regular,
  },
  sortbtn: {
    height: 46,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 2,
    paddingHorizontal: 10,
  },
  sortbtnlabel: {
    fontSize: 16,
    color: Theme.colors.paragraph,
    fontFamily: Theme.fontstyle.semibold,
  },
  radiouter: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radiouteractive: {
    borderColor: Theme.colors.secondary,
  },
  radiouterinactive: {
    borderColor: '#dddddd',
  },
  radioinner: {
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: Theme.colors.secondary,
  },
  closebtn: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
