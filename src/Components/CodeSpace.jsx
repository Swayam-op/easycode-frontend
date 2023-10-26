import React, { useState, useEffect } from "react";
import { Dropdown } from 'flowbite-react';
import Editor from "@monaco-editor/react";
import { HiOutlineCodeBracket } from 'react-icons/hi2'; // code icon
import { MdOutlineScience } from 'react-icons/md'; // solutions icon
import {BsFillMoonStarsFill} from 'react-icons/bs'
import { defineTheme, monacoThemes } from "../Api/CodeEditorTheme";
import { LanguageAPI } from "../Api/LanguagesAPI";
import axios from "axios";
const CodeSpace = () => {
  const [value, setValue] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState(LanguageAPI[0]);
  const [theme, setTheme] = useState({ value: "night-owl", label: "Night Owl" });
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [token,settoken] = useState("");

  const changeProgrammingLanguage = (value) => {
      setProgrammingLanguage(() => value);
    //   console.log(CE_themes);
    setCustomInput("");
    console.log(outputDetails, processing, checkStatus);
  }


  const handleEditorChange = (value, language) => {
    setValue(value);
    // onChange("code", value);
  };
  
  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  
  const handleCompile = async() => {
    setProcessing(true);
    const formData = {
      language_id: programmingLanguage.id,
      // encode source code in base64
      source_code: btoa(value),
      stdin: btoa(customInput),
    };
    console.log(formData);
    console.log(process.env.REACT_APP_RAPID_API_URL);
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data code", response);
        const token = response.data.token;
        settoken(()=>token);
        console.log(token ," is token");
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log("code error is ",error);
      });
  };
  
  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
 
      try {
        const response = await axios.request(options);
        console.log(response.data);
        console.log(atob(response.data.stdout));
      } catch (error) {
        console.error(error);
      }
  };

  useEffect(() => {
    defineTheme("night-owl").then((_) =>
      setTheme({ value: "night-owl", label: "Night Owl" })
    );
  }, []);

  return (
    <div className="w-full md:h-full h-screen">
        <div className='bg-dark-2 text-sm w-full px-3 py-1 flex md:justify-start justify-between items-center'>
                        <div className={`text-gray-400 md:pr-4 pr-2 border border-transparent border-r-gray-600 font-medium text-sm md:text-md`}><HiOutlineCodeBracket className='inline text-lg text-green-600 mx-1' /> Code</div>
                        <div className={`text-gray-400' md:px-4 px-2  border border-transparent border-r-gray-600`}><MdOutlineScience className='inline text-blue-800 mx-1 text-lg' />
                            <Dropdown label="Dropdown button" className='bg-dark-2 border-none ' dismissOnClick={true} renderTrigger={() => <button className='md:px-2 px-1 py-1 text-xs bg-black shadow-lg rounded-md text-light-1 font-medium'>{programmingLanguage.name}</button>}>
                              {
                                LanguageAPI.map(({id,name, value})=>{
                                  return (
                                    
                                <Dropdown.Item key={id} className=' text-light-1 hover:bg-black hover:teaxt-black group' onClick={() => changeProgrammingLanguage({id,name,value})} ><span className='group-hover:text-black'>{name}</span></Dropdown.Item>
                                  )
                                })
                              }
                            </Dropdown>
                        </div>
                        <div className={`text-gray-400 px-4 border border-transparent border-r-gray-600 justify-self-end`}><BsFillMoonStarsFill className='inline text-yellow-500 mx-1 text-md ' />
                            <Dropdown label="Dropdown button" className='bg-dark-2 border-none ' dismissOnClick={true} renderTrigger={() => <button className='px-2 py-1 text-xs bg-black shadow-lg rounded-md text-light-1 font-medium'>{theme.label}</button>}>
                            {Object.entries(monacoThemes).map(([themeId, themeName]) => {
                                return(
                            <Dropdown.Item onClick={()=>handleThemeChange({value:themeId, label: themeName})} key={themeId} value={themeId}  className=' text-light-1 hover:bg-black hover:teaxt-black group' ><span className='group-hover:text-black'>{themeName}</span></Dropdown.Item>

                                )
                            })}



                            </Dropdown>
                        </div>
                        <button onClick={handleCompile} className="px-5 py-2 bg-dark-2 text-light-1">Run code</button>

                    </div>
                    <div className="overlay rounded-md h-90/100  w-full shadow-4xl">
      <Editor
        height="100%"
        width={`100%`}
        language={programmingLanguage.value}
        value={value}
        theme={theme.value}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
    </div>
    
  );
};
export default CodeSpace;