import { Editor } from "@tinymce/tinymce-react";
import { apiKey } from "../../static/tiny";

export default function TextEditor({ initialValue,onChange }) {
    const handleOnchange = (value) => {
        if (onChange) {
            onChange(value);
        }
    }

    return (
        <Editor
            apiKey={apiKey}
            onEditorChange={handleOnchange}
            initialValue={initialValue}
            init={{
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
        />
    );
}