import { useEffect, useState } from "react";
import "./App.css";
import NewComment from "./components/NewComment";
import EditComment from "./components/EditComment";
import useHttp from "./hooks/use-http";
import DeleteComment from "./components/DeleteComment";

function App() {
  const http = useHttp();

  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    http.get({ url: "http://localhost:300/comments" });
  };
  useEffect(() => {
    fetchComments();
  }, []);
  useEffect(() => {
    if (http.data) {
      setComments(http.data.comments);
    }
  }, [http.data]);

  return (
    <>
      <NewComment fetchComments={fetchComments} />
      <EditComment dependency={http.data} fetchComments={fetchComments} />
      <DeleteComment dependency={http.data} fetchComments={fetchComments} />
      {comments.map((comment, index) => {
        return (
          <p key={index}>
            {index} {"=>"} {comment}
          </p>
        );
      })}
    </>
  );
}

export default App;
