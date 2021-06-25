import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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

export default function FormPhotoCamera({ name, interSepter }) {
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

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
      setFieldValue(name, data.uri)
      isChecked && setChecked(false)
      interSepter && interSepter(name, data.uri)
      setOpenCam(false)
    }
  }

  const deleteSavedPhoto = () => {
    setFieldTouched(name)
    setFieldValue(name, ' ')
    interSepter && interSepter(name, ' ')
  }

  // useEffect(() => {
  //   console.log(
  //     "___FormPhoto/effect:", values[name]
  //   )
  // }, [values[name]])

  // const editPhoto = () => {
  //   setCanvas(!isCanvas)
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
                !values[name] || values[name].length < 1
                  ?
                  <AltImage />
                  :
                  <Image
                    source={{ uri: values[name] }}
                    style={styles.formPhoto}
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