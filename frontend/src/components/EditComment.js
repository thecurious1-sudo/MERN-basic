import useHttp from "../hooks/use-http";
import { useEffect, useState } from "react";
function EditComment(props) {
  const http2 = useHttp();
  useEffect(() => {
    http2.setError(null);
  }, [props.dependency]);
  const [comment, setComment] = useState(null);
  const [id, setId] = useState(null);
  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };
  const idChangeHandler = (e) => {
    setId(e.target.value);
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await http2.patch({
      url: "http://localhost:300/comments/" + id,
      body: { comment: comment },
    });
  };
  useEffect(() => {
    props.fetchComments();
  }, [http2.data]);
  return (
    <div>
      <h1>Form to edit comment:</h1>
      <form onSubmit={formSubmitHandler}>
        Enter ID to edit
        <input onChange={idChangeHandler} name="id" type="text" />
        Enter new comment
        <input onChange={commentChangeHandler} name="comment" type="text" />
        <br></br>
        <button>Submit</button>
      </form>
      {http2.loading && <p>Loading...</p>}
      {http2.error && <p>{http2.error}</p>}
    </div>
  );
}

export default EditComment;
