

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import LanguageDropdown from "../Dropdowns/LanguageDropdown";
import ThemeDropdown from "../Dropdowns/ThemeDropdown";
import {LANGUAGES} from "../../constants/languages"


const Navbar = ({
  language,
  setLanguage,
  setTheme,
  theme,
  setOutput,
  setStatus,
  testInput,
  code,
}) => {
	const handleSubmit = async () => 
  {
    setStatus("Running");
    //find the language id of the selected language from the Language dropdown and store it as a variable
    var languageProp = LANGUAGES.find(({value}) => value === language.value);
    //print the language id in the console
    console.log(JSON.stringify(languageProp.id));
    // create a new file and write the code as its content
    const formData = new Blob([code], { type: "text/plain" });
    const fileUrl = URL.createObjectURL(formData);
  
    // create an anchor tag to download the file in the current view of language dropdown
    const downloadLink = document.createElement("a");
    downloadLink.download = "code.c";
    downloadLink.href = fileUrl;
    document.body.appendChild(downloadLink); // append to DOM to trigger download
    downloadLink.click();
    //wait for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    // make a POST request to the API endpoint
    const response = await fetch("http://localhost:3001/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language_id: languageProp.id,
    }),
  });
  
    // set the output from the response
    const data = await response.json();
    setOutput(data.output);
  };
  

  return (
    <div className="grid grid-cols-2 m-2">
      <button
        onClick={handleSubmit}
        className="bg-[#5cb85c] border-[#4cae4c] border-1 text-white rounded-full w-32 text-sm md:text-base hover:border-[#398439] hover:bg-[#449d44] "
      >
        <FontAwesomeIcon
          icon={faPlayCircle}
          className="mr-2"
          color="white"
          size="sm"
        />
        <span>Run Code</span>
      </button>
      <div className="grid  grid-cols-2 gap-2">
        <LanguageDropdown language={language} setLanguage={setLanguage} />
        <ThemeDropdown theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
};

export default Navbar;
