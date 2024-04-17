import "tailwindcss/tailwind.css";

function Comments({
  comment,
  setComment,
}: {
  comment: string;
  setComment: (comment: string) => void;
}) {
  const handleCommentChange = (e: { target: { value: string } }) => {
    setComment(e.target.value);
  };

  return (
    <div className="mx-4">
      <h2 className="mb-5 text-2xl font-bold">Comentarios adicionales</h2>
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