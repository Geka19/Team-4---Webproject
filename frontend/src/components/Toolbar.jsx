import React, { useState, useRef } from "react";

function Toolbar() {
  const [selectedText, setSelectedText] = useState(null);
  const textAreaRef = useRef(null);

  const applyFormatting = (format) => {
    if (!selectedText) return;

    const textArea = textAreaRef.current;
    const { start, end } = selectedText;
    const text = textArea.value;

    const newText =
      text.slice(0, start) +
      `<${format}>` +
      text.slice(start, end) +
      `</${format}>` +
      text.slice(end);

    textArea.value = newText;
    // Update selection after formatting
    textArea.setSelectionRange(start, end + (format.length + 5)); // Adjust selection for added tags
    textArea.focus();
  };

  const handleSelection = () => {
    const textArea = textAreaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    if (start !== end) {
      setSelectedText({ start, end });
    } else {
      setSelectedText(null);
    }
  };

  return (
    <div className="toolbar" id="toolbar">
      <button onClick={() => applyFormatting("strong")}>Bold</button>
      <button onClick={() => applyFormatting("em")}>Italic</button>
      <button onClick={() => applyFormatting("u")}>Underline</button>
      <input type="file" id="imgUpload" accept="image/*" />
      <label htmlFor="imgUpload">&#128247;</label>
      <textarea
        ref={textAreaRef}
        id="noteInput"
        placeholder="Start typing here..."
        onMouseUp={handleSelection}
      />
    </div>
  );
}

export default Toolbar;
