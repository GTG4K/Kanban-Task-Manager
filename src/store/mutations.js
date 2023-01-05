export default {
  // UI
  toggleTheme(state) {
    state.theme === 'light' ? (state.theme = 'dark') : (state.theme = 'light');
  },
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  },

  // ADD
  addBoard(state, payload) {
    const boards = state.boards;
  },
  addColumn(state, payload) {
    const boards = state.boards;

    const board = boards.find((board) => board.name === payload.board);

    const newColumn = {
      name: payload.name,
      tasks: [],
    };

    board.columns.push(newColumn);
  },
  addTask(state, payload) {
    const boards = state.boards;

    const board = boards.find((board) => board.name === payload.board);
    const column = board.columns.find((column) => column.name === payload.column);

    const newSubtasks = [];
    payload.subtasks.forEach((subtask) => {
      newSubtasks.push({ title: subtask.value, isCompleted: false });
    });

    const newTask = {
      title: payload.title,
      description: payload.description,
      status: payload.status,
      subtasks: newSubtasks,
    };

    column.tasks.push(newTask);
  },
  addBoard(state, payload) {
    const boards = state.boards;
    const newColumns = [];

    payload.columns.forEach((column) => {
      const newColumn = {
        name: column.name,
        tasks: [],
      };
      newColumns.push(newColumn);
    });

    const newBoard = {
      name: payload.name,
      columns: newColumns,
    };

    boards.push(newBoard);
  },

  // EDIT
  toggleSubtask(state, payload) {
    const boards = state.boards;

    const board = boards.find((board) => board.name === payload.board);
    const column = board.columns.find((column) => column.name === payload.column);
    const task = column.tasks.find((task) => task.title === payload.task);

    const subtask = task.subtasks.find((subtask) => subtask.title === payload.subtask);
    subtask.isCompleted = !subtask.isCompleted;
  },
  changeCurrentStatus(state, payload) {
    const boards = state.boards;

    const board = boards.find((board) => board.name === payload.board);
    const column = board.columns.find((column) => column.name === payload.column);
    const task = column.tasks.find((task) => task.title === payload.task);

    task.status = payload.status;
  },
  changeBoard(state, payload) {
    const boards = state.boards;

    const board = boards.find((board) => board.name === payload.board);
    const columns = board.columns;

    const oldColumns = payload.columns.filter((column) => column.new === false);
    const newColumns = payload.columns.filter((column) => column.new === true);

    let columnFound = false;
    const removed = [];

    //edit old columns that changed
    columns.forEach((column) => {
      columnFound = false;
      oldColumns.forEach((oldColumn) => {
        if (column.name === oldColumn.oldName) {
          column.name = oldColumn.value;
          columnFound = true;
        }
      });
      if (!columnFound) {
        removed.push(column.name);
      }
    });

    //remove old columns that were removed
    columns.forEach((column) => {
      if (removed.includes(column.name)) {
        const columnIndex = columns.findIndex(
          (storeColumn) => storeColumn.name === column.name
        );
        columns.splice(columnIndex, 1);
      }
    });

    //add new columns
    newColumns.forEach((column) => {
      const newColumn = { name: column.value, tasks: [] };
      columns.push(newColumn);
    });

    // edit board name
    // board.name = payload.boardTitle;
  },
  deleteBoard(state, payload) {
    const boards = state.boards;

    const boardIndex = boards.findIndex((board) => board.name === payload.board);
    boards.splice(boardIndex, 1);
  },
};
