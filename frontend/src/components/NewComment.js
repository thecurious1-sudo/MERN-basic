import useHttp from "../hooks/use-http";
import { useEffect, useState } from "react";
function NewComment(props) {
  const http2 = useHttp();
  const [comment, setComment] = useState("");
  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await http2.post({
      url: "http://localhost:300/comments/new",
      body: { comment: comment },
    });
    props.fetchComments();
  };
  return (
    <div>
      <h1>Form to add comment:</h1>
      <form onSubmit={formSubmitHandler}>
        Enter comment to add
        <input onChange={commentChangeHandler} name="comment" type="text" />
        <br></br>
        <button>Submit</button>
      </form>
      {http2.loading && <p>Loading...</p>}
    </div>
  );
}

export default NewComment;
