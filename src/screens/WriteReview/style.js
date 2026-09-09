import { StyleSheet } from 'react-native';
import Theme from '../../components/Theme';

export const styles = StyleSheet.create({
  scrollcontainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 10,
  },
  formcontainer: {
    width: '100%',
  },
  fieldcontainer: {
    marginBottom: 12,
  },
  fieldlabel: {
    fontSize: 16,
    color: Theme.colors.paragraph,
    fontFamily: Theme.fontstyle.regular,
    marginBottom: 6,
  },
  inputfield: {
    borderWidth: 1,
    borderRadius: 10,
    height: 120,
    padding: 10,
    fontSize: 16,
    fontFamily: Theme.fontstyle.regular,
    color: Theme.colors.paragraph,
  },
  valid: {
    borderColor: '#dddddd',
  },
  invalid: {
    borderColor: '#ff0000',
  },
  errortext: {
    color: '#ff0000',
    fontSize: 14,
    fontFamily: Theme.fontstyle.regular,
    marginTop: 2,
  },
  savebutton: {
    height: 50,
    backgroundColor: Theme.colors.secondary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savebuttonlabel: {
    textAlign: 'center',
    fontFamily: Theme.fontstyle.semibold,
    fontSize: 16,
    color: '#ffffff',
  },
  starcontainer: {
    flexDirection: 'row',
    gap: 4,
  },
});
