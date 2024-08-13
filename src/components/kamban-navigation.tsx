export default function KanbanNavigation({ onPrevClick, onNextClick }) {
  return (
    <div className="ml-auto flex gap-4">
      <button onClick={onPrevClick} className="rounded-full w-10 h-10 bg-[#ADB8CB]/20 shadow-md text-[#ADB8CB]">{"<"}</button>
      <button onClick={onNextClick} className="rounded-full w-10 h-10 bg-white shadow-md text-[#ADB8CB]">{">"}</button>
    </div>
  );
}
