import React, { useEffect, useState } from "react";
import { fetchFileSystemData } from "../../features/fileSystem/fileSystemSlice";
import Loading from "../Loading";
import FolderListComponent from "./FolderList";
import { useAppDispatch, useAppSelector } from "../../hooks";

const FileSystem: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: any) => state.fileSystem.isLoading);
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
  // Fetches the initial data for the file system.
  // Fetches data for the file system based on page number and items per page.
  const fetchData = async (pageNumber: number, countPerPage: number) => {
    const data = await dispatch(
      fetchFileSystemData({
        pageNumber,
        countPerPage,
      })
    );
    return data.payload;
  };
  // Handles the click event on a folder. If it's a folder, fetches its data.
  const handleFolderClick = async (id: string, isFolder: boolean) => {
    if (!isFolder) return;

    const data = await dispatch(fetchFileSystemData({ id }));
    if (data.payload) {
      setFolders(updateChildFolders(folders, id, data.payload.childs));
      toggleOpenFolder(id);
    }
  };
  // Updates the child folders of a given folder with new child data.
  const updateChildFolders = (
    folders: any[],
    id: string,
    newChilds: any[]
  ): any[] => {
    return folders.map((folder: any) => {
      if (folder.id === id) {
        return {
          ...folder,
          childs: newChilds,
        };
      } else if (folder.childs) {
        return {
          ...folder,
          childs: updateChildFolders(folder.childs, id, newChilds),
        };
      } else {
        return folder;
      }
    });
  };
  // Handles the load more action to fetch more items for the file system.
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;

    const data = await fetchData(nextPage, 2);
    if (data) {
      setFolders((prevFolders) => [...prevFolders, ...data.childs]);
      setCurrentPage(nextPage);
    }
  };
  // Toggles the open state of a folder.
  const toggleOpenFolder = (id: string) => {
    setOpenFolders((prev) =>
      prev.includes(id)
        ? prev.filter((folderId) => folderId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="m-[100px] flex flex-col items-center justify-center h-full">
      <h1 className="mb-10 text-lg font-semibold">Folder Project</h1>
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
