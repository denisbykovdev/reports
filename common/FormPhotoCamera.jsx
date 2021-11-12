import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  LogBox
} from 'react-native';
import { Camera } from 'expo-camera';
import { useFormikContext } from 'formik';
import AltImage from '../icons/AltImage';
import { responsiveWidth } from '../utils/layout';
import colors from '../utils/colors';
import Remove from '../icons/Remove';
import Add from '../icons/Add';
import Edit from '../icons/Edit';
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

import { captureRef, releaseCapture } from "react-native-view-shot";
import Spinner from './Spinner';

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
  const snapShotRef = useRef();

  // const { type } = useType()

  const {
    setFieldValue,
    setFieldTouched,
    values
  } = useFormikContext();

  const { isChecked, setChecked } = useChecked()

  const [hasPermission, setHasPermission] = useState(null);

  const [isCameraReady, setCameraReady] = useState(false);

  // const [type, setType] = useState(Camera.Constants.Type.back);

  const [openCam, setOpenCam] = useState(false)

  const [isCanvas, setCanvas] = useState(false)

  const [images, setImages] = useState(values[name] ? [...values[name]] : [])

  const [selected, setSelected] = useState(0)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();

      console.log("--- FormPhoto/status:", status, `:images:`, images)

      // if (status === 'denied') {
      //   const newStatus = await Camera.requestCameraPermissionAsync()

      //   console.log("--- FormPhoto/status:", newStatus, `:images:`, images)
      // }

      setHasPermission(status);
    })();
  }, []);

  const takePhoto = async () => {
    console.log(
      `--- FormPhotoCamera/takePhoto/init:`, 
      isCameraReady
    )
    try {
      if (cameraRef.current) {
        setLoading(true)

        // const ratio = await 

        // console.log(
        //   `--- FormPhotoCamera/takePhoto/ratio:`, ratio
        // )

        const data = await cameraRef.current.takePictureAsync({
          base64: true,
          // skipProcessing: true
          // pictureSize: ratio
        });
  
        setFieldTouched(name)
  
        console.log(
          `--- FormPhotoCamera/takePhoto/data:`, data
        )
  
        setImages([...images, data['base64']])
  
        setFieldValue(name, [...values[name], data['base64']])
  
        isChecked && setChecked(false)
  
        interSepter && interSepter(name, [...values[name], data['base64']])
  
        setLoading(false)
  
        setOpenCam(false)
      }
    } catch (error) {
      console.log(
        `--- FormPhotoCamera/error:`, error
      )
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

    setEdit(isCanvas)
  }

  const onChangeAsync = async () => {
    const result = await captureRef(snapShotRef, {
      result: 'base64',
      // height: pixels,
      // width: pixels,
      quality: 1,
      format: 'png',
    });

    console.log(
      `--- FPC/onChangeAsync:`,
      result
    )

    setImages([...images.map((image, i) => i === carouselRef?.current?.currentIndex ? result : image)])

    setFieldValue(name, images)
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
                      setSelected(index)
                    }}
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
                                // source={{ uri: item }}
                                source={{ uri: `data:image/png;base64,${item}` }}
                              />
                              <TouchableOpacity
                                onPress={() => carouselRef.current.snapToNext()}
                                style={[styles.photoArrow, styles.photoArrowRight]}
                              ><CircleArrowUp /></TouchableOpacity>

                            </>
                            :
                            <ImageBackground
                              ref={snapShotRef}
                              collapsable={false}
                              style={styles.formPhoto}
                              // source={{ uri: item }}
                              source={{ uri: `data:image/png;base64,${item}` }}
                              resizeMode="cover"
                            >
                              <ExpoPixi.Sketch
                                style={styles.formPhoto}
                                ref={canvasRef}
                                strokeColor="black"
                                strokeWidth={7}
                                strokeAlpha={3}
                                onChange={() => onChangeAsync()}
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
              onCameraReady={() => setCameraReady(true)}
              // useCamera2Api={true}
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

{/* <GLView
                                onChange={() => onChangeAsync(item)}
                                ref={canvasRef}
                                style={{ flex: 1 }}
                                transparent={false}
                                onContextCreate={async context => {
                                  const app = new PIXI.Application({ context });


                                  const sprite = await PIXI.Sprite.fromExpoAsync(
                                    `file:${item.substr(item.indexOf('/') + 1)}`,
                                    // require('../assets/favicon.png')
                                  );


                                  app.stage.addChild(sprite);

                                }}
                              /> */}

                                    // onReady={async WebGLRenderingContext => {
                              //   console.log(
                              //     `--- FPC/ WebGLRenderingContext`,
                              //     // `file:${item.substr(item.indexOf('/') + 1)}`,
                              //   )
                              //   let uri = item

                              //   let renderer = canvasRef.current.renderer

                              //   let stage = canvasRef.current.stage

                              //   if (stage.children.length > 0) {
                              //     stage.removeChildren()
                              //     renderer._update()
                              //   }

                              //   // var tex = new PIXI.Texture.fromLoader(item);

                              //   const background = await PIXI.Sprite.fromExpoAsync(
                              //     // require('../assets/favicon.png')
                              //     uri
                              //   )

                              //   background.rotation = 1.5708
                              //   background.width = renderer.height
                              //   background.height = renderer.width
                              //   background.position.set(renderer.width, 0)

                              //   stage.addChild(background);
                              //   renderer._update();
                              // }}


  // const USER_PHOTO_DIR = FileSystem.documentDirectory + 'photos';

  // const handleImageSave = async photo => {
  //   const imageName = `${Date.now()}.jpg`;
  //   const photoSource = `${USER_PHOTO_DIR}/${imageName}`;

  //   await FileSystem.copyAsync({
  //     from: photo.uri,
  //     to: photoSource,
  //   });

  //   const image = {
  //     id: 'imgid-123',
  //     imageSrc: photoSource,
  //     createdAt: Date.now(),
  //   };

  //   return image;
  // }

     // const dirInfo = await FileSystem.getInfoAsync(USER_PHOTO_DIR);
      // if (!dirInfo.exists) {
      //   console.log("directory doesn't exist, creating...");
      //   await FileSystem.makeDirectoryAsync(USER_PHOTO_DIR, { intermediates: true });
      // }

      // const image = await handleImageSave(data)

        // const onTouchThumbnail = (index) => {
  //   setSelected(index)
  //   carouselRef?.current?.snapToItem(index)
  // }

      // const { uri } = await canvasRef.current.takeSnapshotAsync(
    //   {
    //     x: '100%',
    //     y: '100%',
    //     width: '100%',
    //     height: '100%'
    //   }
    // );

    // let layer = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

    // let photo = await FileSystem.readAsStringAsync(item, { encoding: 'base64' });

    // const targetPixelCount = 1080; // If you want full HD pictures
    // const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
    // // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
    // const pixels = targetPixelCount / pixelRatio;