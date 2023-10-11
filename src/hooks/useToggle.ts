import { useState } from "react";

const useFolderToggle = () => {
  const [openFolders, setOpenFolders] = useState<string[]>([]);

  const toggleOpenFolder = (id: string) => {
    if (openFolders.includes(id)) {
      setOpenFolders((prev) => prev.filter((folderId) => folderId !== id));
    } else {
      setOpenFolders((prev) => [...prev, id]);
    }
  };

  return { openFolders, toggleOpenFolder };
};

export default useFolderToggle;
