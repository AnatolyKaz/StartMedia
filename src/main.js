import 'regenerator-runtime/runtime'
import { appStart } from "./app"
import { getAppElement } from "./utils";

const $app = getAppElement()

appStart($app)