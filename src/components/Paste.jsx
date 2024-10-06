import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { WhatsappIcon, WhatsappShareButton, LinkedinShareButton, LinkedinIcon } from "react-share";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const shareUrl = window.location.href;
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste?.pastes || []);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className="p-5 rounded-xl min-w-[600px] mt-5"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            // Format the date here
            const formattedDate = new Intl.DateTimeFormat("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(paste.createdAt));
            return (
              <div key={paste._id} className="border-2 p-5">
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button
                    onClick={() => {
                      navigate(`/?pasteId=${paste._id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/paste/${paste._id}`);
                    }}
                  >
                    View
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  <WhatsappShareButton
                    url={shareUrl}
                    quote={"Title or jo bhi aapko likhna ho"}
                    hashtag={"#portfolio..."}
                  >
                    <WhatsappIcon size={40} round={true} />
                  </WhatsappShareButton>
                  <LinkedinShareButton
                    url={shareUrl}
                    quote={"Title or jo bhi aapko likhna ho"}
                    hashtag={"#portfolio..."}
                  >
                    <LinkedinIcon size={40} round={true} />
                  </LinkedinShareButton>
                </div>
                <div>{formattedDate}</div>
              </div>
            );
          })}
      </div>
    </div >
  );
};

export default Paste;
