
function ActionButtons({ onEdit, onDelete }) {
  return (
    <>
      <button
        className="edit-btn"
        onClick={onEdit}
      >
        Edit
      </button>

      <button
        className="delete-btn"
        onClick={onDelete}
      >
        Delete
      </button>
    </>
  );
}

export default ActionButtons;
