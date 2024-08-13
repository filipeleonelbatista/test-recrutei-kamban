export default function Button({ onClick, className }) {
  return (
    <button onClick={onClick} className={
      "bg-[#4169E1] px-4 py-3 rounded-full text-white hover:bg-[#3458c4] transition-all" + className
    }>
      Adicionar tarefa
    </button>
  );
}
