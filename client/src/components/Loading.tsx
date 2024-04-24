import { Hourglass } from "react-loader-spinner";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
      }}
    >
      <Hourglass
        visible={true}
        height="150"
        width="150"
        ariaLabel="hourglass-loading"
        colors={["#306cce", "#72a1ed"]}
      />
    </div>
  );
}

export default Loading;
