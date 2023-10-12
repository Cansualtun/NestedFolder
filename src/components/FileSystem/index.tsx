import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFileSystemData } from "../../features/fileSystem/fileSystemSlice";
import Loading from "../Loading";
import FolderListComponent from "./FolderList";

const FileSystem: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.fileSystem.isLoading);
  const [folders, setFolders] = useState<any[]>([]);
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const initialItemsPerPage = 2;

  useEffect(() => {
    fetchInitialData();
  }, [dispatch]);

  const fetchInitialData = async () => {
    const data = await fetchData(1, initialItemsPerPage);
    if (data) {
      setFolders(data.childs);
      setTotalCount(data.totalCount);
    }
  };

  const fetchData = async (pageNumber: number, countPerPage: number) => {
    const data = await dispatch(
      fetchFileSystemData({
        pageNumber,
        countPerPage,
      })
    );
    return data.payload;
  };

  const handleFolderClick = async (id: string, isFolder: boolean) => {
    if (!isFolder) return;

    const data = await dispatch(fetchFileSystemData({ id }));
    if (data.payload) {
      setFolders(updateChildFolders(folders, id, data.payload.childs));
      toggleOpenFolder(id);
    }
  };

  const updateChildFolders = (folders: any[], id: string, newChilds: any[]) => {
    return folders.map((folder: any) => {
      if (folder.id === id) {
        return {
          ...folder,
          childs: newChilds,
        };
      }
      if (folder.childs) {
        return {
          ...folder,
          childs: updateChildFolders(folder.childs, id, newChilds),
        };
      }
      return folder;
    });
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;

    const data = await fetchData(nextPage, 2);
    if (data) {
      setFolders((prevFolders) => [...prevFolders, ...data.childs]);
      setCurrentPage(nextPage);
    }
  };

  const toggleOpenFolder = (id: string) => {
    setOpenFolders((prev) =>
      prev.includes(id)
        ? prev.filter((folderId) => folderId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="m-[100px]">
      <h1 className="flex items-center justify-center mb-10 text-lg font-semibold">
        Folder Project
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <FolderListComponent
          folders={folders}
          openFolders={openFolders}
          totalCount={totalCount}
          handleFolderClick={handleFolderClick}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default FileSystem;
