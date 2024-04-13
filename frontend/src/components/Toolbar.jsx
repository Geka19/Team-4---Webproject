function Toolbar() {
  return (
    <div class="toolbar" id="toolbar">
      <button onclick="changeTextColor('red')">Color</button>
      <button onclick="toggleBold()">Bold</button>
      <button onclick="toggleItalic()">Italic</button>
      <button onclick="toggleUnderline()">Underline</button>
    </div>
  );
}

export default Toolbar;
