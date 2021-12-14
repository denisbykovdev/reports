import React from 'react'
import colors from '../utils/colors'
import { responsiveWidth } from '../utils/layout'
import CommonButton from './CommonButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const PrintButton = ({
    active = false,
    select,
    onPress
}) => {
    return (
        <CommonButton
            onPress={onPress}
            buttonHeight={responsiveWidth(40)}
            borderRadius={100}
            buttonColor={
                active ? colors.azul : colors.white
            }
            borderColor={
                active ? colors.azul : colors.lightGrayBorder
            }
            title={select}
            titleColor={
                active ? colors.white : colors.azul
            }
            style={{
                padding: responsiveWidth(7),
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                marginVertical: responsiveWidth(8)

            }}
        >
            <MaterialCommunityIcons
                name={
                    active ? "circle-slice-8" : "circle-outline"
                }
                color={
                    active ? colors.white : colors.azul
                }
                size={responsiveWidth(23)}
            />
        </CommonButton>
    )
}

export default PrintButton