import { UIState } from './';

type UIActionType =
  | { type: 'UI - Open Sidebar' }
  | { type: 'UI - Close Sidebar' };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state,
        sidebarMenuOpen: true,
      };
    case 'UI - Close Sidebar':
      return {
        ...state,
        sidebarMenuOpen: false,
      };

    default:
      return state;
  }
};
