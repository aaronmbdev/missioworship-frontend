import { HttpHeaders } from '@angular/common/http';

export const CONSTANTS = {
    APP_KEYNAME: 'missioworship',

    EXPECTED_STRING: {
        responseType: 'text' as const
    }
}

export const ABSOLUTES = {
    USES_APP: false,
    stayAlive: setTimeout(()=>{},0)
}