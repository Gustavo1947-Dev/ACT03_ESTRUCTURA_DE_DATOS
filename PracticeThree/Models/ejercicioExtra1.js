/**
 * Gestiona una lista de tareas (To-Do list) con operaciones CRUD.
 * Diseñado para ser la lógica de negocio en un backend de Express.js.
 */
class ToDoListManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    /**
     * Agrega una nueva tarea a la lista.
     * @param {string} description - La descripción de la tarea.
     * @returns {{id: number, description: string, completed: boolean} | null} La tarea recién creada o null si la descripción es inválida.
     */
    addTask(description) {
        if (!description || typeof description !== 'string' || description.trim() === '') {
            return null; // Descripción inválida
        }

        const newTask = {
            id: this.nextId,
            description: description.trim(),
            completed: false,
        };

        this.tasks.push(newTask);
        this.nextId++;
        return newTask;
    }

    /**
     * Elimina una tarea de la lista por su ID.
     * @param {number} id - El ID de la tarea a eliminar.
     * @returns {boolean} `true` si se eliminó, `false` si no se encontró.
     */
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            return true;
        }
        return false;
    }

    /**
     * Marca una tarea como completada.
     * @param {number} id - El ID de la tarea a marcar.
     * @returns {{id: number, description: string, completed: boolean} | null} La tarea modificada o `null` si no se encontró.
     */
    markAsCompleted(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = true;
            return task;
        }
        return null;
    }

    /**
     * Obtiene una lista de tareas, opcionalmente filtrada.
     * @param {string} [filter='all'] - El criterio de filtro ('all', 'pending', 'completed').
     * @returns {Array<{id: number, description: string, completed: boolean}>} La lista de tareas filtrada.
     */
    getTasks(filter = 'all') {
        switch (filter) {
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            case 'all':
            default:
                return [...this.tasks]; // Devuelve una copia para evitar mutaciones externas
        }
    }
}

// Exporta la clase para que pueda ser importada en otros módulos.
module.exports = { ToDoListManager };
