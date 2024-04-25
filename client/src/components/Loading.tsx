import { grid } from "ldrs";

grid.register();
function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center pb-20">
      <l-grid size="300" speed="1.5" color="black"></l-grid>
    </div>
  );
}

export default Loading;
