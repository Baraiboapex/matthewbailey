import {isMobile} from "react-device-detect";

export function detectDevice(){
    return {
        isMobileDevice:isMobile,
        isNotMobileDevice:!isMobile
    }
}