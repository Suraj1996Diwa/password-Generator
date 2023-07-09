
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaClipboard } from "react-icons/fa";
import { useForm } from "./useForm";
import { getRandomChar, getSpecialChar } from "./utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
function App() {
  // const passordList = ["Suraj", "Suraj1", "Suraj2", "Suraj3"];
  const [passordList, setPasswordList] = useState([]);
  const [values, setValues] = useForm({
    length: 6,
    capital: true,
    small: true,
    number: false,
    symbol: false
  });
  const [result, setResult] = useState("");

  const fieldsArray = [
    {
      field: values.capital,
      getChar: () => getRandomChar(65, 90)
    },
    {
      field: values.small,
      getChar: () => getRandomChar(97, 122)
    },
    {
      field: values.number,
      getChar: () => getRandomChar(48, 57)
    },
    {
      field: values.symbol,
      getChar: () => getSpecialChar()
    }
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let generatedPassword = "";
    const checkedFields = fieldsArray.filter(({ field }) => field);

    for (let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      const letter = checkedFields[index]?.getChar();

      if (letter) {
        generatedPassword += letter;
      }
    }
    if (generatedPassword) {
      setResult(generatedPassword);
      setPasswordList([generatedPassword, ...passordList]);
      localStorage.setItem("passwords", passordList);
      localStorage.setItem("password1", result);
      console.log(passordList);
    } else {
      toast.error(" Please select at least one option");
    }
  };

  const handleClipboard = () => {
    if (result) {
      // navigator.clipboard.writeText(result);
      toast.success("Copied to your clipboard");
      localStorage.setItem("password1", result);
    } else {
      toast.error("No password to copy");
    }
  };

  return (
    <section>
      <div className="container">
        <form id="pg-form" onSubmit={handleOnSubmit}>
          <h2>Generate Password</h2>
          <div className="result">
            <input
              type="text"
              id="result"
              placeholder="Min 6 Char"
              readOnly
              value={result}
            />
            <div className="clipboard" onClick={handleClipboard}>
              <CopyToClipboard text={result}>
                <FaClipboard></FaClipboard>
              </CopyToClipboard>
            </div>
          </div>
          <div>
            <div className="field">
              <label htmlFor="length">Length</label>
              <input
                type="number"
                id="length"
                min={6}
                max={20}
                name="length"
                value={values.length}
                onChange={setValues}
              />
            </div>
            <div className="field">
              <label htmlFor="capital">Capital</label>
              <input
                type="checkbox"
                id="capital"
                name="capital"
                checked={values.capital}
                onChange={setValues}
              />
            </div>
            <div className="field">
              <label htmlFor="small">Small</label>
              <input
                type="checkbox"
                id="small"
                name="small"
                checked={values.small}
                onChange={setValues}
              />
            </div>
            <div className="field">
              <label htmlFor="number">Number</label>
              <input
                type="checkbox"
                id="number"
                name="number"
                checked={values.number}
                onChange={setValues}
              />
            </div>
            <div className="field">
              <label htmlFor="symbol">Symbol</label>
              <input
                type="checkbox"
                id="symbol"
                name="symbol"
                checked={values.symbol}
                onChange={setValues}
              />
            </div>
          </div>
          <button type="submit">Generate Password</button>
        </form>
        <div className="passwordlist">
          <ul>
            {passordList.slice(0).map((pass) => (
              <PasswordList values1={pass} handleClipboard={handleClipboard} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
function PasswordList(props) {
  const handleClipboard = () => {
    console.log(props.values1);
    if (props.values1) {
      // navigator.clipboard.writeText(props.brand);
      toast.success("Copied to your clipboard");
      localStorage.setItem("password", props.brand);
    } else {
      toast.error("No password to copy");
    }
  };
  return (
    <li>
      {props.values1}
      <div className="clipboard" onClick={handleClipboard}>
        <CopyToClipboard text={props.values1}>
          <FaClipboard></FaClipboard>
        </CopyToClipboard>
      </div>
    </li>
  );
}

export default App;
