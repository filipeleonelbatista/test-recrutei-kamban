import { Task } from "../context/TasksContext";
import CardTarefa from "./card-tarefa";

interface KanbanColumnProps {
  id: string;
  titulo: string;
  tarefas: Task[];
  onClick: (tarefa: Task) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, column: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
}

export default function KanbanColumn({ id, titulo, tarefas, onClick, onDrop, onDragOver, onDragLeave }: KanbanColumnProps) {
  return (
    <div className="flex flex-shrink-0 flex-col gap-4 w-[328px]"
      onDrop={(e) => onDrop(e, id)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-semibold text-lg">{titulo}</h3>
        <p className="text-[#747F93]">{tarefas.length} tarefa{tarefas.length > 1 ? 's' : ''}</p>
      </div>
      {tarefas.map(tarefa => (
        <CardTarefa
          key={tarefa.id}
          tarefa={tarefa}
          onClick={onClick}
          onDragStart={(e, id) => e.dataTransfer.setData("taskId", id)}
        />
      ))}
    </div>
  );
}
