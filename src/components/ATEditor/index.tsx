import React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// draft-js
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Custom styles for the ATEditor
import ATEditorRoot from "components/ATEditor/ATEditorRoot";

// ALDR Tech Dashboard context
import { useDarkMode } from "state/hooks";

function ATEditor({ value }: any) {
  const [darkMode] = useDarkMode();

  const [convertedContent, setConvertedContent] = React.useState(null);
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  React.useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  return (
    <ATEditorRoot ownerState={{ darkMode }}>
      {value && typeof value === "function" && value(convertedContent)}
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
    </ATEditorRoot>
  );
}

// Setting default values for the props of ATEditor
ATEditor.defaultProps = {
  value: () => {},
};

// Typechecking props for the ATEditor
ATEditor.propTypes = {
  value: PropTypes.func,
};

export default ATEditor;
