import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFileSystemData } from "../../features/fileSystem/fileSystemSlice";
import Loading from "../Loading";
import FolderItem from "./Folder";

const FileSystem: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.fileSystem.isLoading);
  const [folders, setFolders] = useState<any[]>([]);
  const [openFolders, setOpenFolders] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(fetchFileSystemData());
      if (data.payload) {
        setFolders(data.payload.childs);
      }
    }
    fetchData();
  }, [dispatch]);

  const handleFolderClick = async (id: string, isFolder: boolean) => {
    if (!isFolder) return;

    const data = await dispatch(fetchFileSystemData(id));
    if (data.payload) {
      const updateChilds = (folders: any) => {
        return folders.map((folder: any) => {
          if (folder.id === id) {
            return {
              ...folder,
              childs: data.payload.childs,
            };
          }
          if (folder.childs) {
            return {
              ...folder,
              childs: updateChilds(folder.childs),
            };
          }
          return folder;
        });
      };

      setFolders(updateChilds(folders));
      toggleOpenFolder(id);
    }
  };

  const toggleOpenFolder = (id: string) => {
    if (openFolders.includes(id)) {
      setOpenFolders((prev) => prev.filter((folderId) => folderId !== id));
    } else {
      setOpenFolders((prev) => [...prev, id]);
    }
  };

  return (
    <div className="m-[100px]">
      <h1 className="flex items-center justify-center mb-10 text-lg font-semibold">
        Folder Project
      </h1>
      {isLoading && <Loading />}
      <ul>
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            folder={folder}
            handleFolderClick={handleFolderClick}
            openFolders={openFolders}
          />
        ))}
      </ul>
    </div>
  );
};

export default FileSystem;
