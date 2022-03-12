import { createSlice } from '@reduxjs/toolkit';

// 1 - SLICE INITIAL
const slice = createSlice({
  name: 'cat_list',
  initialState: {
    loading: false,
    success: false,
    error: false,
    data: [],
    load_more: false,
    list_data: []
  },
  reducers: {
    rCatList: (state, _action) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.data = [];
      state.load_more = false;
      state.list_data = [];
    },
    rCatListSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.data = action.payload;
      state.load_more = false;
    },
    rCatListError: (state, _action) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.data = [];
      state.load_more = false;
      state.list_data = [];
    },
    rChangeLoadMore: (state, action) => {
      state.load_more = action.payload
    },
    rChangeListData: (state, action) => {
      state.list_data = action.payload
    }
  },
});
// 2 - SLICE EXPORT
export default slice.reducer;

// 3 - GET SLICE ACTION
export const {
  rCatList,
  rCatListSuccess,
  rCatListError,
  rChangeLoadMore,
  rChangeListData
} = slice.actions;
