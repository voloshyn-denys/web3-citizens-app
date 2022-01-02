import { combineReducers } from "redux";

import citizens from "./citizens";
import application from "./application";

export default combineReducers({ citizens, application });
