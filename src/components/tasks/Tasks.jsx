import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineRefresh } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineClock } from "react-icons/hi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { HiExclamation } from "react-icons/hi";
import { useTasks } from "../../scripts/services/taskcontext/TaskContext";
import "././../../styles/icons/icons.css";
import "././../../styles/components/cards/Cards.css";
import "././../../styles/components/buttons/StatusAndPriorityButtons.css";
import "././../../styles/components/buttons/MenuButtons.css";
import "././../../styles/components/modalmenu/ModalMenu.css";
import "././../../styles/components/buttons/DeleteButtons.css";
import "./Tasks.css";
import Modal from "react-responsive-modal";

const Tasks = () => {
  const {
    filteredTaskList,
    taskData,
    formatStatus,
    formatPriority,
    openModal,
    setTaskData,
    updateTaskStatus,
    openOpenTaskModal,
    onCloseTaskModal,
    handleStatusChange,
    updateTaskData,
    deleteTaskData,
    handlePriorityChange,
  } = useTasks();

  return (
    <div className="tasks-container">
      {filteredTaskList && filteredTaskList.length > 0 ? (
        filteredTaskList.map((task) => (
          <div
            className="card-task"
            key={task.id}
            onClick={() => openOpenTaskModal("edit", task.id)}
          >
            <div className="card-info-header">
              <div>
                <small className={`status status-${task.status}`}>
                  {formatStatus(task.status)}
                </small>
                <small className={`priority priority-${task.priority}`}>
                  {formatPriority(task.priority)}
                </small>
              </div>
              <Menu>
                <MenuButton
                  className="menu-button"
                  onClick={(e) => e.stopPropagation()}
                >
                  <HiDotsHorizontal className="icon-default" />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="menu-items"
                >
                  <MenuItem onClick={(e) => e.stopPropagation()}>
                    <button
                      className={`menu-button ${
                        task.status === "COMPLETED" ? "no-completed-task" : ""
                      }`}
                      onClick={() => updateTaskStatus(task.id, "COMPLETED")}
                    >
                      <HiOutlineCheckCircle className="icon-completed space" />
                      <span>Concluir tarefa</span>
                    </button>
                  </MenuItem>
                  <MenuItem onClick={(e) => e.stopPropagation()}>
                    <button
                      className={`menu-button ${
                        task.status === "PENDING" ? "no-completed-task" : ""
                      }`}
                      onClick={() => updateTaskStatus(task.id, "PENDING")}
                    >
                      <HiOutlineRefresh className="icon-pending space" />
                      <span>Tarefa pendente</span>
                    </button>
                  </MenuItem>
                  <MenuItem onClick={(e) => e.stopPropagation()}>
                    <button
                      className={`menu-button ${
                        task.status === "IN_PROGRESS" ? "no-completed-task" : ""
                      }`}
                      onClick={() => updateTaskStatus(task.id, "IN_PROGRESS")}
                    >
                      <HiOutlineClock className="icon-in-progress space" />
                      <span>Tarefa em andamento</span>
                    </button>
                  </MenuItem>
                  <MenuItem onClick={(e) => e.stopPropagation()}>
                    <button
                      className="menu-button"
                      onClick={() => openOpenTaskModal("edit", task.id)}
                    >
                      <HiOutlinePencilAlt className="icon-edit space" />
                      <span>Editar</span>
                    </button>
                  </MenuItem>
                  <MenuItem onClick={(e) => e.stopPropagation()}>
                    <button
                      className="menu-button"
                      onClick={() => openOpenTaskModal("exclude", task.id)}
                    >
                      <HiOutlineTrash className="icon-delete space" />
                      <span>Excluir</span>
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            <h5 title={task.title}>
              {task.title.length > 50
                ? task.title.substring(0, 50) + "..."
                : task.title}
            </h5>
            <p>
              {task.description.length > 110
                ? task.description.substring(0, 110) + "..."
                : task.description}
            </p>

            <small className="created-update-lb">
              Criado em: {task.createdAt}
            </small>
            <small className="created-update-lb">
              Atualizado em: {task.updatedAt}
            </small>
          </div>
        ))
      ) : (
        <div className="empty-task-list">
          <span>Nenhuma tarefa encontrada.</span>
        </div>
      )}
      {openModal === "edit" && (
        <Modal
          open={openModal}
          onClose={onCloseTaskModal}
          classNames={{
            overlay: "custom-overlay",
            modal: "custom-modal",
          }}
          center
        >
          <h4>Editar tarefa</h4>
          <form className="main-form" onSubmit={updateTaskData}>
            <label>Título</label>
            <input
              maxLength={255}
              className="form-input"
              type="text"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              required
            />
            <label>Descrição</label>
            <textarea
              rows={7}
              className="form-input"
              type="text"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
            />
            <label>Status</label>
            <div className="status-buttons">
              <button
                type="button"
                className={`status-button ${
                  taskData.status === "PENDING" ? "active" : ""
                }`}
                onClick={() => handleStatusChange("PENDING")}
              >
                <span>Pendente</span>
              </button>
              <button
                type="button"
                className={`status-button ${
                  taskData.status === "IN_PROGRESS" ? "active" : ""
                }`}
                onClick={() => handleStatusChange("IN_PROGRESS")}
              >
                <span>Fazendo</span>
              </button>
              <button
                type="button"
                className={`status-button ${
                  taskData.status === "COMPLETED" ? "active" : ""
                }`}
                onClick={() => handleStatusChange("COMPLETED")}
              >
                <span>Concluído</span>
              </button>
            </div>
            <label>Prioridade</label>
            <div className="priority-buttons">
              <button
                type="button"
                className={`priority-button ${
                  taskData.priority === "LOW" ? "active" : ""
                }`}
                onClick={() => handlePriorityChange("LOW")}
              >
                <span>Baixa</span>
              </button>
              <button
                type="button"
                className={`priority-button ${
                  taskData.priority === "MEDIUM" ? "active" : ""
                }`}
                onClick={() => handlePriorityChange("MEDIUM")}
              >
                <span>Média</span>
              </button>
              <button
                type="button"
                className={`priority-button ${
                  taskData.priority === "HIGH" ? "active" : ""
                }`}
                onClick={() => handlePriorityChange("HIGH")}
              >
                <span>Alta</span>
              </button>
            </div>
            <div className="user-date-info">
              <small>
                <strong>Criado em: </strong>
                {taskData.createdAt}
              </small>
              <small>
                <strong>Atualizado em: </strong>
                {taskData.updatedAt}
              </small>
            </div>
            <button className="button-primary" type="submit">
              Atualizar
            </button>
          </form>
        </Modal>
      )}
      ,
      {openModal === "exclude" && (
        <Modal
          open={openModal}
          onClose={onCloseTaskModal}
          classNames={{
            overlay: "custom-overlay",
            modal: "custom-modal",
          }}
          center
        >
          <div className="exclude-details-modal">
            <div>
              <HiExclamation className="icon-warn" />
              <h4>Deseja mesmo excluir esta tarefa?</h4>
            </div>
            <span>Esta ação não pode ser desfeita</span>
            <div className="exclude-buttons">
              <button className="menu-button" onClick={onCloseTaskModal}>
                <span>Cancelar</span>
              </button>
              <button className="button-delete" onClick={deleteTaskData}>
                <span>Excluir</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Tasks;
