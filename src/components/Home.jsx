import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updateToPastes, addToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch()
  const allPastes = useSelector((state) => state.paste.pastes)

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId)
      setTitle(paste.title)
      setValue(paste.content)
    }
  }, [pasteId])

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString()
    }
    // console.log(paste)
    if (pasteId) {
      // update
      dispatch(updateToPastes(paste))
    }
    else {
      // create
      dispatch(addToPastes(paste))
    }
    // after creation or updation
    setTitle('')
    setValue('')
    setSearchParams({})
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 pl-5 rounded-xl m-2 w-[66%]"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="p-3 rounded-xl m-2" onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-7">
        <textarea
          className="rounded-xl mt-4 min-w-[500px] p-4"
          value={value}
          placeholder="Enter content here"
          rows={20}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
