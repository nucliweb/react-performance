import {useReducer} from 'react'

const useForceRerender = () => useReducer(x => x + 1, 0)[1]

export default useForceRerender