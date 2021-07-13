import React from 'react';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import { responsiveWidth } from '../utils/layout';
import CommonButton from './CommonButton';

const PassChangeButton = ({
    itemWidth,
    onPress
}) => (
    <CommonButton
        title="לשנות את הסיסמה"
        buttonShadow={true}
        buttonColor={colors.azul}
        buttonHeight={responsiveWidth(43)}
        titleColor={colors.white}
        titleStyle={{
            marginRight: 0
        }}
        style={{
            marginVertical: !itemWidth ? responsiveWidth(18) : 0,
            marginHorizontal: !itemWidth ? responsiveWidth(28) : 0,
        }}
        onPress={onPress}
    />
)

export default PassChangeButton