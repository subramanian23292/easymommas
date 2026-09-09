import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { AppIcon } from '../../img/AppIcon';
import { styles } from './style';
import Theme from '../Theme';

const CheckoutStepper = (WrappedComponent) => {
    const StepperWrapper = (props) => {
        const { width } = useWindowDimensions();
        const { currentStep } = props;

        const steps = ['Address', 'Delivery Method', 'Payment'];
        const activeColor = Theme.colors.secondary;
        const activeText = Theme.colors.paragraph;
        const inactiveColor = '#BDBDBD';
        const stepperWidth = (width / 3) - 6;
        const lineLeft = ((width / 3) / 2) - 6;
        const lineWidth = (width / 3);

        return (
            <>
            <View style={styles.stepperOuter}>
                {steps.map((step, index) => (
                <View key={index} style={[styles.stepperInner, { width: stepperWidth }]}>
                    <View style={[styles.stepRound, { backgroundColor: index <= currentStep ? activeColor : inactiveColor }]}>
                        {currentStep > index ? <AppIcon.Check width={12} height={12} /> : <Text style={styles.stepcount}>{index + 1}</Text>}
                    </View>
                    <Text style={[styles.stepmethod, { color: index === currentStep ? activeText : inactiveColor }]}>{step}</Text>
                    {index !== 2 && <View style={[styles.stepLine, { left: lineLeft,  width: lineWidth, backgroundColor: index < currentStep ? activeColor : inactiveColor }]}/>}
                </View>
                ))}
            </View>
            <WrappedComponent {...props} />
            </>
        );
    };

    return StepperWrapper;
};

export default CheckoutStepper;
