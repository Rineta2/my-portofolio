import React from "react";
import dynamic from "next/dynamic";
import {
  modules,
  formats,
} from "@/components/hooks/admin/article/form/utils/QuillConfig";
import styles from "@/app/admins/layout.module.scss";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
import "react-quill-new/dist/quill.snow.css";

export default function ArticleEditor({ content, onChange }) {
  return (
    <div className={styles.form__content}>
      <label>Content</label>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
