// Dropzone components
import Dropzone, { Accept, DropzoneState } from "react-dropzone";

// ALDR Tech Dashboard context
import ATDropzoneRoot from "./ATDropzoneRoot";
import { useEffect, useState } from "react";
import defaultImage from "assets/images/doc.png";
import { useDarkMode } from "state/hooks";

// Declaring props types for ATDropzone
interface Props {
  files: file[];
  onChange: (files: file[]) => void;
  accept: Accept;
  isError: boolean;
  maxFiles: number;
}

function ATDropzone({
  files: initialFiles,
  onChange,
  accept,
  isError,
  maxFiles,
}: Props): JSX.Element {
  const [darkMode] = useDarkMode();
  const [files, setFiles] = useState(initialFiles.slice(0, maxFiles));
  const [thumbnails, setThumbnails] = useState<{ [key: number]: string | ArrayBuffer }>({});

  useEffect(() => {
    files.map((file, i) => {
      if (file instanceof File) {
        const reader = new FileReader();
        reader.onerror = () => console.log("file reading has failed");
        reader.onloadend = () =>
          setThumbnails((thumbnails) => ({ ...thumbnails, [i]: reader.result }));
        reader.readAsDataURL(file);
      } else {
        setThumbnails((thumbnails) => ({ ...thumbnails, [i]: file.path }));
      }
    });
    onChange(files);
  }, [files]);

  return (
    <Dropzone
      accept={accept}
      onDrop={(acceptedFiles: file[]) => {
        setFiles((files) => [...files, ...acceptedFiles].slice(0, maxFiles));
        onChange(acceptedFiles);
      }}
    >
      {({ getRootProps, getInputProps }: DropzoneState) => (
        <ATDropzoneRoot {...getRootProps()} ownerState={{ darkMode, isError }}>
          <input {...getInputProps()} />
          {files.length === 0 ? (
            <p className="dz-empty">Drag files here to upload</p>
          ) : (
            files.map((e, i) => (
              <div key={e.name} className="dz-image-container">
                <a
                  href={e instanceof File ? "#" : e.path}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={
                      e.name.endsWith(".pdf")
                        ? defaultImage
                        : thumbnails[i]?.toString() ?? defaultImage
                    }
                    className="dz-image"
                  />
                </a>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setFiles((files) => files.filter((file, j) => j !== i).slice(0, maxFiles));
                  }}
                  className="dz-remove"
                >
                  remove file
                </div>
              </div>
            ))
          )}
        </ATDropzoneRoot>
      )}
    </Dropzone>
  );
}

export default ATDropzone;
