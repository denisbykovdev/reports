import React, { useContext } from 'react'
import { TypeContext } from '../providers/TypeProvider'

const useType = () => useContext(TypeContext)

export default useType