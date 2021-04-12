import { useFormikContext } from "formik"
import React, { memo, useCallback, useState } from "react"
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import colors from "../utils/colors"
import fonts from "../utils/fonts"
import { responsiveWidth } from "../utils/layout"
import weights from "../utils/weights"
import FormField from "./FormField"
import FormSelect from "./FormSelect"

const testArray = ['לביצוע', 'נבדק']

function FormMaskedField({
    fieldName,
    placeholder,
    dispatchMethod,
    itemId,
    itemWidth
}) {
    const [openField, setOpenFieled] = useState(false)

    const interSepter = useCallback((name, text) => {
        console.log(
            "_______FormMaskedField/intersepter:", text, name
        )
        dispatchMethod({
            type: "CHANGE_ITEM_VALUE",
            itemId,
            itemKey: name,
            itemNewValue: text
        })
    }, [])

    const {values} = useFormikContext()

    return (
        <View style={{
            width: `${itemWidth}%`,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TouchableWithoutFeedback
                onPress={() => setOpenFieled(!openField)}
            >
                <View
                    style={[
                        {
                            width: fieldName === 'status' && openField ? '100%' : 'auto',
                            padding: responsiveWidth(4),
                            height: 'auto'
                        }
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => setOpenFieled(true)}
                    >
                        {
                            openField
                                ?
                                <View>
                                    {
                                        fieldName === "status"
                                            ? <FormSelect
                                                placeholder="לביצוע"
                                                name="status"
                                                interSepter={interSepter}
                                                style={{
                                                    marginBottom: 0
                                                }}
                                                array={testArray}
                                            />
                                            : <FormField
                                                placeholder={placeholder}
                                                style={{
                                                    padding: 0,
                                                    height: responsiveWidth(31),
                                                    borderColor: colors.darkWhite,
                                                    borderWidth: responsiveWidth(2),
                                                    borderRadius: 20
                                                }}
                                                name={fieldName}
                                                interSepter={interSepter}
                                            />
                                    }
                                </View>

                                : <View
                                    style={{
                                        height: responsiveWidth(33),
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: colors.darkSkyBlue,
                                            fontWeight: weights.medium,
                                            fontSize: fonts.small
                                        }}
                                    >
                                        {
                                            values && values[fieldName]
                                            ? values[fieldName]
                                            : placeholder
                                        }
                                    </Text>
                                </View>
                        }
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default FormMaskedField