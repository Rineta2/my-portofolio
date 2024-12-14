import React from 'react';

import ReactQuill from 'react-quill-new';

import 'react-quill-new/dist/quill.snow.css';

const Editor = ({ value, onChange }) => {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false
        }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'code-block',
        'list', 'indent',
        'script',
        'direction',
        'color', 'background',
        'font',
        'align',
        'link', 'image', 'video'
    ];

    return (
        <div className="editor-container">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                style={{
                    height: '400px',
                    marginBottom: '50px'
                }}
            />
            <style jsx>{`
                .editor-container {
                    margin-bottom: 2rem;
                }
                :global(.ql-container) {
                    min-height: 300px;
                    font-size: 16px;
                    font-family: inherit;
                }
                :global(.ql-editor) {
                    min-height: 300px;
                    padding: 1rem;
                }
                :global(.ql-toolbar) {
                    background: #f8f9fa;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;
                    border: 1px solid #ddd;
                }
                :global(.ql-container) {
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                    border: 1px solid #ddd;
                    border-top: none;
                }
            `}</style>
        </div>
    );
};

export default Editor;