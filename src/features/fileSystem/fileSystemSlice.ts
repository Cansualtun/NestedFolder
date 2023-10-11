import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FileSystemState {
  data: MainObject;
  isLoading: boolean;
  error: null | string;
}

const initialState: FileSystemState = {
  data: {
    id: "",
    name: "",
    clientStoreId: "",
    breadCrumb: [],
    childsCount: 0,
    docsCount: 0,
    awaitingDocsCount: 0,
    size: 0,
    isFolder: false,
    totalPages: 0,
    totalCount: 0,
    pageNumber: "1",
    countPerPage: "50",
    childs: [],
  },
  isLoading: false,
  error: null,
};
const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN;

export const fetchFileSystemData = createAsyncThunk(
  "fileSystem/fetchData",
  async () => {
    const response = await axios.get(
      "https://dmstest.hexaworks.com/viewstore?pagenumber=1&countperpage=50",
      {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFileSystemData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchFileSystemData.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
  },
});

export default fileSystemSlice.reducer;
