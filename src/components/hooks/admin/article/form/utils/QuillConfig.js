export const modules = {
    toolbar: [
        // Header Formatting
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        // Font Styling
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],

        // Text Alignment
        [{ 'align': [] }],

        // Lists and Indentation
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],

        // Quotes and Script
        ['blockquote', 'code-block'],
        [{ 'script': 'sub' }, { 'script': 'super' }],

        // Media and Links
        ['link', 'image', 'video'],

        // Clear Formatting
        ['clean']
    ],
    clipboard: {
        matchVisual: false // Prevents unwanted HTML paste formatting
    }
};

export const formats = [
    // Headers
    'header',

    // Font
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'font', 'size',

    // Formatting
    'align',
    'list', 'indent',
    'blockquote', 'code-block',
    'script',

    // Media
    'link', 'image', 'video'
];