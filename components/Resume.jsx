import { useFormikContext } from "formik";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CommonButton from "../common/CommonButton";
import FormContainer from "../common/FormContainer";
import FormField from "../common/FormField";
import Line from "../common/Line";
import useDefects from "../hooks/useDefects";
import useType from "../hooks/useType";
import Basket from "../icons/Basket";
import Copy from "../icons/Copy";
import Tick from "../icons/Tick";
import colors from "../utils/colors";
import { responsiveHeight, responsiveWidth } from "../utils/layout";

const Resume = () => {
    const { defectsState, defectsDispatch } = useDefects()

    const { type } = useType()

    const addNewNote = () => defectsDispatch({
        type: "ADD_NEW_NOTE"
    })

    const deleteNote = (noteId) => defectsDispatch({
        type: "DELETE_NOTE",
        noteId
    })

    const addToSaveNote = (note) => defectsDispatch({
        type: "ADD_NOTE_TO_SAVENOTES",
        saveNote: note
        // {
        //     note,
        //     id: defectsState.notes.length > 0 ? defectsState.notes.length + 1 : 1
        // }
    })

    const deleteFromSaveNotes = (saveNoteId) => defectsDispatch({
        type: "DELETE_NOTE_FROM_SAVENOTES",
        saveNoteId
    })

    return (
        <View style={styles.notesContainer}>
            <CommonButton
                title="+ הוספת הערה"
                onPress={
                    () => addNewNote()
                }
                borderRadius={20}
                buttonHeight={responsiveWidth(33)}
                buttonColor={colors.darkSkyBlue}
                style={{
                    padding: 0,
                    paddingHorizontal: responsiveWidth(70),
                    marginVertical: responsiveWidth(22),
                    alignSelf: 'flex-end'
                }}
                titleStyle={{
                    marginRight: 0
                }}
                titleColor={colors.white}
                buttonWidth={type === 2 ? '30%' : '100%'}
            />
            <Line />
            {
                defectsState && defectsState.notes.map(
                    note =>
                        <NoteItem
                            key={note.id}
                            note={note}
                            deleteNote={deleteNote}
                            addToSaveNote={addToSaveNote}
                            deleteFromSaveNotes={deleteFromSaveNotes}
                        />
                )
            }
        </View>
    )
}

export default Resume;

const NoteItem = ({
    note, deleteNote, addToSaveNote, deleteFromSaveNotes
}) => {
    const [isNoteAdded, setNoteAdded] = useState(false)

    const { type } = useType()

    const {
        // setFieldValue,
        // setFieldTouched,
        // values,
        handleSubmit
    } = useFormikContext()

    const submitNote = (values) => {
        setNoteAdded(!isNoteAdded)
        if (!isNoteAdded) {
            addToSaveNote(
                // note,
                {
                    // ...note,
                    note: values.note,
                    id: note.id
                }
            )
        }
        if (isNoteAdded) {
            deleteFromSaveNotes(note.id)
        }
    }



    return (
        <FormContainer
            initialValues={{ note: '' }}
            onSubmit={submitNote}
            style={styles.noteContainer}
        >
            <View style={[styles.noteActions]}>
                <View style={[styles.noteActionsGroup, {
                    flexDirection: type === 2 ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }]}>
                    <TouchableOpacity
                        style={styles.noteAtionsBasket}
                        onPress={
                            () => deleteNote(note.id)
                        }
                    >
                        <Basket />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Copy />
                    </TouchableOpacity>
                </View>
                {
                    type === 2
                    && (
                        <FormField
                            area
                            style={{
                                height: responsiveHeight(103),
                                textAlign: 'right',
                                width: '90%'
                            }}
                            inputStyle={{
                                marginEnd: 0
                            }}
                            name="note"
                        />
                    )
                }

                <View style={[styles.noteActionsGroup, {
                    // flexDirection: type === 2 ? 'column' : 'row',
                    // justifyContent: 'space-between',
                    // alignItems: 'center'
                }]}>
                    <Text>
                        {note.id}
                    </Text>
                    <TouchableOpacity
                        // onPress={() => addHandler()}
                        onPress={handleSubmit}
                        style={[styles.tickContainer, {
                            backgroundColor: isNoteAdded ? colors.paleGrayBg : colors.white
                        }]}
                    >
                        {
                            isNoteAdded && <Tick />
                        }
                    </TouchableOpacity>
                </View>

            </View>
            {
                type !== 2
                && (
                    <FormField
                        area
                        style={{
                            height: responsiveHeight(103),
                            textAlign: 'right',
                            width: '90%'
                        }}
                        inputStyle={{
                            marginEnd: 0
                        }}
                        name="note"
                    />
                )
            }
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    notesContainer: {
        paddingHorizontal: responsiveWidth(30),
        paddingBottom: responsiveHeight(22)
    },
    tickContainer: {
        height: responsiveWidth(24),
        width: responsiveWidth(24),
        borderWidth: responsiveWidth(2),
        borderColor: colors.whiteTwo,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: responsiveWidth(14)
    },
    noteActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: responsiveWidth(22)
    },
    noteActionsGroup: {
        flexDirection: 'row'
    },
    noteAtionsBasket: {
        marginRight: responsiveWidth(12)
    }
})