import React, { useContext } from "react"
import { DefectsContext } from "../providers/DefectsProvider"

const useDefects = () => useContext(DefectsContext)

export default useDefects