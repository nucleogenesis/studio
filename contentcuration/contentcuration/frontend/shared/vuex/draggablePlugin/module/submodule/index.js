import { DraggableSectionFlags } from '../constants';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

export default function draggableSubmodule(draggableType) {
  return {
    namespaced: true,
    state() {
      return {
        draggableType,
        draggableComponents: {},
        activeDraggableId: null,
        hoverDraggableId: null,
        lastHoverDraggableId: null,
        hoverDraggableSection: DraggableSectionFlags.NONE,
        lastHoverDraggableSection: DraggableSectionFlags.NONE,
      };
    },
    getters,
    mutations,
    actions,
  };
}
