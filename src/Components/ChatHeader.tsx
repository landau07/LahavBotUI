import lahavLogo from "../assets/lahavIcon.jpeg";

export function ChatHeader() {
  return (
    <div className="sticky top-0 p-6 bg-purple-700 flex flex-row align-middle w-full gap-3 rounded-t-md">
      <img src={lahavLogo} className="h-10 w-10 bg-white rounded-full p-1" />
      <div className="text-white text-2xl">לה״ב בוט</div>
      <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-5 border-2 border-white start-12" />
    </div>
  );
}
