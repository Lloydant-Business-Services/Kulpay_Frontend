import React from 'react';
import vector from "../../assets/images/kp.png"
import logo from "../../assets/images/17.png";

import { QRCode } from 'antd';
const App = ({urlProps}) => (
  <>
  <QRCode
    errorLevel="Q"
    style={{
      marginBottom: 16,
    }}
    value={urlProps}
    iconSize={26}

    icon={vector}
  />
  {/* <QRCode
        style={{
          marginBottom: 16,
        }}
        errorLevel={"Q"}
        value="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      /> */}
  </>
);
export default App;