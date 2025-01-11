import React from "react";

import Editor from "@/components/hooks/admin/project/form/EditorProject";

export default function EditorSection({ content, onChange }) {
  return (
    <div>
      <label>Content:</label>
      <Editor value={content} onChange={onChange} />
    </div>
  );
}
