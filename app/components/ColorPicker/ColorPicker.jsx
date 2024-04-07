/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./colorPickerStyle.css";
export const ColorPicker = ({
  value,
  onChange = () => {},
  label,
  style,
  className,
}) => {
  const [color, setColor] = useState("#ffffff");
  // const [pickerPosition, setPickerPosition] = useState({ left: 0, top: 0 });

  // function createRandomString(length) {
  //   const chars =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   let result = "";
  //   for (let i = 0; i < length; i++) {
  //     result += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return result;
  // }

  const id = Math.floor(Math.random() * 9999999999);

  // useEffect(() => {
  //   const colorPick = document.querySelector(`.colorPickerLabel-${id}`);
  //   setPickerPosition({
  //     left: colorPick.getBoundingClientRect()?.left,
  //     top: colorPick.getBoundingClientRect()?.top,
  //   });
  // }, []);

  // useEffect(() => {
  //   const panel = document.querySelectorAll("#clr-picker") ;
  //   console.log(panel);
  //   // panel[0].style.zIndex = "99999999";
  //   // panel[0].style.left = "300px";
  //   // panel[0].style.top = "520px";
  //   // panel[1].style.display = "none";
  // }, []);
  useEffect(() => {
    onChange(color);
  }, [color]);

  return (
    <div>
      <style>{`
        .colorPickerWrapper .colorPickerLabel-${id} {
          ${
            value
              ? `background-color: ${value}`
              : `
          background-image: linear-gradient(
            45deg,
            #d5d8dc 25%,
            transparent 0,
            transparent 75%,
            #d5d8dc 0,
            #d5d8dc
          ),
          linear-gradient(
            45deg,
            #d5d8dc 25%,
            transparent 0,
            transparent 75%,
            #d5d8dc 0,
            #d5d8dc
          );
          background-size: 16px 16px;
          background-position: 0 0, calc(16px / 2) calc(16px / 2);
          `
          }
        }
        

      `}</style>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css"
        />
        <script src="https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js"></script>
      </Helmet>

      <div className="colorPickerMainContainer">
        {label && <label>{label}</label>}
        <div className="colorPickerWrapper">
          <label
            htmlFor={`colorPicker-${id}`}
            className={`colorPickerLabel-${id}`}
          ></label>
          <input
            style={{ visibility: "hidden", opacity: "0" }}
            type="text"
            name=""
            id={`colorPicker-${id}`}
            data-coloris
            className="coloris instance1"
            value={value}
            onInput={(e) => setColor(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
