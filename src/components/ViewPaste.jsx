
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { updateToPastes, addToPastes } from "../redux/pasteSlice";

const ViewPaste = () => {
  const { id } = useParams()
  const allPastes = useSelector((state) => state.paste.pastes)
  const paste = allPastes.filter((p) => p._id === id)[0]
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 pl-5 rounded-xl m-2 w-[66%]"
          type="text"
          disabled
          placeholder="Enter title here"
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button className="p-3 rounded-xl m-2" onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button> */}
      </div>
      <div className="mt-7">
        <textarea
          className="rounded-xl mt-4 min-w-[500px] p-4"
          value={paste.content}
          disabled
          placeholder="Enter content here"
          rows={20}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ViewPaste
