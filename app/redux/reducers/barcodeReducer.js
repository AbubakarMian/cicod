import { CAPTURE_BARCODE } from '../constants';
const initialState = {
    code:""
}
const barcodeReducer = (state = initialState, action) => {
console.log('redcer 111 ',action);

    switch (action.type) {

        case CAPTURE_BARCODE:

            return {
                ...state,
                code: action.value,
                
            }

            break;
           
        default:
            return state;
    }
}
export default barcodeReducer;
