import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function PostEditor({ value, onChange}) {
    const [content, setContent] = useState('')


    const modules = {
        toolbar: [
    
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
    
            ['bold', 'italic', 'underline', 'strike'],                                                      // toggled buttons
            ['blockquote', 'code-block'],
    
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, {'align': []}],
            [{'script': 'sub'}, {'script': 'super'}],                                                       // superscript/subscript
            [{'direction': 'rtl'}],                                                                         // text direction,
    
            [{'color': []}, {'background': []}],                                                            // dropdown with defaults from theme
    
            ['link', 'image'],
    
            ['clean']                                                                                       // remove formatting button
        ]
    }
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'ordered', 'indent',
        'link', 'image'
    ]

    
  return (
    <ReactQuill 
    value={value}
    onChange={onChange} 
    modules={modules} formats={formats}
    />  
  )
}

export default PostEditor
