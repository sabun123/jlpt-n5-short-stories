import { ref, provide, inject, type InjectionKey } from "vue";

type LayoutState = {
  showGrid: Ref<boolean>;
  toggleGrid: () => void;
};

const LayoutKey = Symbol() as InjectionKey<LayoutState>;

export const createLayout = () => {
  const showGrid = ref(false);

  const toggleGrid = () => {
    showGrid.value = !showGrid.value;
  };

  const state: LayoutState = {
    showGrid,
    toggleGrid,
  };

  provide(LayoutKey, state);
  return state;
};

export const useLayout = () => {
  const state = inject(LayoutKey);
  if (!state) throw new Error("Layout state not provided");
  return state;
};
