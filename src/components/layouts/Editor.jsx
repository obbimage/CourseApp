import { Editor } from "@tinymce/tinymce-react";
import { apiKey } from "../../static/tiny";

export default function TextEditor() {
    return (
        <Editor
            apiKey={apiKey}

            initialValue="<p>This is the initial content of the editor</p>"
            init={{
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
        />
    )
}