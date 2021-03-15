import React, { useState }  from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Basket from "../icons/Basket";
import CircleArrowDown from "../icons/CircleArrowDown";
import CircleArrowUp from "../icons/CircleArrowUp";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import layout, { responsiveWidth } from "../utils/layout";
import weights from "../utils/weights";
import DropDownElement from "./DropDownElement";
import { useNavigation } from "@react-navigation/native";

const DropDownItem = ({ itemData, dispatchMethod }) => {
    const [isVisible, setVisible] = useState(false);

    const navigation = useNavigation()

    const deleteHandler = (itemId) => {
        dispatchMethod({
            type: "DELETE_ITEM",
            itemId
        })
        console.log(
            "___DDItem/delete:", itemId
        )
    }

    const openReportHandler = (id) =>
        navigation.navigate(
            "AppStack",
            {
                screen: "Report",
                params: {
                    reportId: id
                }
            }
        )


    return (

        <View style={styles.itemContainer}>


            <View style={{
                backgroundColor: isVisible ? colors.paleGrayBg : colors.white
            }}>
                <View style={styles.itemButton}>

                    <TouchableOpacity
                        style={styles.basketIcon}
                        onPress={() => deleteHandler(itemData.id)}
                    >
                        <Basket />
                    </TouchableOpacity>

                    {
                        itemData && itemData.client ?
                            (
                                <TouchableOpacity 
                                    onPress={
                                        () => openReportHandler(itemData.id)
                                    }
                                >
                                    <Text style={styles.itemTitle}>
                                        {itemData.client}
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.itemTitle}>
                                    {itemData.name}
                                </Text>
                            )
                    }


                    <TouchableOpacity onPress={() => setVisible(!isVisible)}>
                        {
                            isVisible ? <CircleArrowUp /> : <CircleArrowDown />
                        }
                    </TouchableOpacity>
                </View>
            </View>


            {
                isVisible &&
                <View style={{
                    backgroundColor: isVisible ? colors.paleGrayBg : colors.white
                }}>
                    {
                        Object.entries(itemData).map(([key, value], index) => {

                            if (key !== "id")
                                return (


                                    <DropDownElement
                                        key={index}
                                        itemId={itemData.id}
                                        elementKey={key}
                                        elementValue={value}
                                        elementIndex={index}
                                        dispatchMethod={dispatchMethod}
                                    />
                                )
                        }
                        )
                    }


                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'yellow'
    },
    itemButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginHorizontal: responsiveWidth(28),
        marginVertical: responsiveWidth(18),
        position: 'relative'
    },
    itemTitle: {
        marginHorizontal: responsiveWidth(14),
        color: colors.darkSkyBlue,
        fontWeight: weights.medium,
        fontSize: fonts.small
    },
    darkText: {
        color: colors.darkBlueGray,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginBottom: responsiveWidth(8),
        marginTop: responsiveWidth(18)
    },
    blueText: {
        color: colors.darkSkyBlue,
        fontWeight: weights.medium,
        fontSize: fonts.small,
        marginVertical: responsiveWidth(18)
    },
    basketIcon: {
        position: 'absolute',
        left: 0
    },
    line: {
        marginHorizontal: responsiveWidth(28),
        backgroundColor: colors.whiteTwo,
        height: responsiveWidth(1)
    },
    itemElementContainer: {
        // backgroundColor: 'yellow',
        marginHorizontal: responsiveWidth(28),
        alignItems: 'flex-end'
    },
    input: {
        borderColor: colors.darkWhite,
        borderWidth: responsiveWidth(2),
        borderRadius: 20,
        height: responsiveWidth(31),
        width: responsiveWidth(239),
        paddingHorizontal: responsiveWidth(10),

        fontSize: fonts.xsmall,
        fontWeight: weights.thin,
        color: colors.darkBlueGray
    }
})

export default DropDownItem;
