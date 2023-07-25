import Link from "next/link";

function CreatePostButton() {
  return (
    <Link
      href="/create-post"
      className="fixed bottom-0 right-0 m-2 z-10 visible sm:invisible"
    >
      <button
        type="button"
        className="inline-block rounded-full bg-green-300 px-5 py-4
      shadow-[0_4px_9px_-4px_#3b71ca] 
      transition duration-150 ease-in-out hover:bg-green-400 
      hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
      >
        <i className="visible sm:invisible fa-solid fa-plus"></i>
      </button>
    </Link>
  );
}

export default CreatePostButton;
