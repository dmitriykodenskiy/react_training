import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    search(state, action) {
      const searchPhrase = action.payload
      return searchPhrase || searchPhrase === '' ? searchPhrase : state
    }
  }
})

export const { search } = filterSlice.actions
export default filterSlice.reducer
