'use strict';
import { Toast } from 'mint-ui';

var Base = {
  showToast: function(msg){
    Toast({
      message: msg,
      position: 'bottom',
      duration: 3000
    });
  }

}

export default Base;
