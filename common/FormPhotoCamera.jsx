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

import Carousel, { Pagination } from 'react-native-snap-carousel';

export default function FormPhotoCamera({ name, interSepter }) {
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

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

  const [selected, setSelected] = useState()

  console.log("--- FormPhoto/values[name]:", values[name])

  const { isChecked, setChecked } = useChecked()

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setFieldTouched(name)
      console.log(
        "--- FormPhoto/takePhoto/val:",
        values[name],
        data.uri
      )
      setFieldValue(name, [...values[name], data.uri])
      setImages([...images, data.uri])
      isChecked && setChecked(false)
      interSepter && interSepter(name, [...values[name], data.uri])
      setOpenCam(false)
    }
  }

  const deleteSavedPhoto = () => {
    setFieldTouched(name)
    setImages([...images.filter((image, i) => i !== selected)])

    setFieldValue(name, images)
    interSepter && interSepter(name, images)
  }

  // useEffect(() => {
  //   console.log(
  //     "___FormPhoto/effect:", values[name]
  //   )
  // }, [values[name]])

  // const editPhoto = () => {
  //   setCanvas(!isCanvas)
  // }

  const onTouchThumbnail = (index) => {
    setSelected(index)
    carouselRef?.current?.snapToItem(index)
  }

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
                !values[name][0] || values[name][0].length < 1
                  ?
                  <AltImage />
                  :

                  <Carousel
                    ref={carouselRef}
                    layout='default'
                    data={images}
                    sliderWidth={responsiveWidth(239)}
                    itemWidth={responsiveWidth(239)}
                    renderItem={({ item, index }) => (
                      <Image
                        key={index}
                        style={styles.formPhoto}
                        source={{ uri: item }}
                      />
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

      <View style={styles.formPhotoCameraButtonsContainer}>

        <FlatList
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
        />

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
  );
}

const styles = StyleSheet.create({
  formPhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paleGrayBg
  },
  formPhotoCameraButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: responsiveWidth(18)
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
  }
})