export const Loading = () => {
  return (
    <div className="bg-blend-hard-light	">
      <div className="w-full h-full fixed z-0 inset-0 bg-overlay"></div>
      <div className="w-full h-full fixed z-0 inset-0">
        <div
          className="h-[170px] w-[250px] rounded-md flex justify-center items-center absolute
           bg-white top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 gap-2"
        >
          <div
            className="w-3 h-3 bg-overlay rounded-full animate-blink"
            style={{ animationDelay: "250ms" }}
          />
          <div
            className="w-3 h-3 bg-overlay rounded-full animate-blink"
            style={{ animationDelay: "500ms" }}
          />
          <div
            className="w-3 h-3 bg-overlay rounded-full animate-blink"
            style={{ animationDelay: "750ms" }}
          />
          <div
            className="w-3 h-3 bg-overlay rounded-full animate-blink"
            style={{ animationDelay: "900ms" }}
          />
        </div>
      </div>
    </div>
  );
};
