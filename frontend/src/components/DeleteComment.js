import useHttp from "../hooks/use-http";
import { useEffect, useState } from "react";
function DeleteComment(props) {
  const http2 = useHttp();
  useEffect(() => {
    http2.setError(null);
  }, [props.dependency]);

  const [id, setId] = useState(null);
  const idChangeHandler = (e) => {
    setId(e.target.value);
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await http2.del({
      url: "http://localhost:300/comments/" + id,
    });
  };
  useEffect(() => {
    props.fetchComments();
  }, [http2.data]);
  return (
    <div>
      <h1>Form to Delete comment:</h1>
      <form onSubmit={formSubmitHandler}>
        Enter ID to delete
        <input onChange={idChangeHandler} name="id" type="text" />
        <br></br>
        <button>Submit</button>
      </form>
      {http2.loading && <p>Loading...</p>}
      {http2.error && <p>{http2.error}</p>}
    </div>
  );
}

export default DeleteComment;
