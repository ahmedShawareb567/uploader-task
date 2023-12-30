import {Uploader} from "./components/Uploader/Index";

function App() {
  // On upload file action
  const onUploadFileAction = (value) => {
    if (!value) return;
    console.log(value);
  };

  return (
    <div>
      <div className="app-main">
        <div className="container mt-20">
          <h1 className="text-3xl md:text-4xl lg:text-6xl text-center font-black">
            Uploader
          </h1>

          <div className="lg:w-1/3 mx-auto">
            <Uploader className="mt-10" onUploadFile={onUploadFileAction} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
