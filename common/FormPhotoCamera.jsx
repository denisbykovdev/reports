import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Camera } from 'expo-camera';
import AddImage from "../icons/AddImage"
import { useFormikContext } from 'formik';
import AltImage from '../icons/AltImage';
import { responsiveHeight, responsiveWidth } from '../utils/layout';
import colors from '../utils/colors';
import Remove from '../icons/Remove';
import Add from '../icons/Add';
import Edit from '../icons/Edit';
import Signature from 'react-native-signature-canvas';
import useChecked from '../hooks/useChecked';
import useType from '../hooks/useType';
import Carousel from 'react-native-snap-carousel';
import CircleArrowUp from '../icons/CircleArrowUp'
import weights from '../utils/weights';
import fonts from '../utils/fonts';

export default function FormPhotoCamera({ name, interSepter }) {
  const cameraRef = useRef(null);
  // const canvasRef = useRef(null);

  const carouselRef = useRef();

  const { type } = useType()

  const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [openCam, setOpenCam] = useState(false)
  // const [isCanvas, setCanvas] = useState(false)

  const {
    setFieldValue,
    setFieldTouched,
    values
  } = useFormikContext();

  const [images, setImages] = useState(values[name] ? [...values[name]] : [])

  const [selected, setSelected] = useState(0)


  const { isChecked, setChecked } = useChecked()

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === 'denied') await Camera.requestCameraPermissionAsync()
      // console.log("--- FormPhoto/status:", status)
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setFieldTouched(name)
      // console.log(
      //   "--- FormPhoto/takePhoto/val:",
      //   values[name],
      //   data.uri
      // )
      setFieldValue(name, [...values[name], data.uri])
      setImages([...images, data.uri])
      isChecked && setChecked(false)
      interSepter && interSepter(name, [...values[name], data.uri])
      setOpenCam(false)
    }
  }

  const deleteSavedPhoto = () => {
    setFieldTouched(name)
    // setImages([...images.filter((image, i) => i !== selected)])
    setImages([...images.filter((image, i) => i !== carouselRef?.current?.currentIndex)])

    setFieldValue(name, images)
    interSepter && interSepter(name, images)
  }

  // useEffect(() => {
  //   console.log(
  //     "--- FormPhoto/useEffect/images:", images
  //   )
  // }, [images])

  // useEffect(() => {
  //   console.log(
  //     "--- FormPhoto/useEffect/values:", values[name]
  //   )
  // }, [values])

  // const editPhoto = () => {
  //   setCanvas(!isCanvas)
  // }

  // const onTouchThumbnail = (index) => {
  //   setSelected(index)
  //   carouselRef?.current?.snapToItem(index)
  // }

  return (
    <View style={styles.formPhotoCameraContainer}>

      <View style={[
        styles.formPhotoContainer,
        {
          height: responsiveWidth(278),
          width: responsiveWidth(239),
        }
      ]}>
        {
          !openCam
            ?
            <>
              {
                // !values[name][0] 
                // || values[name][0].length < 1 ||
                images.length === 0
                  ?
                  <AltImage />
                  :

                  <Carousel
                    ref={carouselRef}
                    layout='default'
                    data={images}
                    sliderWidth={responsiveWidth(239)}
                    itemWidth={responsiveWidth(239)}
                    onSnapToItem={(index) => setSelected(index)}
                    // slideStyle={{
                    //   flexDirection: 'column-reverse'
                    // }}
                    renderItem={({ item, index }) => (
                      <View key={index} style={styles.photoContainer}>
                        <TouchableOpacity
                          onPress={() => carouselRef.current.snapToPrev()}
                          style={[styles.photoArrow, styles.photoArrowLeft]}
                        ><CircleArrowUp /></TouchableOpacity>
                        <Image
                          style={styles.formPhoto}
                          source={{ uri: item }}
                        />
                        <TouchableOpacity
                          onPress={() => carouselRef.current.snapToNext()}
                          style={[styles.photoArrow, styles.photoArrowRight]}
                        ><CircleArrowUp /></TouchableOpacity>
                      </View>

                    )}
                  />

              }
            </>
            :
            <Camera
              ref={cameraRef}
              style={styles.formCameraContainer}
              type={Camera.Constants.Type.back}
              autoFocus="on"
            >

            </Camera>
        }
      </View>

      <View style={styles.formPhotoCameraFunctionsContainer}>

        {/* <FlatList
          horizontal={true}
          data={images}
          style={{
            width: '65%'
          }}
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{
          //   paddingHorizontal: SPACING
          // }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => onTouchThumbnail(index)}
            >
              <Image
                style={{
                  width: responsiveWidth(41),
                  height: responsiveWidth(41),
                  marginRight: responsiveWidth(12)
                }}
                source={{ uri: item }}
              />
            </TouchableOpacity>
          )}
        /> */}

        <View style={styles.photoCounterContainer}>
          <Text style={styles.photoCounterText}>
            {carouselRef?.current?.currentIndex === undefined || 0 || null || images.length === 0 ? 0 : carouselRef.current.currentIndex + 1} / {images.length}
          </Text>
        </View>

        <View style={styles.formPhotoCameraButtonsContainer}>
          {
            values[name] &&
            <>
              {/* <TouchableOpacity
              style={styles.formPhotoCameraButtonContainer}
              onPress={() => {
                editPhoto()
              }}>
              <Edit />
            </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.formPhotoCameraButtonContainer}
                onPress={() => {
                  deleteSavedPhoto()
                }}>
                <Remove />
              </TouchableOpacity>
            </>
          }


          <TouchableOpacity
            style={styles.formPhotoCameraButtonContainer}
            onPress={() => {
              openCam ? takePhoto() : setOpenCam(true)

            }}>
            <Add />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formPhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paleGrayBg
  },
  formPhotoCameraFunctionsContainer: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    justifyContent: 'space-between',
    marginVertical: responsiveWidth(18)
  },
  formPhotoCameraButtonsContainer: {
    flexDirection: 'row'
  },
  formPhotoCameraButtonContainer: {
    marginLeft: responsiveWidth(12)
  },
  formCameraContainer: {
    height: '100%',
    width: '100%',
    padding: responsiveWidth(8)
  },
  formPhoto: {
    width: '100%',
    height: '100%'
  },
  photoCounterContainer: {
    height: responsiveWidth(41),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoCounterText: {
    fontSize: fonts.medium,
    fontWeight: weights.semiBold,
    color: colors.battleShipGrey
  },
  photoArrow: {
    position: 'absolute',
    top: '45%',
    // marginHorizontal: responsiveWidth(8),
    height: responsiveWidth(40),
    width: responsiveWidth(40),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  photoArrowLeft: {
    zIndex: 1,
    left: 0,
    transform: [{ rotate: '270deg' }]
  },
  photoArrowRight: {
    right: 0,
    transform: [{ rotate: '90deg' }]
  }
})