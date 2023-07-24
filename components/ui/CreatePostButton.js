function CreatePostButton() {
  return (
    <button
      type="button"
      className="inline-block rounded-full bg-green-300 px-5 py-3 
      shadow-[0_4px_9px_-4px_#3b71ca] 
      transition duration-150 ease-in-out hover:bg-green-400 
      hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
    >
      <i className="visible sm:invisible fa-solid fa-plus"></i>
    </button>
  );
}

export default CreatePostButton;
