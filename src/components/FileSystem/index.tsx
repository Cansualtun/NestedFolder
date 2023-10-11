import React, { useEffect, useState } from "react";
import { fetchFileSystemData } from "../../features/fileSystem/fileSystemSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import Loading from "../Loading";

const FileSystem: React.FC = () => {
  const dispatch = useDispatch();
  const fileSystemData = useSelector((state: any) => state.fileSystem.data);
  const isLoading = useSelector((state: any) => state.fileSystem.isLoading);

  const [shownPortfoliosForChild, setShownPortfoliosForChild] = useState<
    string | null
  >(null);
  const [mainFolderOpen, setMainFolderOpen] = useState(false); // Ana klasörün açılıp kapanmasını kontrol eder

  useEffect(() => {
    dispatch(fetchFileSystemData());
  }, []);

  const items = fileSystemData?.childs || [];

  return (
    <div className="m-[100px]">
      <h1 className="flex items-center justify-center mb-10 text-lg font-semibold">
        Folder Project
      </h1>
      {isLoading && <Loading />}
      <ul>
        <li>
          <button onClick={() => setMainFolderOpen(!mainFolderOpen)}>
            {mainFolderOpen ? <AiFillFolderOpen /> : <AiFillFolder />}
          </button>
          {fileSystemData.name}
          {mainFolderOpen && (
            <ul>
              {items.map((item: any) => (
                <li key={item.id}>
                  <button
                    onClick={() =>
                      setShownPortfoliosForChild(
                        shownPortfoliosForChild === item.id ? null : item.id
                      )
                    }
                  >
                    {shownPortfoliosForChild === item.id ? (
                      <AiFillFolderOpen />
                    ) : (
                      <AiFillFolder />
                    )}
                  </button>
                  {item.name}
                  {shownPortfoliosForChild === item.id && item.portfolios && (
                    <ul>
                      {item.portfolios.map((portfolio: any) => (
                        <li key={portfolio.id}>{portfolio.name}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default FileSystem;
