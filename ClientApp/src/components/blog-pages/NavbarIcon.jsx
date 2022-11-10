import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";

import React from "react";

export default function NavbarIcon() {
  return (
    <>
      <div className="container" onclick="myFunction(this)">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </>
  );
}
