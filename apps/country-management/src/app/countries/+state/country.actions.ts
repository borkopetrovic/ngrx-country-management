import { createAction, props } from '@ngrx/store';

export const openCountrySidebar = createAction(
  '[Country] Open Country Sidebar',
  props<{ code: string }>()
);
