import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
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
import Carousel from 'react-native-snap-carousel';
import CircleArrowUp from '../icons/CircleArrowUp'
import weights from '../utils/weights';
import fonts from '../utils/fonts';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

LogBox.ignoreAllLogs();

export default function FormPhotoCamera({
  name,
  interSepter,
  setEdit
}) {
  LogBox.ignoreAllLogs()

  const cameraRef = useRef(null);
  const carouselRef = useRef();

  const {
    setFieldValue,
    setFieldTouched,
    values
  } = useFormikContext();

  const navigation = useNavigation();
  const route = useRoute();

  const routeImage = route?.params?.image;
  const routeBase64 = route?.params?.base64;

  const { isChecked, setChecked } = useChecked();

  const [isCameraReady, setCameraReady] = useState(false);

  const [openCam, setOpenCam] = useState(false);

  // const [images, setImages] = useState(values[name] ? [...values[name]] : []);
  const [images, setImages] = useState([]);

  const [selected, setSelected] = useState(0);

  const uploadBase64 = async (base64String) => {
    const base64Data = base64String.replace("data:image/png;base64,","");

    try {
      const image = await FileSystem.readAsStringAsync(base64Data);

      return image;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(
      `--- FormPhotoCamera/props: values[name]:`,
      typeof values[name]
    );

    if(Array.isArray(values[name])){
      const promises = values[name].map(
        async item => 
          await uploadBase64(item)
      );

      (
        async () => {
          for await (const item of promises){
            setImages([...images, item]);
          };
        }
      )();
    }
  }, [])

  useEffect(() => {
    if (routeImage) {
      setImages([
        ...images.map(
          (im, i) => i === images.length -1
            ? routeImage.toString()
            : im
        )
      ]);

      setSelected(routeImage.toString());
    };
  }, [routeImage]);

  useEffect(() => {
    if (routeBase64 && values.image) {
      setFieldValue(name, [
        ...values[name].map(
          (im, i) => i === values[name].length -1
            ? routeBase64.toString()
            : im
        )
      ]);
    };
  }, [routeBase64]);

  // useEffect(() => {
  //   console.log(
  //     `--- images:`, 
  //     images,
  //     values.image && values.image.length > 0 && values.image[values.image.length -1] === routeBase64.toString()
  //   );
  // }, [images])

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      console.log("--- FormPhoto/status:", status, `:images:`, images);
    })();
  }, []);

  const takePhoto = async () => {
    try {
      if (cameraRef.current) {
        console.log(
          `--- FormPhotoCamera/takePhoto/init:`,
          isCameraReady
        );

        const data = await cameraRef.current.takePictureAsync({
          quality: 0,
          base64: true,
          skipProcessing: true
        });

        setFieldTouched(name);

        console.log(
          `--- FormPhotoCamera/takePhoto/data:`,
          data['uri']
        );

        setImages([...images, data['uri']]);

        setSelected(data['uri']);

        setFieldValue(name, [...values[name], data['base64']]);

        isChecked && setChecked(false);

        interSepter && interSepter(name, [...values[name], data['base64']]);

        setOpenCam(false);
      }
    } catch (error) {
      console.log(
        `--- FormPhotoCamera/error:`, error
      );
    };
  };

  const deleteSavedPhoto = () => {
    setFieldTouched(name);
    // setImages([...images.filter((image, i) => i !== selected)])
    setImages([...images.filter((image, i) => i !== carouselRef?.current?.currentIndex)]);

    setFieldValue(name, [...values.slice(0, values.length - 1)]);

    interSepter && interSepter(name, [...values.slice(0, values.length - 1)]);

    setSelected(selected + 1);

    carouselRef?.current?.onSnapToItem(selected);
  };

  const editPhoto = () => {
    navigation.navigate(
      "AppStack",
      {
        screen: "Camera",
        params: {
          // image: images[images.length - 1]
          image: selected
        }
      }
    );
  };

  const prevHandler = () => {
    carouselRef.current.snapToPrev();
    // setSelected(images[carouselRef.current.index]);
  };

  const nextHandler = () => {
    carouselRef.current.snapToNext();
    // setSelected(images[carouselRef.current.index]);
  };

  useEffect(() => {
    console.log(
      `--- selected:`, selected
    );
  }, [selected]);

  return (
    <View style={[styles.formPhotoCameraContainer]}>
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
                    // firstItem={images.length - 1}
                    firstItem={images.indexOf(selected)}
                    onSnapToItem={(index) => {
                      setSelected(images[index])
                    }}
                    scrollEnabled={true}
                    renderItem={({ item, index }) => (
                      <View key={index} style={styles.photoContainer}>
                        <TouchableOpacity
                          onPress={() => prevHandler()}
                          style={[styles.photoArrow, styles.photoArrowLeft]}
                        ><CircleArrowUp /></TouchableOpacity>
                        <Image
                          style={styles.formPhoto}
                          source={{ uri: item }}
                        // source={{ uri: `data:image/png;base64,${item}` }}
                        />
                        <TouchableOpacity
                          onPress={() => nextHandler()}
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
              openCam 
                ? takePhoto() 
                : setOpenCam(true)
            }}>
            <Add />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    width: '100%',
    height: '100%'
  },
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
    // padding: responsiveWidth(8),
    // flex: 1,
    position: "absolute",
    // zIndex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
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
});