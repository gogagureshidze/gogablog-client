import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "color",
  "background",
  "align",
  "list",
  "bullet",
  "link",
  "image",
];

function Editor({ value, onChange }) {
  
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("ResizeObserver loop completed")
      ) {
        return; // suppress the ResizeObserver warning
      }
      originalError(...args); // keep all other errors
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <div className="editor" style={{ width: "100%",  }}>
      <ReactQuill
        value={value}
        onChange={onChange}
        className="editor-quill"
        modules={modules}
        formats={formats}
        style={{
          minHeight: "200px",
          paddingTop: "20px",
          lineHeight: "1.5",
          height: "auto",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
        }}
      />
    </div>
  );
}


export default Editor;
