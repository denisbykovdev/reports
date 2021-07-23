import React, { useEffect, useState } from "react";
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
import useModal from "../hooks/useModal"
import Delete from "../modals/Delete";
import Clipboard from 'expo-clipboard';
import { useFormikContext } from "formik";
import AvoidingView from "../common/AvoidingView";
import useChecked from "../hooks/useChecked";

const Resume = ({ notes }) => {
    const { defectsState, defectsDispatch } = useDefects()

    const { isChecked, setChecked } = useChecked()

    const { type } = useType()

    const addNewNote = () =>
        defectsDispatch({
            type: "ADD_NEW_NOTE"
        })


    const deleteNote = (noteId) => defectsDispatch({
        type: "DELETE_NOTE",
        noteId
    })

    const saveNoteToReport = (noteId) => {
        setChecked(false)
        defectsDispatch({
            type: "SAVE_NOTE_TO_REPORT",
            noteId
        })
    }

    const removeNoteFromReport = (noteId) => {
        setChecked(false)
        defectsDispatch({
            type: "REMOVE_NOTE_FROM_REPORT",
            noteId
        })
    }

    useEffect(() => {
        if (notes && notes !== null && notes.length > 0) {
            defectsDispatch({
                type: "ADD_SERVER_NOTES",
                notes
            })
        }
        console.log(
            `--- notes/effect/props:`, notes, defectsState.notes
        )
    }, [])

    return (
        <View style={styles.notesContainer}>
            <CommonButton
                title="+ הוספת הערה"
                // title="somw other long"
                onPress={
                    () => addNewNote()
                }
                borderRadius={20}
                buttonHeight={responsiveWidth(33)}
                buttonColor={colors.darkSkyBlue}
                style={{
                    padding: 0,
                    // paddingHorizontal: responsiveWidth(70),
                    marginVertical: responsiveWidth(22),
                    alignSelf: 'flex-end',
                    // width: '100%'
                }}
                titleStyle={{
                    marginRight: 0,

                }}
                titleColor={colors.white}
                buttonWidth={type === 2 ? '30%' : '100%'}
            />
            <Line />
            {
                defectsState.notes.map(
                    (note, i) =>
                        <NoteItem
                            key={i}
                            note={note}
                            deleteNote={deleteNote}
                            saveNoteToReport={saveNoteToReport}
                            removeNoteFromReport={removeNoteFromReport}
                            defectsDispatch={defectsDispatch}
                        />
                )
            }
        </View>

    )
}

const NoteItem = ({
    note,
    deleteNote,
    saveNoteToReport,
    removeNoteFromReport,
    defectsDispatch
}) => {
    const { type } = useType()

    const [openDeleteModal, closeDeleteModal, DeleteModal] = useModal()

    // const [copiedText, setCopiedText] = useState('')

    useEffect(() => {
        console.log(
            '--- NoteItem/type:', type
        )
    }, [])

    const noteToReport = (noteId) => {
        if (note.isSavedToReport) {
            removeNoteFromReport(noteId)
        } else if (!note.isSavedToReport) {
            saveNoteToReport(noteId)
        }
    }

    const copyToClipboard = () => {
        Clipboard.setString(note.note)
    }

    // const fetchCopiedText = async () => {
    //     const text = await Clipboard.getStringAsync();
    //     setCopiedText(text);
    // }

    const interSepter = (name, text) => {
        // console.log(
        //     "___Resume(notes)/intersepter:", name, text
        // )
        defectsDispatch({
            type: "CHANGE_NOTE_VALUE",
            noteId: note.id,
            noteNewValue: text
        })
    }

    return (
        <View style={{
            // backgroundColor: 'yellow'
        }}>
            <FormContainer
                initialValues={{ note: '' }}
                // onSubmit={submitNote}
                style={styles.noteContainer}
            >
                <View style={[styles.noteActions]}>
                    <View style={[styles.noteActionsGroup, {
                        flexDirection: type !== 1 ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }]}>
                        <TouchableOpacity
                            style={styles.noteAtionsBasket}
                            onPress={
                                // () => deleteNote(note.id)
                                () => openDeleteModal()
                            }
                        >
                            <Basket />
                        </TouchableOpacity>

                        <DeleteModal
                            modalContainerStyle={{
                                paddingHorizontal: 0
                            }}
                        >
                            <Delete
                                closeDeleteModal={closeDeleteModal}
                                deleteNote={deleteNote}
                                id={note.id}
                            />
                        </DeleteModal>

                        <TouchableOpacity onPress={() => copyToClipboard()}>
                            <Copy />
                        </TouchableOpacity>
                    </View>
                    {
                        type === 2
                        && (
                            <FormField
                                area={true}
                                style={{
                                    height: responsiveHeight(103),
                                    textAlign: 'right',
                                    width: '90%',
                                    // paddingBottom: responsiveWidth(24)
                                }}
                                inputStyle={{
                                    marginEnd: 0,
                                    padding: 0
                                    // height: responsiveHeight(103),
                                    // textAlign: 'right',
                                    // width: '90%'
                                }}
                                name="note"
                                interSepter={interSepter}
                                placeholder={note.note}
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
                            onPress={() => noteToReport(note.id)}
                            // onPress={handleSubmit}
                            style={[styles.tickContainer, {
                                backgroundColor: note.isSavedToReport ? colors.paleGrayBg : colors.white
                            }]}
                        >
                            {
                                note.isSavedToReport && <Tick />
                            }
                        </TouchableOpacity>
                    </View>

                </View>
                {
                    type === 1
                    && (
                        // <View
                        //     style={{
                        //         height: responsiveHeight(103)
                        //     }}
                        // >
                        <FormField
                            area={true}
                            style={{
                                height: responsiveHeight(103),
                                textAlign: 'right',
                                width: '90%',
                                marginBottom: responsiveWidth(22)
                            }}
                            // height={responsiveHeight(103)}
                            inputStyle={{
                                marginEnd: 0
                            }}
                            name="note"
                            interSepter={interSepter}
                            placeholder={note.note}
                        />
                        // </View>

                    )
                }
            </FormContainer>
        </View>
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

export default Resume