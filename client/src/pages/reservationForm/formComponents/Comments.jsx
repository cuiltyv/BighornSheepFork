import "tailwindcss/tailwind.css";

function Comments({ comment, setComment }) {
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="mt-10">
      <h2 className="mb-2 text-xl font-bold">Comentarios adicionales</h2>
      <textarea
        placeholder="Comentario"
        value={comment}
        onChange={handleCommentChange}
        className="w-full resize-none rounded border border-gray-300 p-2 shadow-lg"
        rows={4}
      />
    </div>
  );
}

export default Comments;
