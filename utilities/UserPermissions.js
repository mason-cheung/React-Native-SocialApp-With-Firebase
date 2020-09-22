import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import { beginAsyncEvent } from 'react-native/Libraries/Performance/Systrace'

class UserPermissions {
    getCameraPermission = async() => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status != 'granted'){
                alert.apply('We need permission to use your camera roll')
            }
        }else if (Constants.platform.android) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status != 'granted'){
                alert.apply('We need permission to use your camera roll')
            }
        }
    }
}

export default new UserPermissions();