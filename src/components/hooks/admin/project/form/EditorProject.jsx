import React from 'react';

import ReactQuill from 'react-quill-new';

import 'react-quill-new/dist/quill.snow.css';

import styles from '@/app/admins/layout.module.scss';

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
        <div className={styles.editorContainer}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                className={styles.editor}
            />
        </div>
    );
};

export default Editor;