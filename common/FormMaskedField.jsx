import { useNavigation } from "@react-navigation/native"
import { useFormikContext } from "formik"
import React, { useState } from "react"
import { useEffect } from "react"
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import stringSlicer from "../helpers/stringSlicer"
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
    itemData,
    itemId,
    itemWidth,
    closeHelper
}) {
    const [openField, setOpenFieled] = useState(false)

    const navigation = useNavigation()

    const openReportHandler = (itemId) => navigation.navigate(
        "AppStack",
        {
            screen: "Report",
            params: {
                reportId: itemId.toString(),
                report: itemData
            }
        }
    )

    useEffect(() => {
        setOpenFieled(false)
    }, [closeHelper])

    const { values } = useFormikContext()

    return (
        <View style={{
            width: `${itemWidth}%`,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TouchableWithoutFeedback
                onPress={
                    fieldName === 'id'
                        ? () => openReportHandler(itemId)
                        : () => setOpenFieled(!openField)
                }
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
                        onPress={fieldName !== 'id' ? () => setOpenFieled(true) : () => openReportHandler(itemId)}
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
                                                // interSepter={interSepter}
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
                                            // interSepter={interSepter}
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
                                            stringSlicer(values && values[fieldName]
                                                ? values[fieldName]
                                                : placeholder, 10)
                                        }
                                    </Text>
                                </View>
                        }
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View >
    )
}

export default FormMaskedField