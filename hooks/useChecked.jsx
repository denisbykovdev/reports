import React, { useContext } from 'react'
import { CheckedContext } from '../providers/CheckedProvider'

const useChecked = () => useContext(CheckedContext)

export default useChecked
