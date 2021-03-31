import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, View } from "react-native"
import CommonButton from "../common/CommonButton"
import colors from "../utils/colors"
import layout, { responsiveHeight, responsiveWidth } from "../utils/layout"
import { MaterialIcons } from "@expo/vector-icons"

const useMenu = (array, init, scrollCatcher, layoutCatcher) => {
    const [active, setActive] = useState(init)

    // useEffect(() => {
    //     setActive(init)
    // }, [])

    // const setterHelper = useCallback((desc) => {
    //     setActive(desc)
    // }, [])

    const MenuRender = useCallback(() => {
        return (
            <View style={styles.menu}>

                <ScrollView
                    style={styles.menuInner}
                    contentContainerStyle={[
                        styles.scrollViewContainerStyle,
                        {
                            width: layout.width > 600 ? '100%' : 'auto'
                        }
                    ]}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={200}
                    onScroll={scrollCatcher}
                    scrollEnabled={layout.width < 600}
                >
                    {
                        array.map((element, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.scrollViewItemContainer,
                                    {
                                        width: layout.width < 600 ? layout.width - responsiveWidth(63) : layout.width / 4
                                    }
                                ]}
                                onLayout={layoutCatcher}
                            >
                                {
                                    layout.width < 600 && i !== 0 &&
                                    <MaterialIcons
                                        name="keyboard-arrow-left"
                                        size={responsiveWidth(23)}
                                        color={colors.slateGrey}
                                        style={{
                                            position: 'absolute',
                                            left: responsiveWidth(10)
                                        }}
                                    />
                                }
                                <CommonButton
                                    onPress={() => setActive(element.desc)}
                                    // onPress={() => setterHelper(element.desc)}
                                    title={element.label}
                                    titleColor={
                                        // active === element.desc ?
                                        //     colors.azul
                                        //     : 
                                        colors.darkBlueGray
                                    }
                                    buttonColor={
                                        // active === element.desc ?
                                        //     colors.white 
                                        //     :
                                        colors.paleGrayBg
                                    }
                                    borderRadius={25}
                                    buttonWidth={layout.width < 600 ? ((layout.width - responsiveWidth(63)) / 2) : ((layout.width - responsiveWidth(63)) / 8)}
                                    // buttonWidth={responsiveWidth(121)}
                                    // buttonWidth={'50%'}
                                    buttonHeight={responsiveHeight(38)}
                                    titleStyle={{ marginRight: 0 }}
                                    style={{ padding: 0 }}
                                />

                                {
                                    layout.width < 600 && i !== array.length - 1 &&
                                    <MaterialIcons
                                        name="keyboard-arrow-right"
                                        size={responsiveWidth(23)}
                                        color={colors.slateGrey}
                                        style={{
                                            position: 'absolute',
                                            right: responsiveWidth(10)
                                        }}
                                    />
                                }
                            </View>
                        ))
                    }
                </ScrollView>

                {/* <View style={[styles.activeLineContainer, {
                    justifyContent: active === init ? "flex-start" : "flex-end"
                }]}>
                    <View style={styles.activeLine}></View>
                </View> */}
            </View>
        )
    }, [])

    return [active, MenuRender]
}

const styles = StyleSheet.create({
    menu: {
        borderTopColor: colors.whiteTwo,
        borderTopWidth: responsiveWidth(1)
    },
    menuInner: {
        borderBottomColor: colors.whiteTwo,
        borderBottomWidth: responsiveWidth(3),
        // width: responsiveWidth(400),

        // flexDirection: 'row',
        paddingVertical: responsiveWidth(8),
        // paddingHorizontal: responsiveWidth(30)
    },
    activeLineContainer: {
        paddingVertical: responsiveWidth(8),
        paddingHorizontal: responsiveWidth(31),

        flexDirection: "row"
    },
    activeLine: {
        width: responsiveWidth(140),
        height: responsiveHeight(4),
        backgroundColor: colors.silver,
        borderRadius: responsiveWidth(25)
    },
    scrollViewContainerStyle: {
        // alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollViewItemContainer: {
        // width: layout.width - responsiveWidth(63),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default useMenu;