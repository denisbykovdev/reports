import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ImageBackground, LogBox, YellowBox } from 'react-native';
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

import { PIXI, Sketch } from 'expo-pixi';
import { GLView } from 'expo-gl';
import * as ExpoPixi from 'expo-pixi';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

// import { Asset, useAssets } from 'expo-asset';
LogBox.ignoreAllLogs()

export default function FormPhotoCamera({
  name,
  interSepter,
  setEdit
}) {
  LogBox.ignoreAllLogs()

  const cameraRef = useRef(null);
  const canvasRef = useRef();
  const carouselRef = useRef();

  const { type } = useType()

  const {
    setFieldValue,
    setFieldTouched,
    values
  } = useFormikContext();

  const { isChecked, setChecked } = useChecked()

  const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [openCam, setOpenCam] = useState(false)

  const [isCanvas, setCanvas] = useState(false)

  const [images, setImages] = useState(values[name] ? [...values[name]] : [])

  const [selected, setSelected] = useState(0)

  const [canvasUri, setCanvasUri] = useState()

  // const [assets, error] = useAssets()

  useEffect(() => {
    (async () => {
      // console.log("--- FormPhoto/status:", cameraRef.current)

      const { status } = await Camera.requestPermissionsAsync();

      if (status === 'denied') await Camera.requestCameraPermissionAsync()

      // const { status } = await Camera.requestCameraPermissionsAsync();

      console.log("--- FormPhoto/status:", status)

      setHasPermission(status);
    })();
  }, []);

  // const userPhotoDir = FileSystem.documentDirectory + 'userPhotoes/'

  // useEffect(() => {
  //   (
  //     async () => {

  //       const dir = await FileSystem.getInfoAsync(userPhotoDir)
  //       console.log(
  //         `--- FPC/effect/dir`, dir
  //       )
  //       if (!dir.exists) {
  //         await FileSystem.makeDirectoryAsync(userPhotoDir)
  //       }
  //     }
  //   )()
  // }, [])

  const takePhoto = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      // const asset = await MediaLibrary.createAssetAsync(data.uri);

      setFieldTouched(name)
      console.log(
        "--- FormPhoto/takePhoto/val:",
        values[name],
        "--- FormPhoto/takePhoto/data:",
        data.uri,
        // "--- FormPhoto/takePhoto/asset:",
        // asset.uri
      )
      setFieldValue(name, [...values[name], data.uri])
      setImages([...images, data.uri])
      isChecked && setChecked(false)
      interSepter && interSepter(name, [...values[name], data.uri])

      // setFieldValue(
      //   name, 
      //   [
      //     ...values[name], 
      //     {
      //       image: data.uri,
      //       layer: ''
      //     }
      //   ]
      // )
      // setImages([
      //   ...images, 
      //   {
      //     image: data.uri,
      //     layer: ''
      //   }
      // ])
      // isChecked && setChecked(false)
      // interSepter && interSepter(
      //   name, 
      //   [
      //     ...values[name], 
      //     {
      //       image: data.uri,
      //       layer: ''
      //     }
      //   ]
      // )

      // setFieldValue(name, [...values[name], asset.uri])
      // setImages([...images, asset.uri])
      // isChecked && setChecked(false)
      // interSepter && interSepter(name, [...values[name], asset.uri])

      // if (data.uri) {
      //   await FileSystem.copyAsync({
      //     from: data.uri,
      //     to: `${userPhotoDir}copy.jpg`,
      //   });

      //   const dirFilled = await FileSystem.getInfoAsync(userPhotoDir)
      //   console.log(
      //     `--- FPC/takePhoto/dirFilled`, dirFilled
      //   )
      // }

      setOpenCam(false)
    }
  }

  const deleteSavedPhoto = () => {
    setFieldTouched(name)
    // setImages([...images.filter((image, i) => i !== selected)])
    setImages([...images.filter((image, i) => i !== carouselRef?.current?.currentIndex)])

    setFieldValue(name, images)
    interSepter && interSepter(name, images)
    carouselRef?.current?.snapToPrev()
  }

  const editPhoto = () => {
    setCanvas(!isCanvas)

    console.log(
      `--- FPC/editPhoto/prev:`,
      images
    )

    setEdit(isCanvas)
  }

  // const onTouchThumbnail = (index) => {
  //   setSelected(index)
  //   carouselRef?.current?.snapToItem(index)
  // }

  const onChangeAsync = async (item) => {
    const { uri } = await canvasRef.current.takeSnapshotAsync();

    console.log(
      `--- FPC/onChangeAsync:`,
      uri,
      item,
      // Object.keys(canvasRef.current.stage)
      // Renderer,
      // PIXI.Renderer
    )

    // images.map(image === item ? item=uri : image)

    setCanvasUri(uri)
    // setFieldValue(name, [...values[name], ])
    setImages([...images, uri])
  };

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
                    firstItem={images.length - 1}
                    onSnapToItem={(index) => {
                      console.log(
                        `--- FPC/onSnapToItem`,
                        index,
                        carouselRef?.current?.currentIndex
                      )
                      setSelected(index)
                    }}

                    // slideStyle={{
                    //   flexDirection: 'column-reverse'
                    // }}
                    scrollEnabled={!isCanvas}
                    renderItem={({ item, index }) => (
                      <View key={index} style={styles.photoContainer}>
                        {
                          !isCanvas
                            ?
                            <>

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

                            </>
                            :
                            <ImageBackground
                              style={styles.formPhoto}
                              source={{ uri: item }}
                              resizeMode="cover"
                            >
                              {/* <GLView
                                onChange={() => onChangeAsync(item)}
                                ref={canvasRef}
                                style={{ flex: 1 }}
                                // transparent={true}
                                onContextCreate={async context => {
                                  const app = new PIXI.Application({ context });
                                  // console.log(
                                  //   context
                                  // )
                                  if (item) {
                                    const sprite = await PIXI.Sprite.fromExpoAsync(
                                      'http://eitanperetz.com/uploads/1GhJshNiH0.png'
                                      // require('../assets/favicon.png')
                                    );
                                  }

                                  app.stage.addChild(sprite);

                                }}
                              /> */}
                              <ExpoPixi.Sketch
                                style={styles.formPhoto}
                                ref={canvasRef}
                                strokeColor="black"
                                strokeWidth={10}
                                strokeAlpha={1}
                                // transparent={true}
                                onChange={() => onChangeAsync()}

                              // onReady={async WebGLRenderingContext => {
                              //   // console.log(
                              //   //   `--- FPC/ WebGLRenderingContext`,
                              //   //   // typeof await WebGLRenderingContext,
                              //   //   // Object.keys(canvasRef.current.stage),
                              //   //   // canvasRef.current.stage.children.length,
                              //   //   `file:${item.substr(item.indexOf('/') + 1)}`,
                              //   //   item
                              //   // )
                              //   let uri = item

                              //   let renderer = canvasRef.current.renderer

                              //   let stage = canvasRef.current.stage

                              //   if (stage.children.length > 0) {
                              //     stage.removeChildren()
                              //     renderer._update()
                              //   }

                              //   const background = await PIXI.Sprite.fromExpoAsync(
                              //     // require('../assets/favicon.png')
                              //     "http://eitanperetz.com/uploads/1GhJshNiH0.png"
                              //   )

                              //   background.rotation = 1.5708
                              //   background.width = renderer.height
                              //   background.height = renderer.width
                              //   background.position.set(renderer.width, 0)

                              //   stage.addChild(background);
                              //   renderer._update();
                              // }}
                              />
                            </ImageBackground>
                        }
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
            />
        }
      </View>

      <View style={styles.formPhotoCameraFunctionsContainer}>

        <View style={styles.photoCounterContainer}>
          <Text style={styles.photoCounterText}>
            {carouselRef?.current?.currentIndex === undefined || 0 || null || images.length === 0 ? 0 : carouselRef.current.currentIndex + 1} / {images.length}
          </Text>
        </View>

        <View style={styles.formPhotoCameraButtonsContainer}>
          {
            values[name] &&
            <>
              <TouchableOpacity
                style={styles.formPhotoCameraButtonContainer}
                onPress={() => {
                  editPhoto()
                }}>
                <Edit />
              </TouchableOpacity>

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