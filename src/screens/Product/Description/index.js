import React, { useMemo, memo } from 'react';
import { useWindowDimensions, View, Text} from 'react-native';
import RenderHtml from '@native-html/render';
import { styles } from './style';
import Theme from '../../../components/Theme';

export const systemFonts = ['Lato-Regular'];

function Description({ data = '' }) {
    const { width, fontScale } = useWindowDimensions();

    const htmlStyle = useMemo(() => ({
        div: {
            marginBottom: 6,
            color: Theme.colors.paragraph,
            fontFamily: Theme.fontstyle.regular,
            fontSize: 16 / fontScale,
        },
        p: {
            marginTop: 0,
            fontSize: 16 / fontScale,
            lineHeight: 20 / fontScale,
            color: Theme.colors.paragraph,
            fontFamily: Theme.fontstyle.regular,
        },
        h3: {
            marginTop: 0,
            marginBottom: 6,
            fontSize: 16 / fontScale,
            lineHeight: 20 / fontScale,
            color: Theme.colors.paragraph,
            fontFamily: Theme.fontstyle.semibold,
        },
    }), [fontScale]);

    const source = useMemo(() => ({ html: data }), [data]);
    const contentWidth = useMemo(() => width, [width]);
    const ignoredDomTags = useMemo(() => ['iframe'], []);
    const ignoredStyles = useMemo(() => ['textDecorationColor', 'alignItems', 'display'], []);

    return (
        <>
        <View style={styles.containerdesc}>
            <Text style={styles.desctitle}>Description</Text>
            <View style={styles.divider}/>
        </View>
        <RenderHtml
            contentWidth={contentWidth}
            source={source}
            tagsStyles={htmlStyle}
            ignoredDomTags={ignoredDomTags}
            ignoredStyles={ignoredStyles}
            systemFonts={systemFonts}
        />    
        </>
    );
}

export default memo(Description);

