import { useState } from "react";
import Header from "./components/header";
import KanbanNavigation from "./components/kamban-navigation";
import KanbanColumn from "./components/kanban-column";
import ModalAdicionarTarefa from "./components/modal/adicionar-tarefa";
import ModalDetalhesTarefa from "./components/modal/detalhes-tarefa";
import { useTasks } from "./hooks/useTasks";
import { Task } from "./context/TasksContext";

export default function App() {
  const { tasks, updateTask } = useTasks();

  const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
  const [mostrarModalDetalhes, setMostrarModalDetalhes] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<Task | null>(null);

  const tarefas = {
    ideias: tasks.filter(task => task.status === "backlog"),
    afazer: tasks.filter(task => task.status === "doing"),
    fazendo: tasks.filter(task => task.status === "development"),
    feito: tasks.filter(task => task.status === "developed"),
  };

  const abrirDetalhesTarefa = (tarefa: Task) => {
    setTarefaSelecionada(tarefa);
    setMostrarModalDetalhes(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, column: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const task = tasks.find(t => t.id === taskId);

    if (task) {
      updateTask({ ...task, status: column });

      const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, status: column } : t);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    // Optionally handle drag leave if needed
  };

  return (
    <div className="w-screen h-screen bg-[#E7EDF0] overflow-auto flex flex-col items-center">
      <div className="container flex flex-col">
        <div className="flex flex-col items-center">
          <Header />

          <div className="bg-white p-4 rounded-b-2xl flex items-center justify-center shadow-md w-fit">
            <button onClick={() => setMostrarModalAdicionar(true)} className="bg-[#4169E1] px-4 py-3 rounded-full text-white hover:bg-[#3458c4] transition-all">
              Adicionar tarefa
            </button>
          </div>
        </div>

        <KanbanNavigation
          onPrevClick={() => console.log("Navegar para trás")}
          onNextClick={() => console.log("Navegar para frente")}
        />

        <div className="flex flex-row gap-4 p-4 overflow-x-auto">
          <KanbanColumn
            id="backlog"
            titulo="Ideias"
            tarefas={tarefas.ideias}
            onClick={abrirDetalhesTarefa}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          />
          <KanbanColumn
            id="doing"
            titulo="A Fazer"
            tarefas={tarefas.afazer}
            onClick={abrirDetalhesTarefa}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          />
          <KanbanColumn
            id="development"
            titulo="Fazendo"
            tarefas={tarefas.fazendo}
            onClick={abrirDetalhesTarefa}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          />
          <KanbanColumn
            id="developed"
            titulo="Feito"
            tarefas={tarefas.feito}
            onClick={abrirDetalhesTarefa}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          />
        </div>
      </div>

      {mostrarModalAdicionar && (
        <ModalAdicionarTarefa onClose={() => setMostrarModalAdicionar(false)} />
      )}

      {mostrarModalDetalhes && tarefaSelecionada && (
        <ModalDetalhesTarefa
          tarefa={tarefaSelecionada}
          onClose={() => setMostrarModalDetalhes(false)}
        />
      )}
    </div>
  );
}
