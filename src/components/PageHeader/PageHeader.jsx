
function PageHeader({ title, buttonText, onClick }) {
  return (
    <div className="patients-header">

      <h2>{title}</h2>

      <button
        className="add-btn"
        onClick={onClick}
      >
        {buttonText}
      </button>

    </div>
  );
}

export default PageHeader;
