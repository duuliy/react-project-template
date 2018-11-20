import './style.less';
import { Button } from 'antd';
import imgsrc from '@v/images/icon.png'

export default function() {
  return (
    <div className={"normal"}>
      <div className={"welcome"} />
      <ul className={"list"}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li><a href="https://umijs.org/guide/getting-started.html">Getting Started</a></li>
        <Button type="primary">Primary</Button> 
        <div className={"ppp"}>
          <span>555</span>
        </div>
        <img alt="logo" src={imgsrc}/> 
      </ul>
    </div>
  );
}
