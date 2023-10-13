import React from "react";
import FolderItem from "../Folder";

const FolderListComponent: React.FC<{
  folders: any[];
  openFolders: string[];
  totalCount: number;
  handleFolderClick: (id: string, isFolder: boolean) => void;
  handleLoadMore: () => void;
}> = ({
  folders,
  openFolders,
  totalCount,
  handleFolderClick,
  handleLoadMore,
}) => (
  <>
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
    {folders.length < totalCount && (
      <button
        className="w-full text-white bg-primary-button hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        onClick={handleLoadMore}
      >
        Load More
      </button>
    )}
  </>
);

export default FolderListComponent;
