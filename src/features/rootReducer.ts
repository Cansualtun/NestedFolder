import { combineReducers } from "@reduxjs/toolkit";
import fileSystemReducer from "./fileSystem/fileSystemSlice";

const rootReducer = combineReducers({
  fileSystem: fileSystemReducer,
});

export default rootReducer;
