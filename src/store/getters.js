export default {
  getTheme(state) {
    return state.theme;
  },
  getSidebar(state) {
    return state.sidebar;
  },
  getBoards(state) {
    return state.boards;
  },
  getBoardNames(state) {
    const boards = state.boards;
    const boardNames = [];

    boards.forEach((board) => {
      boardNames.push(board.name);
    });

    return boardNames;
  },
};
