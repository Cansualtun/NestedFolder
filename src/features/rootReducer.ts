import { combineReducers } from "@reduxjs/toolkit";
import fileSystemReducer from "./fileSystem/fileSystemSlice";

const rootReducer = combineReducers({
  fileSystem: fileSystemReducer,
  // Eğer diğer reducer'larınız varsa onları da burada ekleyebilirsiniz...
});

export default rootReducer;
