import { useNavigate } from "react-router-dom";
import { Upload } from "../types/data";
import { memo, useMemo, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import DeleteModal from "./DeleteChatModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IoPerson } from "react-icons/io5";
import { setIsTestrisModal, setIsTirexModal, updateIsChatCommunity } from "../redux/slices/widgetSlice";
import snakeGif from "../assets/solver_hamilton.gif";
import playToEarn from "../assets/icons/play2earn.png";
const SideBar = ({
  files,
  setFileSeletedDelete,
  handleCancelSubscription,
  selectedFileId,
  setSelectedFileId,
}: {
  files?: Upload[] | null;
  setFileSeletedDelete?: any;
  handleCancelSubscription?: any;
  setSelectedFileId?: any;
  selectedFileId?: string | null;
}) => {
  const token = useAppSelector((state) => {
    return state.auth.token;
  });
  const isChatCommunity = useAppSelector((state) => state.widget.isChatCommunity);
  const navigate = useNavigate();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categorizedFiles = useMemo(() => {
    if (!files) return null;
    interface CategorizedFiles {
      today: Upload[];
      yesterday: Upload[];
      lastWeek: Upload[];
      lastMonth: Upload[];
      lastYear: Upload[];
      older: Upload[];
      unknown: Upload[];
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setDate(lastMonth.getDate() - 30);
    const lastYear = new Date(today);
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    return files.reduce<CategorizedFiles>(
      (acc, file) => {
        const createdAt = file.createdAt ? new Date(file.createdAt) : null;

        if (!createdAt) {
          acc.unknown.push(file);
        } else if (createdAt >= today) {
          acc.today.push(file);
        } else if (createdAt >= yesterday) {
          acc.yesterday.push(file);
        } else if (createdAt >= lastWeek) {
          acc.lastWeek.push(file);
        } else if (createdAt >= lastMonth) {
          acc.lastMonth.push(file);
        } else if (createdAt >= lastYear) {
          acc.lastYear.push(file);
        } else {
          acc.older.push(file);
        }

        return acc;
      },
      {
        today: [],
        yesterday: [],
        lastWeek: [],
        lastMonth: [],
        lastYear: [],
        older: [],
        unknown: [],
      }
    );
  }, [files]);
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev: any): any => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
    setSelectedFileId(null);
  };
  const [isGame, setIsGame] = useState(false);

  const renderCategory = (title: string, categoryFiles: Upload[]) => {
    if (categoryFiles.length === 0) return null;

    return (
      <li key={title} className="mb-4">
        <button
          onClick={() => toggleCategory(title)}
          className="flex justify-between items-center w-full px-3 py-2 bg-[#333] rounded-full"
        >
          <span>
            {title} ({categoryFiles.length})
          </span>
          <ChevronRightIcon
            className={`h-5 w-5 transform transition-transform ${expandedCategories.has(title) ? "rotate-90" : ""
              }`}
          />
        </button>
        {expandedCategories.has(title) && (
          <ul className="mt-2 ml-4 space-y-2">
            {categoryFiles.map((file) => (
              <li className="" key={file._id}>
                <button
                  onClick={() => setSelectedFileId(file._id)}
                  className={`flex justify-between items-center w-full p-2 rounded-md transition-colors duration-200 ${selectedFileId === file._id
                    ? "bg-primary text-white bg-opacity-80"
                    : "hover:bg-gray-700 bg-[#333]"
                    }`}
                >
                  <span>{file.name}</span>
                  <div className="flex items-center">
                    <DeleteModal
                      fileId={file._id}
                      setFileSeletedDelete={setFileSeletedDelete}
                      open={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                      onConfirm={handleCancelSubscription}
                    />
                    <ChevronRightIcon className="h-5 w-5" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };
  const dispatch = useAppDispatch();
  const onClickHalo = () => {
    dispatch(updateIsChatCommunity({ isChatCommunity: true }));
  };
  const onClickTetris = () => {
    dispatch(setIsTestrisModal({ isTetrisModal: true }));
  };

  const totalUnreadMessage = useAppSelector((state) => state.widget.totalUnreadMessage);
  const isBotRunning = useAppSelector((state) => state.mine.mine?.bot_running);

  const loadIframe = () => {
    dispatch(setIsTirexModal({ isTirexModal: true }));

  };



  const onClickFlappy = () => {
    window.open("https://ashu05g.github.io/FlappyBird_Game/game.html", "popup", "width=1200,height=800");
  };
  return (
    <div
      id="sideBar"
      className="fixed h-screen top-0 pt-24 pl-[3vw] flex flex-col justify-between"
    >
      <div className="flex-grow">
        <ul className="flex flex-col space-y-2">
          <li
            onClick={() => {
              navigate("/");
            }}
            className={`cursor-pointer py-2 rounded-full flex px-2 space-x-2 ${window.location.pathname === "/" ? "bg-[#333333]" : ""
              }`}
          >
            <img
              src="/icons/generic.svg"
              className="mr-2 w-6 h-6"
              alt="Generic"
            />{" "}
            Generic
          </li>
          {files ? (
            <li className="cursor-pointer">
              <div
                onClick={() => toggleCategory("Personal")}
                className={`py-2 rounded-full flex justify-between px-2 space-x-2 ${window.location.pathname === "/loaddata" ? "bg-[#333333]" : ""
                  }`}
              >
                <div className="flex items-center">
                  <img
                    src="/icons/personal.svg"
                    className="mr-2 w-6"
                    alt="Personal"
                  />
                  Personal
                </div>
                <ChevronRightIcon
                  className={`h-5 w-5 transform transition-transform ${expandedCategories.has("Personal") ? "rotate-90" : ""
                    }`}
                />
              </div>
              {expandedCategories.has("Personal") && categorizedFiles && (
                <ul className="mt-2 ml-3 space-y-2 w-full">
                  {renderCategory("Today", categorizedFiles.today)}
                  {renderCategory("Yesterday", categorizedFiles.yesterday)}
                  {renderCategory("Last 7 days", categorizedFiles.lastWeek)}
                  {renderCategory("Last 30 days", categorizedFiles.lastMonth)}
                  {renderCategory("Last Year", categorizedFiles.lastYear)}
                  {renderCategory("Older", categorizedFiles.older)}
                  {renderCategory("Unknown date", categorizedFiles.unknown)}
                </ul>
              )}
            </li>
          ) : (
            <li
              onClick={() => {
                navigate("/loaddata");
              }}
              className={`cursor-pointer py-2 rounded-full flex px-2 space-x-2 ${window.location.pathname === "/loaddata" ? "bg-[#333333]" : ""
                }`}
            >
              <img
                src="/icons/personal.svg"
                className="mr-2 w-6"
                alt="Personal"
              />{" "}
              Personal
            </li>
          )}
          <li
            onClick={() => {
              navigate("/mine");
            }}
            className={`cursor-pointer py-2 rounded-full flex px-2 space-x-2 ${window.location.pathname === "/mine" ? "bg-[#333333]" : ""
              }`}
          >
            <img src="/icons/purplesaint.svg" className="mr-2 w-6" alt="Mine" />{" "}
            Mine
          </li>
          <li
            onClick={() => {
              onClickHalo();
            }}
            className={`cursor-pointer `}
          >
            <div className={`indicator rounded-full ${isChatCommunity === true ? "bg-[#333333]  px-2" : "ml-[-10px]"} `}>
              {(totalUnreadMessage ?? 0) > 0 && (
                <span className="indicator-item badge badge-secondary">{totalUnreadMessage}+</span>
              )}

              <div className="btn flex items-center bg-transparent border-none">
                <img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-and-lines-1/2/11-512.png" className="w-6" alt="Mine" />{" "}
                <label htmlFor="" className="text-md">Halo</label>
              </div>
            </div>
          </li>
          <li className="cursor-pointer">
            <div
              onClick={() => setIsGame(!isGame)}
              className={`py-2 rounded-full flex justify-between px-2 space-x-2 ${isGame === true ? "bg-[#333333]" : ""
                }`}
            >
              <div className="flex items-center">
                <img
                  src={playToEarn}
                  className="mr-2 w-6 bg-white rounded-full"
                  alt="Play To Earn"
                />
                Play 2 Earn
              </div>
              <ChevronRightIcon
                className={`h-5 w-5 transform transition-transform ${isGame ? "rotate-90" : ""
                  }`}
              />
            </div>
            {isGame && (
              <ul className="mt-2 ml-4 space-y-2 w-full">
                <li className="bg-[#333333] py-1 rounded-md px-2" onClick={() => onClickTetris()}>Centipede</li>
                <li className="bg-[#333333] py-1 rounded-md px-2" onClick={() => onClickFlappy()}>Flappy</li>
                <li className="bg-[#333333] py-1 rounded-md px-2" onClick={() => loadIframe()}>Tirex</li>
            </ul>
            )}
          </li>
        </ul>
      </div>
      {isBotRunning && (
        <div className="bg-black  flex-col flex items-center justify-center w-32 flex-grow">
          <div className="border border-grey p-1 rounded-lg">
            <img src={snakeGif} />
          </div>
        </div>
      )}
      {token && (
        <div className="mt-auto pb-4">

          <button
            onClick={() => {
              navigate("/profile");
            }}
            className="text-center w-full p-2 rounded-full bg-[#333333] flex items-center justify-center"
          >
            <IoPerson className="h-4 inline-block mr-2" />
            Profile
          </button>
        </div>
      )}

    </div>
  );
};

export default memo(SideBar);
