import React from "react";

// function changeTextColor(color) {
//   applyTextSetting("foreColor", color);
//   focusTextarea(); // Set focus back to textarea
// }

// function toggleBold() {
//   applyTextSetting("bold", null);
//   focusTextarea(); // Set focus back to textarea
// }
// function toggleItalic() {
//   applyTextSetting("italic", null);
//   focusTextarea(); // Set focus back to textarea
// }
// function toggleUnderline() {
//   applyTextSetting("underline", null);
//   focusTextarea(); // Set focus back to textarea
// }

function Toolbar() {
  return (
    <div className="toolbar" id="toolbar">
      <button>Color</button>
      <button>Bold</button>
      <button>Italic</button>
      <button>Underline</button>
      <input
        type="file"
        id="imgUpload"
        accept="image/*"
        // onChange={insertImage}
      />
      <label htmlFor="imgUpload">&#128247;</label>
    </div>
  );
}

export default Toolbar;
