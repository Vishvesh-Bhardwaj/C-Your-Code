export const submitCode = async (formData) => {
  try {
    const fileName = "formData.txt"; // filename for the text file
    const fileContents = JSON.stringify(formData); // convert form data to JSON string
    const blob = new Blob([fileContents], { type: "text/plain" }); // create a Blob object with file contents

    // create a temporary URL for the Blob object
    const url = window.URL.createObjectURL(blob);

    // create a link element and set its properties
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // simulate a click on the link to initiate download
    link.click();

    // clean up the temporary URL object
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (err) {
    return { success: false, err };
  }
};


